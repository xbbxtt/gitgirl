//@ts-check
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useAuthenticateQuery,
    useLazyListAllJobsByPosterQuery
} from '../app/apiSlice'
import UserNavigation from './UserNavigation';

const MyPostedJobs = () => {
    const navigate = useNavigate()
    const [ myJobs, setMyJobs ] = useState([])
    const {data: user, isLoading: isLoadingUser} = useAuthenticateQuery()
    const [ trigger, result ] = useLazyListAllJobsByPosterQuery()
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
        if (result.isSuccess) setMyJobs(result.data.jobs)
    }, [result])

    if (result.isLoading) return <div>Loading Jobs You've Posted...</div>

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = myJobs.slice(indexOfFirstJob, indexOfLastJob);

    const handleJobDetail = (jobId) => {
        // we can remove with component when Taylor pushes
    };

    const handleDeleteJob = (jobId) => {
        // we can remove with component when Taylor pushes
    };

    const handleViewApplicants = (jobId) => {
        // we can remove with component when Taylor pushes - this won't stay & isn't right
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
        <div className="container-fluid" style={{ minHeight: '80vh' }}>
            <div className="row">
                <UserNavigation />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ marginTop: '20px' }}>
                    <div>
                        <h2>Posted Jobs</h2>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Company</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Posted Date</th>
                                    <th scope="col">Remind Me</th>
                                    <th scope="col">Review GitGirls</th>
                                    <th scope="col">Remove Job</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentJobs.map((job, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'table-default' : 'table-primary'}>
                                        <td>{job.company_name}</td>
                                        <td>{job.position_title}</td>
                                        <td>{formatDate(job.posted_date)}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-primary me-2"
                                                onClick={() => handleJobDetail(job.id)}
                                            >
                                                Job Detail
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={() => handleViewApplicants(job.id)}
                                            >
                                                View Applicants
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={() => handleDeleteJob(job.id)}
                                            >
                                                Delete Job
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
                            {Array.from({ length: Math.ceil(myJobs.length / jobsPerPage) }, (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === Math.ceil(myJobs.length / jobsPerPage) ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>&raquo;</a>
                            </li>
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MyPostedJobs;
