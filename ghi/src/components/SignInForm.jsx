// @ts-check
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthService from '../hooks/useAuthService';

export default function SignInForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signin, user, error } = useAuthService();

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    async function handleFormSubmit(e) {
        e.preventDefault();
        await signin({ username, password });
    }

    if (user) {
        console.log('user', user);
        return <Navigate to="/" />;
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: 'black' }}>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                <form onSubmit={handleFormSubmit} style={{ maxWidth: '20rem', width: '100%' }}>
                    <div className="card text-white bg-primary mb-3">
                        <h4 className="card-header text-center">Welcome back GitGirl </h4>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="exampleInputUsername" className="form-label"> Username</label>
                                <input type="text" className="form-control" id="exampleInputUsername" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-light">Sign In</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
