//@ts-check
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'

import ListAllJobs from './components/ListAllJobs'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import UserProfile from './components/UserProfile'
import App from './App'
import AuthProvider from './components/AuthProvider'

import './index.css'
import JobDetails from './components/JobDetails'


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
                    path: 'jobs',
                    element: <ListAllJobs />
                },
                {
                    path: 'jobs/:jobID',
                    element: <JobDetails />
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
