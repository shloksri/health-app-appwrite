// MoodTracker.js
import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import moodsData from '../data/moods.json';
import { MoodContext } from '../context/MoodContext';
import { v4 as uuidv4 } from 'uuid';
// import { useMood } from '../context/MoodContext'
import './styles/MoodTracker.css';

const MoodTracker = () => {
    const userID = "Shlok01_"; // we will get the userID from state or somewhere
    const [selectedMood, setSelectedMood] = useState('');
    const [oneLiner, setOneLiner] = useState('');
    const [moodID, setMoodID] = useState('');
    const [reason, setReason] = useState('');
    const [dateOfMood, setDateOfMood] = useState('')
    const [timeOfMood, setTimeOfMood] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)


    useEffect(() => {
        if (selectedMood) {
            const moodidfinder = moodsData.find(m => m.id === selectedMood);
            if (moodidfinder) {
                setOneLiner(moodidfinder.description);
            }
        }
    }, [selectedMood, moodID]);

    const handleMoodChange = (e) => {
        setSelectedMood(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("From Submit - mood : ", selectedMood);

        const currentDate = new Date();
        const date = currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        const time = currentDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
        // const moodID = `${selectedMood}_${currentDate.toLocaleDateString('en-GB').replace(/\//g, '')}_${currentDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }).replace(/:/g, '')}`;

        const mood_id = userID + "_" + uuidv4();
        // alert(`Message\n ${selectedMood} ${dateOfMood}`)
        // console.log(mood_id);
        setMoodID(mood_id);
        setDateOfMood(date)
        setTimeOfMood(time)
        setSelectedMood('');
        setReason('');
        setOneLiner('');
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
        </div>
    );
};

export default MoodTracker;
