// @ts-check
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../app/apiSlice';
import workingwoman from '/src/workingwoman.mp4';

export default function SignUpForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        full_name: '',
        email: '',
        linkedin_url: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [signup, signupStatus] = useSignupMutation()

    useEffect(() => {
        if (signupStatus.isSuccess) navigate('/')
        if (signupStatus.isError) {
            setErrorMessage(signupStatus.error.data.detail)
        }
    }, [signupStatus, navigate])


    const handleFormSubmit = (e) => {
        e.preventDefault();
        signup(formData);
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: 'black' }}>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                <form onSubmit={handleFormSubmit} style={{ maxWidth: '20rem', width: '100%' }}>
                    <div className="card text-white bg-primary mb-3">
                        <h3 className="card-header text-center">Join the GitGirl Network</h3>
                        <div className="card-body">
                            {errorMessage && <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    placeholder="Create a GitGirl Username"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Enter Password"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="full_name" className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    id="full_name"
                                    className="form-control"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    placeholder="Enter Full Name"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="linkedin_url" className="form-label">LinkedIn URL</label>
                                <input
                                    type="text"
                                    id="linkedin_url"
                                    className="form-control"
                                    value={formData.linkedin_url}
                                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                    placeholder="Enter LinkedIn URL"
                                />
                            </div>
                            <button type="submit" className="btn" style={{ backgroundColor: '#e99b9b', color: 'white' }}>Sign Up</button>
                            <button type="submit" className="btn btn-light" onClick={handleFormSubmit}>Sign Up</button>
                        </div>
                    </div>
                </form>
                <div className="card text-white mb-3" style={{ backgroundColor: '#332b3b', width: '100%', flexBasis: '50%', marginLeft: '20px' }}>
                    <video className="card-img-top" controls autoPlay muted loop style={{ width: '100%' }}>
                        <source src={workingwoman} type="video/mp4" />
                        Whoops! Looks like our video is not working.
                    </video>
                    <div className="card-body">
                        <h5 className="card-title text-center" style={{ color: '#e99b9b' }}>Branch Out. Commit. Push Forward.</h5>
                        <p className="card-text"></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
