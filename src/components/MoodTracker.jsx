import React, { useState, useEffect, useRef } from 'react';
import moodsData from '../data/moods.json';
import './styles/MoodTracker.css';
import { databases } from '../appwrite/config';
import { useUser } from '../context/UserContext';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID; // Your Appwrite database ID
const MOODS_COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID_MOODS; // Collection ID for moods

const MoodTracker = () => {
    const { user } = useUser(); // Get the user context
    const [selectedMood, setSelectedMood] = useState('');
    const [oneLiner, setOneLiner] = useState('');
    const [reason, setReason] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [animationKey, setAnimationKey] = useState(0);


    useEffect(() => {
        if (selectedMood) {
            const mood = moodsData.find(m => m.name === selectedMood);
            if (mood) {
                setOneLiner(mood.description);
                // console.log("mood.description - ", mood.description);

                setAnimationKey(prev => prev + 1);
            }
        }
    }, [selectedMood]);


    const handleMoodChange = (e) => {
        setSelectedMood(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make sure a user is logged in
        if (!user) {
            setError('User not logged in');
            return;
        }

        try {
            const moodEntry = {
                userID: user.$id,
                moodValue: selectedMood,
                moodContent: reason
            };

            // Add the mood entry to Appwrite database
            await databases.createDocument(
                DATABASE_ID,
                MOODS_COLLECTION_ID,
                'unique()', // Generate a unique ID for the document
                moodEntry
            );

            setIsSubmitted(true);
            setSelectedMood('');
            setReason('');
            setOneLiner('');
            setError(null);

            // Hide the pop-up after 3 seconds
            setTimeout(() => setIsSubmitted(false), 3000);
        } catch (err) {
            console.error('Failed to submit mood:', err);
            setError('Failed to submit mood.');
        }
    };

    const handleClosePopup = () => {
        setIsSubmitted(false);
    };

    return (
        <div className="mood-tracker-container">
            <div className="box login-page-div u-flex u-flex-vertical u-main-center u-cross-center u-row-gap-48 u-margin-inline-64">

                <form onSubmit={handleSubmit} className="form u-width-full-line u-row-gap-48 u-max-width-500">
                    <ul className="form-list">
                        <li className="form-item">
                            <label htmlFor="mood">Select your mood:</label>
                            <div className="select u-width-full-line">
                                <select id="mood" value={selectedMood} onChange={handleMoodChange} required>
                                    <option value="">-- Select Mood --</option>
                                    {moodsData.map(mood => (
                                        <option key={mood.id} value={mood.name}>{mood.name}</option>
                                    ))}
                                </select>
                                <span className="icon-cheveron-down" aria-hidden="true"></span>
                            </div>
                        </li>
                        <li className="form-item">
                            <label htmlFor="one-liner"></label>
                            <div key={animationKey} className='one-liner typewriter'>{oneLiner}</div>
                        </li>
                        <li className="form-item">
                            <label htmlFor="reason">Why do you feel this way?</label>
                            <textarea
                                className="input-text"
                                id="reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="A reason or an incident in less than 50 characters"
                                required
                            />
                        </li>
                    </ul>
                    <button type="submit" className='button is-secondary'>Submit Mood</button>
                </form>

                {isSubmitted && (
                    <div className="popup">
                        <span className="popup-message">Mood Submitted Successfully!</span>

                        <button
                            className="button is-text is-only-icon"

                            aria-label="Remove item"
                            onClick={handleClosePopup}
                        >
                            <span className="icon-x" aria-hidden="true"></span>
                        </button>
                    </div>
                )}

                {error && <p className="error">{error}</p>}
            </div>


        </div>
    );
};

export default MoodTracker;
