// YourJournal.js
import React, { useState, useEffect } from 'react';
import moodsData from '../data/moods.json';
import './styles/CreateJournal.css';

import { databases } from '../appwrite/config';
import { useUser } from '../context/UserContext';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID; // Your Appwrite database ID
const JOURNALS_COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID_JOURNALS; // Your collection ID

function CreateJournal() {
    const { user } = useUser(); // User context
    const [journalMood, setJournalMood] = useState('');
    const [journalContent, setJournalContent] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleMoodChange = (e) => setJournalMood(e.target.value);
    const handleContentChange = (e) => setJournalContent(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!journalMood || !journalContent) {
            setError('Please fill out all fields');
            return;
        }

        try {
            const response = await databases.createDocument(
                DATABASE_ID,
                JOURNALS_COLLECTION_ID,
                'unique()', // Automatically generate a unique ID for the new document
                {
                    userID: user.$id,
                    journalMood,
                    journalContent
                }
            );

            setJournalMood(''); // Clear input fields after successful submission
            setJournalContent('');
            setError(null);
            setSuccess('Journal submitted successfully!');
            console.log('New journal entry:', response);
        } catch (err) {
            console.error('Error submitting journal:', err);
            setError('Failed to submit journal.');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Submit a New Journal Entry</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* <label htmlFor="mood">Mood:</label>
                    <input
                        type="text"
                        id="mood"
                        value={journalMood}
                        onChange={handleMoodChange}
                        placeholder="Enter your mood"
                    /> */}
                    <label htmlFor="mood">Select your mood:</label>
                    <select id="mood" value={journalMood} onChange={handleMoodChange} required>
                        <option value="">-- Select Mood --</option>
                        {moodsData.map(mood => (
                            <option key={mood.id} value={mood.id}>{mood.name}</option>
                        ))}
                    </select>
                </div>


                <div>
                    <label htmlFor="content">Journal Content:</label>
                    <textarea
                        id="content"
                        value={journalContent}
                        onChange={handleContentChange}
                        placeholder="Write your journal entry here"
                    />
                </div>
                <button type="submit">Submit Journal</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}

export default CreateJournal;
