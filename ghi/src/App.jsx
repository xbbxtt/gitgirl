// App.js
//@ts-check
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import UserProfile from './components/UserProfile';
import AppliedJobs from './components/AppliedJobs';
import MyPostedJobs from './components/MyPostedJobs';
import './App.css';

const API_HOST = import.meta.env.VITE_API_HOST;

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined');
}

function App() {
    // Mock data for applied jobs - this is just for show until Taylor hooks up backend
    const appliedJobs = [
        { company_name: 'Company A', position_title: 'Position A', applied_date: '2024-04-25' },
        { company_name: 'Company B', position_title: 'Position B', applied_date: '2024-04-24' },
        { company_name: 'Company C', position_title: 'Position C', applied_date: '2024-04-23' },
        { company_name: 'Company D', position_title: 'Position D', applied_date: '2024-04-22' },
        { company_name: 'Company E', position_title: 'Position E', applied_date: '2024-04-21' },
    ];

    const postedJobs = [
        { company_name: 'Company F', position_title: 'Position A', posted_date: '2024-04-25' },
        { company_name: 'Company G', position_title: 'Position B', posted_date: '2024-04-24' },
        { company_name: 'Company H', position_title: 'Position C', posted_date: '2024-04-23' },
        { company_name: 'Company I', position_title: 'Position D', posted_date: '2024-04-22' },
        { company_name: 'Company J', position_title: 'Position E', posted_date: '2024-04-21' },
    ];

    return (
        <div className="App">
            <header className="App-header">
                <Navigation />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="/signin" element={<SignInForm />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/applications" element={<AppliedJobs appliedJobs={appliedJobs} />} />
                    <Route path="/postedjobs" element={<MyPostedJobs postedJobs={postedJobs} />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
