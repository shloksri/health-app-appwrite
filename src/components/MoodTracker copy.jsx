import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        if (selectedMood) {
            const mood = moodsData.find(m => m.id === selectedMood);
            if (mood) {
                setOneLiner(mood.description);
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
            <div class="box login-page-div u-flex u-flex-vertical u-main-center u-cross-center u-row-gap-48 u-margin-inline-64">

                <form class="form u-width-full-line u-max-width-500">
                    <ul class="form-list">
                        <li class="form-item">
                            <label class="label">Label</label>
                            <div class="select u-width-full-line">
                                <select name="pets" id="pet-select">
                                    <option value="">Select option</option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                    <option value="4">Option 4</option>
                                    <option value="5">Option 5</option>
                                    <option value="6">Option 6</option>
                                </select>
                                <span class="icon-cheveron-down" aria-hidden="true"></span>
                            </div>
                        </li>
                    </ul>
                </form>
                <form class="form u-width-full-line u-max-width-500">
                    <ul class="form-list">
                        <li class="form-item">
                            <label class="label">Label</label>
                            <textarea class="input-text" placeholder="Type here..."></textarea>
                        </li>
                    </ul>
                </form>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="mood">Select your mood:</label>
                    <select id="mood" value={selectedMood} onChange={handleMoodChange} required>
                        <option value="">-- Select Mood --</option>
                        {moodsData.map(mood => (
                            <option key={mood.id} value={mood.id}>{mood.name}</option>
                        ))}
                    </select>

                    <div className="one-liner">{oneLiner}</div>

                    <label htmlFor="reason">Why do you feel this way?</label>
                    <textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Write your reason here..."
                        required
                    />

                    <button type="submit">Submit Mood</button>
                </form>

                {isSubmitted && (
                    <div className="popup">
                        <span className="popup-message">Mood Submitted Successfully!</span>
                        <button className="close-button" onClick={handleClosePopup}>x</button>
                    </div>
                )}

                {error && <p className="error">{error}</p>}
            </div>


        </div>
    );
};

export default MoodTracker;
