import React from 'react';
import './styles/ViewYourJournal.css';

const ViewYourJournal = ({ journal, onClose }) => {
    if (!journal) return null;

    const { journalMood, journalContent } = journal;

    return (
        <div className="view-journal-overlay">
            <div className="view-journal-content">
                <button className="close-button" onClick={onClose}>x</button>
                <div className="journal-details">
                    <p><strong>You were feeling "</strong> {journalMood}"</p>
                    <p><strong>Here's why:</strong> <br />
                        {journalContent}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewYourJournal;
