// YourJournal.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import journalsData from '../data/journals.json';
import moodsData from '../data/moods.json';
import { MoodContext } from '../context/MoodContext';
import './styles/CreateJournal.css';

const YourJournal = () => {
    const navigate = useNavigate();
    const { selectedMood, moodID } = useContext(MoodContext);
    const location = useLocation(); // Get location object
    // const [mood, setMood] = useState("");
    const [mood, setMood] = useState(location.state?.selectedMood || ""); // Set initial mood from location state
    const [content, setContent] = useState("");


    useEffect(() => {
        if (location.state?.selectedMood) {
            setMood(location.state.selectedMood); // Update mood if passed
        }
    }, [location.state]);

    // useEffect(() => {
    //     if (location.state?.selectedMood) {
    //         setMood(location.state.selectedMood); // Update mood if passed
    //     }
    // }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newJournalID = `journal_${journalsData.length + 1}`;
        const currentDate = new Date();
        const date = currentDate.toLocaleDateString();
        const time = currentDate.toLocaleTimeString();

        const newJournal = {
            username: "user1",
            journalID: newJournalID,
            moodID: moodID || `journal_${newJournalID}`,
            mood,
            date,
            time,
            content
        };

        journalsData.push(newJournal);
        // Here you can handle adding newJournal to your data source

        navigate('/journals');
    };

    return (
        <div className="your-journal-container">
            <form onSubmit={handleSubmit} className="journal-form">
                <label>Mood:</label>
                <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    disabled={!!selectedMood}
                >
                    <option value="" disabled>Select your mood</option>
                    {moodsData.map(m => (
                        <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                </select>

                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write about your day..."
                ></textarea>

                <button type="submit" className="save-journal-btn">Save your Journal</button>
            </form>
        </div>
    );
};

export default YourJournal;
