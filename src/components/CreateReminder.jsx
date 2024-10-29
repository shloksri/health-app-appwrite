import React, { useState } from 'react';
import { databases } from '../appwrite/config'; // Import Appwrite client
import { useUser } from '../context/UserContext'; // Custom hook to get current user
// import './styles/CreateReminder.css';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const REMINDERS_COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID_REMINDERS;

const CreateReminder = () => {
    const { user } = useUser(); // Get logged-in user's ID from context
    const [reminderDate, setReminderDate] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Combine date and time into a single DateTime format if needed
        const reminderDateTime = new Date(`${reminderDate}T${reminderTime}:00`).toISOString();

        try {
            // Save the reminder to Appwrite
            await databases.createDocument(
                DATABASE_ID,
                REMINDERS_COLLECTION_ID,
                'unique()', // Auto-generate a document ID
                {
                    userID: user.$id,
                    reminderTime: reminderDateTime,
                    message: message || 'Default Message - Reminder from Mood Journal',
                    email: user.email
                }
            );

            setIsSubmitted(true); // Show confirmation
            setReminderDate(''); // Reset form fields
            setReminderTime('');
            setMessage('');
        } catch (error) {
            console.error('Failed to create reminder:', error);
        }

        // Hide the confirmation message after a few seconds
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <div className="create-reminder-container">
            <h2>Create a Reminder</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="reminderDate">Date:</label>
                <input
                    type="date"
                    id="reminderDate"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    required
                />

                <label htmlFor="reminderTime">Time:</label>
                <input
                    type="time"
                    id="reminderTime"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    required
                />

                <label htmlFor="message">Message (optional):</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your reminder message here..."
                />

                <button type="submit">Set Reminder</button>
            </form>

            {isSubmitted && (
                <div className="popup">
                    <span className="popup-message">Reminder Set Successfully!</span>
                    <button className="close-button" onClick={() => setIsSubmitted(false)}>x</button>
                </div>
            )}
        </div>
    );
};

export default CreateReminder;
