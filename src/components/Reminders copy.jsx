import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Reminders.css';
import { useUser } from '../context/UserContext'
import { Query } from 'appwrite';
import { databases } from "../appwrite/config";
import ViewYourReminder from './ViewYourReminder'

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID; // your Appwrite database ID
const REMINDERS_COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID_REMINDERS; // your collection ID

function Reminders() {

    const { user, setUser } = useUser(); //Context
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userID, setUserID] = useState(() => user ? user.$id : null)
    const [selectedReminder, setSelectedReminder] = useState(null);

    useEffect(() => {
        console.log("user ID:", user.$id);
        const fetchReminders = async () => {
            try {
                // Query for all reminder entries where userID matches and sort by date descending
                const response = await databases.listDocuments(
                    DATABASE_ID,
                    REMINDERS_COLLECTION_ID,
                    [
                        Query.equal('userID', userID)
                    ],
                    { orderAttributes: [user.$createdAt], orderTypes: ['DESC'] }
                );

                setReminders(response.documents); // Set fetched reminders to state
                setLoading(false); // Stop loading
            } catch (err) {
                setError('Failed to load reminders.');
                setLoading(false);
            }
        };

        fetchReminders();

    }, [userID]);

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
                                <h3>Reminder: {reminder.reminderTime}</h3>
                                <p>{reminder.message}</p>
                            </li>
                        ))}
                    </ul>
                </>

            ) : (
                <p>No reminders found for this user.</p>
            )}
        </div>
    );
}

export default Reminders;
