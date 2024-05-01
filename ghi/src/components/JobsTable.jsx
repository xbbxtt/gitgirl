import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useLazyListAllJobsQuery,
    useAuthenticateQuery,
    } from '../app/apiSlice';

const JobsTable = () => {
    const navigate = useNavigate()
    const [ jobs, setJobs ] = useState([])
    const { data :user, isLoading: isLoadingUser } = useAuthenticateQuery()
    const [ trigger, result ] = useLazyListAllJobsQuery()
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 4;

    useEffect(() => {
        if (!user && !isLoadingUser) {
            navigate('/signin')
        } else if (user) {
            trigger()
        }
    }, [user, isLoadingUser, navigate, trigger])

    useEffect(() => {
        if (result.isSuccess) setJobs(result.data.jobs)
    }, [result])

    if (result.isLoading) return <div>Loading Jobs...</div>

    const sortedJobs = jobs.slice().sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date));

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);

    const handleApply = (jobId) => {
        // Taylor to apply logic here... new apply button component???
        console.log("Applying for job with ID:", jobId);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container-fluid">
            <div className="row">
                <main className="col-md-12" style={{ marginTop: '20px' }}>
                    <div className="d-flex flex-wrap">
                        <h2 className="w-100">Job Listings</h2>
                        {currentJobs.map((job, index) => (
                            <div key={index} className="card mb-3 w-100 jobs-table-card-container" style={{ borderColor: '#302939', marginRight: '10px', marginBottom: '10px' }}>
                                <div className="card-header" style={{ backgroundColor: '#f2c5c5' }}>
                                    <strong>{job.company_name}</strong>
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <div style={{ position: 'absolute', top: '0', right: '20px' }}>
                                        <p className="card-text">{formatDate(job.posted_date)}</p>
                                    </div>
                                    <h5 className="card-"><strong>{job.position_title}</strong> | {job.location}</h5>
                                    <p className="card-text" style={{ width: '75%' }}>Job Description: {job.job_description}</p>
                                    <div className="d-flex align-items-center justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-secondary mr-3"
                                            style={{ backgroundColor: '#493e57' }}
                                            onClick={() => handleApply(job.id)}
                                        >
                                            Apply
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            style={{ color: 'black', borderColor: '#302939', marginLeft: '10px' }}
                                        >
                                            Job Detail
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
            <div className="d-flex justify-content-end">
                <ul className="pagination pagination-sm" style={{ color: '#300b9b' }}>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>&laquo;</a>
                    </li>
                    {Array.from({ length: Math.ceil(sortedJobs.length / jobsPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(sortedJobs.length / jobsPerPage) ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>&raquo;</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default JobsTable;
