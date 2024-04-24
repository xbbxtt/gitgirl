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
        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '1rem' }}>
            <div className="container" style={{ maxWidth: '20rem' }}>
                <form onSubmit={handleFormSubmit}>
                    {error && <div className="error">{error.message}</div>}
                    <div className="card border-primary mb-3">
                        <h2 className="card-header text-center">Sign Up to be a GitGirl</h2>
                        <div className="card-body">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    placeholder="Enter Username"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Enter Password"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    placeholder="Enter Full Name"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.linkedin_url}
                                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                    placeholder="Enter LinkedIn URL"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
