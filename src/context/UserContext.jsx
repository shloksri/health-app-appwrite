// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUser, logoutUser } from '../appwrite/authappwrite.js';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem('user');
        // console.log("Shlok, first check if user is stored and what is the value: ", savedUser);
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (!user) {

            getUser()
                .then((userData) => {
                    if (userData) {
                        setUser(userData);
                        sessionStorage.setItem('user', JSON.stringify(userData));
                    }
                    return userData;
                }, (error) => {
                    console.error('Shlok your error is in useEffect', error)
                }
                )
        }
        else {
            // console.log("Shlok we got the user from sessionStorage");
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
