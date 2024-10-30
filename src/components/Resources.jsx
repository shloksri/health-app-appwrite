import React, { useState, useEffect, useRef } from 'react';
import moodsData from '../data/moods.json';
import './styles/MoodTracker.css';
import { databases, storage } from '../appwrite/config';
import { useUser } from '../context/UserContext';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID; // Your Appwrite database ID
const MOODS_COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID_MOODS; // Collection ID for moods
const BUCKET_ID = import.meta.env.VITE_STORAGE_BUCKET_ID
const IMAGE_ID = import.meta.env.VITE_STORAGE_FILE_ID

const Resources = () => {
    const { user } = useUser(); // Get the user context
    const [selectedMood, setSelectedMood] = useState('');
    const [oneLiner, setOneLiner] = useState('');
    const [reason, setReason] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [animationKey, setAnimationKey] = useState(0);
    const [isImage, setIsImage] = useState(null)

    useEffect(() => {

        const fetchJournals = () => {
            try {
                // Query for all journal entries where userID matches and sort by date descending
                const response = storage.getFileView(BUCKET_ID, IMAGE_ID);
                console.log("Image Response: ", response)
            } catch (err) {
                setError('Failed to load Image');
                setLoading(false);
            }
        };

        fetchJournals();

    }, [isImage]);

    const imageFetch = async () => await storage.getFileView(BUCKET_ID, IMAGE_ID);

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

                <div>
                    Let's display the image here <br />
                    <button onClick={imageFetch}>
                        <img src="https://cloud.appwrite.io/v1/storage/buckets/67222ccf0021554de2be/files/67222d1b0024cc84978e/view?project=671f17fb0030e3b17ebc&project=671f17fb0030e3b17ebc&mode=admin" alt="Image" style={{
                            "height": "250px",
                            "width": "250px"
                        }} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} class="form u-width-full-line u-row-gap-48 u-max-width-500">
                    <ul class="form-list">
                        <li class="form-item">
                            <label htmlFor="mood">Select your mood:</label>
                            <div class="select u-width-full-line">
                                <select id="mood" value={selectedMood} onChange={handleMoodChange} required>
                                    <option value="">-- Select Mood --</option>
                                    {moodsData.map(mood => (
                                        <option key={mood.id} value={mood.name}>{mood.name}</option>
                                    ))}
                                </select>
                                <span class="icon-cheveron-down" aria-hidden="true"></span>
                            </div>
                        </li>
                        <li class="form-item">
                            <label htmlFor="one-liner"></label>
                            <div key={animationKey} className='one-liner typewriter'>{oneLiner}</div>
                        </li>
                        <li class="form-item">
                            <label htmlFor="reason">Why do you feel this way?</label>
                            <textarea
                                class="input-text"
                                id="reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="A reason or an incident in less than 50 characters"
                                required
                            />
                        </li>
                    </ul>
                    <button type="submit" class='button is-secondary'>Submit Mood</button>
                </form>

                {isSubmitted && (
                    <div className="popup">
                        <span className="popup-message">Mood Submitted Successfully!</span>

                        <button
                            class="button is-text is-only-icon"

                            aria-label="Remove item"
                            onClick={handleClosePopup}
                        >
                            <span class="icon-x" aria-hidden="true"></span>
                        </button>
                    </div>
                )}

                {error && <p className="error">{error}</p>}
            </div>


        </div>
    );
};

export default Resources;



// const Resources = () => {
//     const resources = [
//         { id: 1, title: 'Meditation Tips', link: '#' },
//         { id: 2, title: 'Breathing Exercises', link: '#' },
//         { id: 3, title: 'Managing Anxiety', link: '#' },
//     ];

//     return (
//         <div>
//             <h2>Mental Health Resources</h2>
//             <ul>
//                 {resources.map((resource) => (
//                     <li key={resource.id}>
//                         <a href={resource.link}>{resource.title}</a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Resources;
