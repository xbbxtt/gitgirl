//@ts-check
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './components/Home'
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import ListAllJobs from './components/ListAllJobs'
import UserProfile from './components/UserProfile';
import './App.css'
import JobDetails from './components/JobDetails';

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Navigation />
            </header>
            <main>
                <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="/signin" element={<SignInForm />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/jobs" element={<ListAllJobs />} />
                    <Route path="/jobs/:jobID" element={<JobDetails />} />
                </Routes>
            </main>
            </main>
            <Footer />
        </div>
    )
}

export default App
