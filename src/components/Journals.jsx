import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Journals.css';
import { useUser } from '../context/UserContext'
import { Query } from 'appwrite';
import { databases } from "../appwrite/config";

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID; // your Appwrite database ID
const JOURNALS_COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID_JOURNALS; // your collection ID

function Journals() {

    const { user, setUser } = useUser(); //Context
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userID, setUserID] = useState(() => user ? user.$id : null)

    useEffect(() => {
        console.log("user ID:", user.$id);
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
            <br />
            <Link to="/journals/new" className="create-journal-btn">Create a New Journal</Link>
            <h2>Journals for User: {user.name}</h2>
            {journals.length > 0 ? (
                <ul>
                    {journals.map((journal) => (
                        <li key={journal.$id}>
                            <h3>Mood: {journal.journalMood}</h3>
                            <p>{journal.journalContent}</p>

                        </li>
                    ))}
                </ul>
            ) : (
                <p>No journals found for this user.</p>
            )}
        </div>
    );
}

export default Journals;
