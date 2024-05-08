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
import JobsTable from './components/JobsTable';
import JobDetail from './components/JobDetail';
import CreateJobForm from './components/CreateJobForm'
import ViewApplicants from './components/ViewApplicants';
import './App.css';

const API_HOST = import.meta.env.VITE_API_HOST;

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined');
}

function App() {

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
                    <Route path="/applications" element={<AppliedJobs />} />
                    <Route path="/mypostedjobs" element={<MyPostedJobs />} />
                    <Route path="/jobs" element={<JobsTable/>} />
                    <Route path="/jobs/:jobID" element={<JobDetail />} />
                    <Route path="/jobs/:jobID/applications" element={<ViewApplicants />} />
                    <Route path="/createjob" element={<CreateJobForm />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
