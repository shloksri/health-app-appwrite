import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../appwrite/authappwrite.js'
import { useUser } from "../context/UserContext.jsx";
import './styles/Home.css';
import Login from './Login';

const Home = () => {
    const { user, setUser } = useUser()

    const handleLogout = async () => {
        await logoutUser();
        setUser(null);
    }

    useEffect(() => {
        // console.log("THIS will log if the user is deleted or changed");
    }, [user])

    return (

        <>
            {
                user ?
                    <div>
                        {/* header */}
                        <div className='box login-page-div u-margin-block-32 u-margin-inline-128'>
                            <header className="grid-header">
                                <h2 className="grid-header-col-1 heading-level-5 u-cross-child-center">
                                    {
                                        <>
                                            <p>Welcome, {user.name}!</p>
                                            {/* <p className='disclaimer-login-page body-text-2'>Email: {user.email}</p> */}
                                        </>
                                    }
                                </h2>
                                <div className="u-flex u-gap-16 u-contents-mobile">
                                    <button onClick={handleLogout} className="grid-header-col-2 button is-big" type="button">
                                        <span className="icon-logout-left logout-button" aria-hidden="true"></span>
                                        <span className="text logout-button">Logout</span>
                                    </button>
                                </div>
                            </header>
                        </div>

                        <div className='u-flex u-main-center u-cross-center u-column-gap-80 u-margin-block-32 u-margin-inline-128 u-padding-96'> {/* div for 2 sections of options */}

                            <div className="box login-page-div u-flex u-flex-vertical u-main-center u-cross-center u-row-gap-48 u-margin-inline-64 u-padding-52">

                                <h4 className="heading-level-4">What do you wanna do today?</h4>

                                <div className="options u-row-gap-48 u-text-center">

                                    <Link to="/mood-tracker" className='option-button' data-hover="Track and reflect on how you're feeling today.">
                                        Check Your Mood
                                    </Link>
                                    <Link to="/journals/new" className='option-button' data-hover="Write about your day and organize your thoughts.">
                                        Write in a new Journal
                                    </Link>
                                </div>

                            </div>
                            <div className="box login-page-div u-flex u-flex-vertical u-main-center u-cross-center u-row-gap-48 u-margin-inline-64 u-padding-52">

                                <h4 className="heading-level-4">Reflect back</h4>

                                <div className="options u-row-gap-48 u-text-center">

                                    <Link to="/moods-list" className="option-button" data-hover="List of all your moods.">
                                        Your daily moods List
                                    </Link>
                                    <Link to="/journals" className="option-button" data-hover="Write about your day and organize your thoughts.">
                                        View your journals
                                    </Link>
                                </div>

                            </div>
                        </div >
                    </div>

                    : <Login />
            }
        </>
    );
};

export default Home;
