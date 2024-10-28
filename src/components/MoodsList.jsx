// MoodTracker.js
import React, { useState, useEffect } from 'react';
import moodsData from '../data/moods.json';
import './styles/MoodTracker.css';
import { Link } from 'react-router-dom';
import './styles/Journals.css';
import { useUser } from '../context/UserContext'
import { Query } from 'appwrite';
import { databases } from "../appwrite/config";

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
            <br />
            <Link to="/mood-tracker" className="create-journal-btn">Create a New Mood</Link>
            <h2>Moods for User: {user.name}</h2>
            {moods.length > 0 ? (
                <>
                    <ul>
                        {moods.map((mood) => (
                            <li key={mood.$id} onClick={() => handleMoodClick(journal)} style={{ border: "1px solid black", margin: "10px 0", cursor: "pointer" }}>
                                <h3>Mood: {mood.moodValue}</h3>
                                <p>{mood.moodContent.slice(0, 10)} .......</p>
                            </li>
                        ))}
                    </ul>
                    {/* Pass selected journal to ViewYourJournal */}
                    {selectedMood && (
                        <ViewYourJournal mood={selectedMood} onClose={handleCloseView} />
                    )}
                </>

            ) : (
                <p>No moods found for this user.</p>
            )}
        </div>
    );
};

export default MoodsList;
