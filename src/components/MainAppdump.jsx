import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MoodProvider } from '../context/MoodContext';
import Home from "./Home";
import MoodTracker from './MoodTracker';
import Journals from './Journals';
import Resources from './tbd/Resources';
import Reminders from './tbd/Reminders';
import CreateJournal from './CreateJournal'
import ViewYourJournal from './ViewYourJournal'
import Layout from './Layout';
import './styles/Home.css';
import FailComponent from './FailComponent';

const App = () => {
    return (
        <MoodProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/mood-tracker" element={<MoodTracker />} />
                        <Route path="/your-journal/:moodID" component={CreateJournal} />
                        <Route path="/journals" element={<Journals />} />
                        <Route path="/journals/new" element={<CreateJournal />} />
                        <Route path="/journals/:journalID" element={<ViewYourJournal />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/reminders" element={<Reminders />} />
                        <Route path="*" element={<FailComponent />} />
                    </Routes>
                </Layout>

            </Router>
        </MoodProvider>
    )


};

export default App;
