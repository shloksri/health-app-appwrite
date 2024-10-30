import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MoodProvider } from '../context/MoodContext';
import { UserProvider } from '../context/UserContext'
import Home from "./Home";
import MoodTracker from './MoodTracker';
import Journals from './Journals';
import Resources from './Resources';
import Reminders from './Reminders.jsx';
import CreateJournal from './CreateJournal'
import ViewYourJournal from './ViewYourJournal'
import Layout from './Layout';
import './styles/Home.css';
import FailComponent from './FailComponent';
import Login from './Login';
import Logout from './Logout';
import { useUser } from "../context/UserContext.jsx";
import MoodsList from './MoodsList.jsx';
import CreateReminder from './CreateReminder.jsx';


const App = () => {
    const { user, setUser } = useUser()
    useEffect(() => {
        // console.log("THE USER JUST GOT UPDATED");
    }, [user])

    return (

        <div>
            {user ?

                <UserProvider>
                    <Router>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Home setUser={setUser} />} />
                                <Route path="/mood-tracker" element={<MoodTracker />} />
                                <Route path="/moods-list" element={<MoodsList />} />
                                <Route path="/journals" element={<Journals />} />
                                <Route path="/journals/new" element={<CreateJournal />} />
                                <Route path="/resources" element={<Resources />} />
                                <Route path="/reminders" element={<Reminders />} />
                                <Route path="/reminders/new" element={<CreateReminder />} />
                                <Route path="*" element={<FailComponent />} />
                            </Routes>
                        </Layout>
                    </Router>
                </UserProvider>
                : <Login />}

        </div>



    )


};

export default App;
