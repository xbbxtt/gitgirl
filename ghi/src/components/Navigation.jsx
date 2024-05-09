import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthenticateQuery, useSignoutMutation } from '../app/apiSlice';

const Navigation = () => {
    const navigate = useNavigate();
    const { data: user, isLoading: isLoadingUser } = useAuthenticateQuery();
    const [ signout, signoutStatus ] = useSignoutMutation();

    useEffect(() => {
        if (signoutStatus.isSuccess) navigate('/')
    }, [signoutStatus]);

    const onSignoutClick = () => {
        signout();
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#302939' }} data-bs-theme="dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">GitGirl</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {!isLoadingUser && user ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link" style={{ color: '#e99b9b' }}> Logged in as, {user.username}</span>
                                </li>
                                <li className="nav-item">                                       </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" onClick={onSignoutClick}>Sign Out</NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signin">Sign In</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
