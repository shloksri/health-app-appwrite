import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';
import Logout from './Logout';

import { useUser } from '../context/UserContext'
import Login from './Login';

const Home = () => {
    const { user, setUser } = useUser()

    useEffect(() => {
        console.log("THIS will log if the user is deleted or changed");
    }, [user])

    return (

        <>
            {
                user ? <div className="home-container">
                    <Logout />
                    <hr />
                    <div className="center-box">
                        <h2 className="center-question">What do you want to do today?</h2>
                        <div className="options">
                            <Link to="/mood-tracker" className="option-button" data-hover="Track and reflect on how you're feeling today.">
                                Check Your Mood
                            </Link>
                            <Link to="/moods-list" className="option-button" data-hover="TList of all your moods.">
                                Your daily moods List
                            </Link>
                            <Link to="/journals/new" className="option-button" data-hover="Write about your day and organize your thoughts.">
                                Write in a new Journal
                            </Link>
                            <Link to="/journals" className="option-button" data-hover="Write about your day and organize your thoughts.">
                                View your journals
                            </Link>
                            <Link to="/resources" className="option-button" data-hover="Access helpful mental health and wellness resources.">
                                Wellness Resources
                            </Link>
                            <Link to="/reminders" className="option-button" data-hover="Set reminders to help you stay connected and grounded.">
                                Your Reminders
                            </Link>
                        </div>
                    </div>
                </div>
                    : <Login />
            }</>
    );
};

export default Home;
