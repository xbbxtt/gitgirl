//@ts-check
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'

import ListAllJobs from './components/ListAllJobsReference'
import JobDetails from './components/JobDetailsReference'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import UserProfile from './components/UserProfile'
import AppliedJobs from './components/AppliedJobs'
import MyPostedJobs from './components/MyPostedJobs'
import CreateJobForm from './components/CreateJobForm'
import App from './App'

import './index.css'


const BASE_URL = import.meta.env.BASE_URL
if (!BASE_URL) {
    throw new Error('BASE_URL is not defined')
}

const router = createBrowserRouter(
    [
        {
            path: '*',
            element: <App />,
            children: [
                {
                    path: 'signup',
                    element: <SignUpForm />,
                },
                {
                    path: 'signin',
                    element: <SignInForm />,
                },
                {
                    path: 'profile',
                    element: <UserProfile />,
                },
                {
                    path: 'applications',
                    element: <AppliedJobs />,
                },
                {
                    path: 'jobs/mine',
                    element: <MyPostedJobs />,
                },
                {
                    path: 'jobs',
                    element: <MyPostedJobs />,
                },
                {
                    path: 'createjob',
                    element: <CreateJobForm />,
                },
            ],
        },
    ],
    {
        basename: BASE_URL,
    }
)

const rootElement = document.getElementById('root')
if (!rootElement) {
    throw new Error('root element was not found!')
}

// Log out the environment variables while you are developing and deploying
// This will help debug things
// console.table(import.meta.env)

const root = ReactDOM.createRoot(rootElement)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
