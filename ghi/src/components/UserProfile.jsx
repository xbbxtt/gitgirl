//@ts-check
import React from 'react';
import { Link } from 'react-router-dom';
import UserNavigation from './UserNavigation';

function UserProfile({ fullName, email, linkedInUrl }) {
    return (
        <div className="container-fluid">
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
                                            <input type="text" className="form-control" value={fullName} disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <div>
                                            <input type="email" className="form-control" value={email} disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>LinkedIn:</label>
                                        <div>
                                            <input type="url" className="form-control" value={linkedInUrl} disabled />
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
