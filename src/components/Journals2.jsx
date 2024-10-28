import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import journalsData from '../data/journals.json';
import './styles/Journals.css';
import db from '../appwrite/databases'
import { useUser } from '../context/UserContext'

const Journals = () => {
    const [journals, setJournals] = useState([]);
    const { user, setUser } = useUser(); //Context

    const [notes, setNotes] = useState([])

    useEffect(() => {
        init();
    }, [])

    const init = async () => {
        const response = await db.notes.list(
            [Query.orderDesc('$createdAt')]
        );
        setNotes(response.documents)
    }


    useEffect(() => {
        setJournals(journalsData.sort((a, b) => new Date(b.date) - new Date(a.date)));
    }, []);

    return (
        <div className="journals-container">
            <Link to="/journals/new" className="create-journal-btn">Create a New Journal</Link>
            <div className="journals-list">
                {journals.map(journal => (
                    <div key={journal.journalID} className="journal-entry">
                        <Link to={`/journals/${journal.journalID}`} className="journal-link">
                            <h3>You felt {journal.mood} on {journal.date} at {journal.time}</h3>
                            <p>{journal.content.substring(0, 100)}...</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Journals;
