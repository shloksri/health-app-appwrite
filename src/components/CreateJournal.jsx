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
    const [isSubmitted, setIsSubmitted] = useState(false);


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
            setIsSubmitted(true);
            // console.log('New journal entry:', response);

            // Hide the pop-up after 3 seconds
            setTimeout(() => setIsSubmitted(false), 3000);
        } catch (err) {
            console.error('Error submitting journal:', err);
            setError('Failed to submit journal.');
            setSuccess(null);
        }
    };
    const handleClosePopup = () => {
        setIsSubmitted(false);
    };

    return (
        <div>

            <div className="box login-page-div u-flex u-flex-vertical u-main-center u-cross-center u-row-gap-48 u-margin-inline-64">
                <h2>Submit a New Journal Entry</h2>
                <form onSubmit={handleSubmit} className="form u-width-full-line u-row-gap-48 u-max-width-500">

                    <ul className="form-list">
                        <li className="form-item">
                            <label htmlFor="mood">Select your mood:</label>
                            <div className="select u-width-full-line">
                                <select id="mood" value={journalMood} onChange={handleMoodChange} required>
                                    <option value="">-- Select Mood --</option>
                                    {moodsData.map(mood => (
                                        <option key={mood.id} value={mood.name}>{mood.name}</option>
                                    ))}
                                </select>
                                <span className="icon-cheveron-down" aria-hidden="true"></span>
                            </div>
                        </li>

                        <li className="form-item">
                            <label htmlFor="reason">Why do you feel this way?</label>
                            <textarea
                                className="input-text"
                                id="content"
                                value={journalContent}
                                onChange={handleContentChange}
                                placeholder="Write your journal entry here"
                                required
                            />
                        </li>
                    </ul>
                    <button type="submit" className='button is-secondary'>Submit Journal</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {isSubmitted && (
                    <div className="popup">
                        <span className="popup-message">Journal Submitted Successfully!</span>

                        <button
                            className="button is-text is-only-icon"

                            aria-label="Remove item"
                            onClick={handleClosePopup}
                        >
                            <span className="icon-x" aria-hidden="true"></span>
                        </button>
                    </div>
                )}
            </div>


        </div>
    );
}

export default CreateJournal;
