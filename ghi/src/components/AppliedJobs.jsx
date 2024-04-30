import React, { useState } from 'react';
import UserNavigation from './UserNavigation';

const AppliedJobs = ({ appliedJobs }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 4;

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = appliedJobs.slice(indexOfFirstJob, indexOfLastJob);

    const handleDelete = (jobId) => {
        // Add logic to delete the job
    };

    const handleRemind = (jobId) => {
        // Add logic to see job detail
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container-fluid" style={{ minHeight: '80vh' }}>
            <div className="row">
                <UserNavigation />
                <main className="col-md-10 ms-sm-auto col-lg-15 px-md-6" style={{ marginTop: '20px' }}>
                    <div>
                        <h2>My Applications</h2>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Company</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Applied Date</th>
                                    <th scope="col">Remind Me</th>
                                    <th scope="col">Remove me</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentJobs.map((job, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'table-default' : 'table-primary'}>
                                        <td>{job.company_name}</td>
                                        <td>{job.position_title}</td>
                                        <td>{job.applied_at}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-primary me-2"
                                                onClick={() => handleRemind(job.id)}
                                            >
                                                Job Detail
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={() => handleDelete(job.id)}
                                            >
                                                Delete App
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-end">
                        <ul className="pagination pagination-sm" style={{ color: '#300b9b' }}>
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>&laquo;</a>
                            </li>
                            {Array.from({ length: Math.ceil(appliedJobs.length / jobsPerPage) }, (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === Math.ceil(appliedJobs.length / jobsPerPage) ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>&raquo;</a>
                            </li>
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppliedJobs;
