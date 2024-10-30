// MoodTracker.js
import React, { useState, useEffect } from 'react';
import moodsData from '../data/moods.json';
import './styles/MoodTracker.css';
import { Link } from 'react-router-dom';
import './styles/Journals.css';
import { useUser } from '../context/UserContext'
import { Query } from 'appwrite';
import { databases } from "../appwrite/config";
import { dateValue, timeValue, formatDate } from '../appwrite/formatDate'


const DATABASE_ID = import.meta.env.VITE_DATABASE_ID; // your Appwrite database ID
const MOODS_COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID_MOODS; // your collection ID

const MoodsList = () => {
    const { user, setUser } = useUser(); //Context
    const [moods, setMoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userID, setUserID] = useState(() => user ? user.$id : null)
    const [selectedMood, setSelectedMood] = useState(null);


    const handleMoodClick = (journal) => {
        setSelectedMood(journal);
    };
    const handleCloseView = () => {
        setSelectedMood(null);
    };

    useEffect(() => {
        console.log("user ID:", user.$id);
        const fetchMoods = async () => {
            try {
                const response = await databases.listDocuments(
                    DATABASE_ID,
                    MOODS_COLLECTION_ID,
                    [
                        Query.equal('userID', userID)
                    ],
                    { orderAttributes: [user.$createdAt], orderTypes: ['DESC'] }
                );

                setMoods(response.documents); // Set fetched moods to state
                setLoading(false); // Stop loading
            } catch (err) {
                setError('Failed to load moods.');
                setLoading(false);
            }
        };

        fetchMoods();

    }, [userID]);

    if (loading) return <p>Loading moods...</p>;
    if (error) return <p>Error in Moods - {error}</p>;

    return (
        <div>
            <div className='box login-page-div u-flex u-flex-vertical u-main-center u-cross-center u-row-gap-48 u-margin-inline-64'>
                <Link to="/mood-tracker" className="create-journal-btn">Create a New Mood</Link>
                <h2>Moods for User: {user.name}</h2>
                {moods.length > 0 ? (
                    <>

                        {/* table starts */}
                        <div class="table" role="table">
                            <div class="table-thead" role="rowheader">
                                <div class="table-row" role="row">
                                    <div class="table-thead-col" role="columnheader">
                                        <span class="eyebrow-heading-3">Date</span>
                                    </div>
                                    <div class="table-thead-col is-only-desktop" role="columnheader">
                                        <span class="eyebrow-heading-3">Mood</span>
                                    </div>
                                    <div class="table-thead-col is-only-desktop" role="columnheader">
                                        <span class="eyebrow-heading-3">Time</span>
                                    </div>
                                    <div class="table-thead-col is-only-desktop" role="columnheader">
                                        <span class="eyebrow-heading-3">Content</span>
                                    </div>

                                </div>
                            </div>

                            {moods.map((mood) => (

                                <>

                                    <div key={mood.$id} onClick={() => handleMoodClick(journal)} class="table-tbody" role="rowgroup">
                                        <div class="table-row" role="row">
                                            <div class="table-col" role="cell" data-title="Name">
                                                <div class="u-inline-flex u-cross-center u-gap-12">
                                                    <span class="text u-break-word u-line-height-1-5">{formatDate(dateValue, mood.$createdAt)}</span>
                                                </div>
                                            </div>
                                            <div class="table-col is-only-desktop" role="cell" data-title="Type">
                                                <span class="text u-break-word u-line-height-1-5">{mood.moodValue}</span>
                                            </div>
                                            <div class="table-col is-only-desktop" role="cell" data-title="Size">
                                                <time class="text">{formatDate(timeValue, mood.$createdAt)}</time>
                                            </div>
                                            <div class="table-col is-only-desktop" role="cell" data-title="Created">
                                                <span class="text">{mood.moodContent} </span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}


                        </div>
                    </>

                ) : (
                    <p>No moods found for this user.</p>
                )}
            </div>

        </div>
    );
};

export default MoodsList;
