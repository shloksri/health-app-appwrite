import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import journalsData from '../data/journals.json';
import './styles/ViewYourMood.css';

const ViewYourMood = ({ mood, onClose }) => {
    if (!journal) return null;

    const { moodValue, moodContent } = mood;

    return (
        <div className="view-journal-overlay">
            <div className="view-journal-content">
                <button className="close-button" onClick={onClose}>x</button>

                <h2>Mood Details</h2>

                <div className="journal-details">
                    <p><strong>Mood:</strong> {journalMood}</p>
                    <p><strong>Content:</strong> {journalContent}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewYourMood;
