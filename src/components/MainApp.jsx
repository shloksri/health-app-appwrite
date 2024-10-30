import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from '../context/UserContext'
import { useUser } from "../context/UserContext.jsx";
import Home from "./Home";
import MoodTracker from './MoodTracker';
import Journals from './Journals';
import CreateJournal from './CreateJournal'
import Layout from './Layout';
import './styles/Home.css';
import FailComponent from './FailComponent';
import Login from './Login';
import MoodsList from './MoodsList.jsx';


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
