import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Reminders.css';
import { useUser } from '../context/UserContext';
import { Query } from 'appwrite';
import { databases } from "../appwrite/config";

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID; // your Appwrite database ID
const REMINDERS_COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID_REMINDERS; // your collection ID

function Reminders() {
    const { user } = useUser(); // Context for user info
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userID, setUserID] = useState(() => user ? user.$id : null);
    const [selectedReminder, setSelectedReminder] = useState(null); // To track which reminder is being deleted
    const [showPopup, setShowPopup] = useState(false); // Control popup visibility

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await databases.listDocuments(
                    DATABASE_ID,
                    REMINDERS_COLLECTION_ID,
                    [
                        Query.equal('userID', userID)
                    ],
                    { orderAttributes: ['reminderTime'], orderTypes: ['DESC'] }
                );
                setReminders(response.documents);
                setLoading(false);
            } catch (err) {
                setError('Failed to load reminders.');
                setLoading(false);
            }
        };

        fetchReminders();
    }, [userID]);

    const handleDeleteClick = (reminder) => {
        setSelectedReminder(reminder);
        setShowPopup(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await databases.deleteDocument(DATABASE_ID, REMINDERS_COLLECTION_ID, selectedReminder.$id);
            setReminders(reminders.filter(r => r.$id !== selectedReminder.$id)); // Update reminders list
            setShowPopup(false); // Hide popup
            setSelectedReminder(null); // Reset selected reminder
        } catch (err) {
            console.error('Failed to delete reminder:', err);
            setError('Failed to delete reminder. Please try again later.');
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedReminder(null);
    };

    if (loading) return <p>Loading reminders...</p>;
    if (error) return <p>Error in Reminders - {error}</p>;

    return (
        <div>
            <br />
            <Link to="/reminders/new" className="create-reminder-btn">Create a New Reminder</Link>
            <h2>Reminders for User: {user.name}</h2>

            {reminders.length > 0 ? (
                <>
                    <ul>
                        {reminders.map((reminder) => (
                            <li key={reminder.$id}>
                                <h3>Reminder: {new Date(reminder.reminderTime).toLocaleString()}</h3>
                                <p>{reminder.message}</p>
                                <p>{reminder.email}</p>
                                <button onClick={() => handleDeleteClick(reminder)}>Delete</button>
                            </li>
                        ))}
                    </ul>

                    {/* Delete Confirmation Popup */}
                    {showPopup && selectedReminder && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <h3>Confirm Delete Reminder</h3>
                                <p>Reminder Date & Time: {new Date(selectedReminder.reminderTime).toLocaleString()}</p>
                                <p>Are you sure you want to delete this reminder?</p>
                                <button onClick={handleConfirmDelete}>Yes</button>
                                <button onClick={handleClosePopup}>No</button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <p>No reminders found for this user.</p>
            )}
        </div>
    );
}

export default Reminders;
