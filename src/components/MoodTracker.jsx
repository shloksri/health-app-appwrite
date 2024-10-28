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
    );
};

export default MoodTracker;
