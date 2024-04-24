// @ts-check
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthService from '../hooks/useAuthService';

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        full_name: '',
        email: '',
        linkedin_url: ''
    });
    const { signup, user, error } = useAuthService();

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    async function handleFormSubmit(e) {
        e.preventDefault();
        await signup(formData);
    }

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: 'black' }}>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                <form onSubmit={handleFormSubmit} style={{ maxWidth: '20rem', width: '100%' }}>
                    {error && <div className="error">{error.message}</div>}
                    <div className="card text-white bg-primary mb-3">
                        <h3 className="card-header text-center">Join the GitGirl Network</h3>
                        <div className="card-body">
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
                            <button type="submit" className="btn btn-light">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
