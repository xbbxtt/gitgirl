// @ts-check
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSigninMutation } from '../app/apiSlice';


export default function SignInForm() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [signin, signinStatus] = useSigninMutation()


    useEffect(() => {
        if (signinStatus.isSuccess) navigate('/')
        if (signinStatus.isError) {
            setErrorMessage(signinStatus.error.data.detail)
        }
    }, [signinStatus, navigate])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        signin({ username, password });
    }


    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', backgroundColor: 'white' }}>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                <form onSubmit={handleFormSubmit} style={{ maxWidth: '20rem', width: '100%' }}>
                    <div className="card text-white mb-3" style={{ backgroundColor: '#332b3b' }}>
                        <h3 className="card-header text-center" style={{ color: '#e99b9b' }}>Welcome back GitGirl</h3>
                        <div className="card-body">
                            {errorMessage && <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>}
                            <div className="mb-3">
                                <label htmlFor="exampleInputUsername" className="form-label">Username</label>
                                <input type="text" className="form-control" id="exampleInputUsername" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn" style={{ backgroundColor: '#e99b9b', color: 'white' }}>Sign In</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
