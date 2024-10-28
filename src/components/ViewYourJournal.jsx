import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import journalsData from '../data/journals.json';
import './styles/ViewYourJournal.css';

const ViewYourJournal = () => {
    const { journalID } = useParams();
    const navigate = useNavigate();
    const journal = journalsData.find(j => j.journalID === journalID);

    if (!journal) {
        return <div>Journal not found</div>;
    }

    return (
        <div className="view-journal-container">
            <h1>{journal.date} at {journal.time}</h1>
            <h2>Mood: {journal.mood}</h2>
            <p>{journal.content}</p>
            <button onClick={() => navigate('/journals')} className="back-btn">Back to Journals</button>
        </div>
    );
};

export default ViewYourJournal;
