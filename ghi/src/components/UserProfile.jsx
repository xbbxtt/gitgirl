import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserNavigation from './UserNavigation';
import { useAuthenticateQuery } from '../app/apiSlice';

const UserProfile = () => {
    const navigate = useNavigate()
    const { data: user, isLoading: isLoadingUser } = useAuthenticateQuery()

    useEffect(() => {
        if (!user && !isLoadingUser) {
            navigate('/signin')
        }
    }, [user, isLoadingUser, navigate])

    if (isLoadingUser) return <div>Loading...</div>

    return (
        <div className="container-fluid" style={{ minHeight: '80vh' }}>
            <div className="row">
                <UserNavigation />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ marginTop: '20px' }}>
                    <div className="card mb-3">
                        <h3 className="card-header">Profile</h3>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Full Name:</label>
                                        <div>
                                            {user && <input type="text" className="form-control" value={user.full_name} disabled />}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <div>
                                            {user && <input type="email" className="form-control" value={user.email} disabled />}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>LinkedIn:</label>
                                        <div>
                                            {user && <input type="url" className="form-control" value={user.linkedin_url} disabled />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default UserProfile;
