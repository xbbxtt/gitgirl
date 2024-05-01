//@ts-check
import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './components/Home'
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import UserProfile from './components/UserProfile'
import AppliedJobs from './components/AppliedJobs'
import MyPostedJobs from './components/MyPostedJobs'
import JobsTable from './components/JobsTable'
import CreateJobForm from './components/CreateJobForm'
import JobDetail from './components/JobDetail'
import './App.css'

const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

function App() {
    // Mock data for applied jobs - this is just for show until Taylor hooks up backend
    const appliedJobs = [
        {
            company_name: 'Company A',
            position_title: 'Position A',
            applied_at: '2024-04-25',
        },
        {
            company_name: 'Company B',
            position_title: 'Position B',
            applied_at: '2024-04-24',
        },
        {
            company_name: 'Company C',
            position_title: 'Position C',
            applied_at: '2024-04-23',
        },
        {
            company_name: 'Company D',
            position_title: 'Position D',
            applied_at: '2024-04-22',
        },
        {
            company_name: 'Company E',
            position_title: 'Position E',
            applied_at: '2024-04-21',
        },
    ]

    const postedJobs = [
        {
            company_name: 'Company F',
            position_title: 'Position A',
            posted_date: '2024-04-25',
        },
        {
            company_name: 'Company G',
            position_title: 'Position B',
            posted_date: '2024-04-24',
        },
        {
            company_name: 'Company H',
            position_title: 'Position C',
            posted_date: '2024-04-23',
        },
        {
            company_name: 'Company I',
            position_title: 'Position D',
            posted_date: '2024-04-22',
        },
        {
            company_name: 'Company J',
            position_title: 'Position E',
            posted_date: '2024-04-21',
        },
    ]

    const jobs = [
        {
            company_name: 'Google',
            position_title: 'Position A',
            location: 'Remote-US',
            posted_date: '2024-04-25',
            job_desc:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',
        },
        {
            company_name: 'Amazon',
            position_title: 'Position B',
            location: 'Dallas,TX',
            posted_date: '2024-04-26',
            job_desc:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',
        },
        {
            company_name: 'Meta',
            position_title: 'Position D',
            location: 'Atlanta,GA',
            posted_date: '2024-04-26',
            job_desc:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',
        },
        {
            company_name: 'Notion',
            position_title: 'Position D',
            location: 'Atlanta,GA',
            posted_date: '2024-04-26',
            job_desc:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',
        },
        {
            company_name: 'Telsa',
            position_title: 'Position E',
            location: 'New York, NY',
            posted_date: '2024-04-28',
            job_desc:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',
        },
        {
            company_name: 'HeadSpace',
            position_title: 'Position E',
            location: 'New York, NY',
            posted_date: '2024-04-29',
            job_desc:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',
        },
        {
            company_name: 'OpenAI',
            position_title: 'Position E',
            location: 'New York, NY',
            posted_date: '2024-04-29',
            job_desc:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',
        },
        {
            company_name: 'Calendly',
            position_title: 'Position E',
            location: 'New York, NY',
            posted_date: '2024-04-29',
            job_desc:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',
        },
    ]

    const postedJobsDetail = [
        {
            id: '4',
            creator_id: '1',
            company_name: 'Company F',
            position_title: 'Position A',
            location: 'New York, NY',
            posted_date: '2024-04-25',
            image_url:
                'https://www.edigitalagency.com.au/wp-content/uploads/Linkedin-logo-png.png',
            job_desc:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',
        },
    ]

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
                    <Route
                        path="/applications"
                        element={<AppliedJobs appliedJobs={appliedJobs} />}
                    />
                    <Route
                        path="/mypostedjobs"
                        element={<MyPostedJobs postedJobs={postedJobs} />}
                    />
                    <Route path="/jobs" element={<JobsTable jobs={jobs} />} />
                    <Route path="/createjob" element={<CreateJobForm />} />
                    <Route path="/jobs/:jobId" element={<JobDetail />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
