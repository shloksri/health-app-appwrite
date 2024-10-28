// MoodContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
export const MoodContext = createContext();

// Create a provider component
export const MoodProvider = ({ children }) => {
    const [selectedMood, setSelectedMood] = useState(null);
    const [moodID, setMoodID] = useState(null);

    return (
        <MoodContext.Provider value={{ selectedMood, setSelectedMood, moodID, setMoodID }}>
            {children}
        </MoodContext.Provider>
    );
};

export const useMood = () => useContext(MoodContext);