//@ts-check
import React from 'react';
import UserNavigation from './UserNavigation';

const AppliedJobs = ({ appliedJobs }) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <UserNavigation />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ marginTop: '20px' }}>
                    <div>
                        <h2>My Applications</h2>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Company</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Applied Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appliedJobs.map((job, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'table-default' : 'table-primary'}>
                                        <td>{job.company_name}</td>
                                        <td>{job.position_title}</td>
                                        <td>{job.applied_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppliedJobs;
