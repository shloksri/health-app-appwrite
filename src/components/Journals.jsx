import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Journals.css';
import { useUser } from '../context/UserContext'
import { Query } from 'appwrite';
import { databases } from "../appwrite/config";
import ViewYourJournal from './ViewYourJournal'
import { dateValue, timeValue, formatDate } from '../appwrite/formatDate'

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID; // your Appwrite database ID
const JOURNALS_COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID_JOURNALS; // your collection ID

function Journals() {

    const { user, setUser } = useUser(); //Context
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userID, setUserID] = useState(() => user ? user.$id : null)
    const [selectedJournal, setSelectedJournal] = useState(null);


    const handleJournalClick = (journal) => {
        setSelectedJournal(journal);
        // console.log(journal)
    };
    const handleCloseView = () => {
        setSelectedJournal(null);
    };

    useEffect(() => {
        // console.log("user ID:", user.$id);
        const fetchJournals = async () => {
            try {
                // Query for all journal entries where userID matches and sort by date descending
                const response = await databases.listDocuments(
                    DATABASE_ID,
                    JOURNALS_COLLECTION_ID,
                    [
                        Query.equal('userID', userID)
                    ],
                    { orderAttributes: [user.$createdAt], orderTypes: ['DESC'] }
                );

                setJournals(response.documents); // Set fetched journals to state
                setLoading(false); // Stop loading
            } catch (err) {
                setError('Failed to load journals.');
                setLoading(false);
            }
        };

        fetchJournals();

    }, [userID]);

    if (loading) return <p>Loading journals...</p>;
    if (error) return <p>Error in Journals - {error}</p>;

    return (
        <div>
            <div className='box login-page-div u-flex u-flex-vertical u-main-center u-cross-center u-row-gap-48 u-margin-inline-64'>
                <Link to="/journals/new" className="create-journal-btn">Create a New Journal</Link>

                {journals.length > 0 ? (
                    <>
                        <h6 className='heading-level-7'>Below are your previous journals. Please click on any of them to view the details</h6>
                        {/* table starts */}
                        <div className="table" role="table">
                            <div className="table-thead" role="rowheader">
                                <div className="table-row" role="row">
                                    <div className="table-thead-col" role="columnheader">
                                        <span className="eyebrow-heading-3">Date</span>
                                    </div>
                                    <div className="table-thead-col is-only-desktop" role="columnheader">
                                        <span className="eyebrow-heading-3">Mood</span>
                                    </div>
                                    <div className="table-thead-col is-only-desktop" role="columnheader">
                                        <span className="eyebrow-heading-3">Time</span>
                                    </div>
                                    <div className="table-thead-col is-only-desktop" role="columnheader">
                                        <span className="eyebrow-heading-3">Content</span>
                                    </div>

                                </div>
                            </div>

                            {journals.map((journal) => (
                                <div key={journal.$id} onClick={() => handleJournalClick(journal)} className="table-tbody" role="rowgroup">
                                    <a className="table-row" role="row">
                                        <div className="table-col" role="cell" data-title="Name">
                                            <div className="u-inline-flex u-cross-center u-gap-12">
                                                <span className="text u-break-word u-line-height-1-5">{formatDate(dateValue, journal.$createdAt)}</span>
                                            </div>
                                        </div>
                                        <div className="table-col is-only-desktop" role="cell" data-title="Type">
                                            <span className="text u-break-word u-line-height-1-5">{journal.journalMood}</span>
                                        </div>
                                        <div className="table-col is-only-desktop" role="cell" data-title="Size">
                                            <time className="text">{formatDate(timeValue, journal.$createdAt)}</time>
                                        </div>
                                        <div className="table-col is-only-desktop" role="cell" data-title="Created">
                                            <span className="text">{journal.journalContent.slice(0, 100)} .......</span>
                                        </div>
                                    </a>
                                </div>
                            ))}


                        </div>

                        {/* Pass selected journal to ViewYourJournal */}
                        {selectedJournal && (
                            <ViewYourJournal journal={selectedJournal} onClose={handleCloseView} />
                        )}
                    </>

                ) : (
                    <p>No journals yet. Click on the above button to create one!</p>
                )}
            </div>
        </div>
    );
}

export default Journals;
