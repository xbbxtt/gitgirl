import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useLazyListAllJobsQuery,
    useAuthenticateQuery,
    useLazyListAllAppsForJobseekerQuery,
    useCreateAppMutation
    } from '../app/apiSlice';

const JobsTable = () => {
    const navigate = useNavigate();

    const [ errorMessage, setErrorMessage ] = useState('');
    const [ jobs, setJobs ] = useState([]);
    const [ jobIDs, setJobIDs ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);
    const [ currentPage, setCurrentPage ] = useState(1);
    // redux hooks
    const { data :user, isLoading: isLoadingUser } = useAuthenticateQuery();
    const [ listAppsTrigger, listAppsResult ] = useLazyListAllAppsForJobseekerQuery();
    const [ listJobsTrigger, listJobsResult ] = useLazyListAllJobsQuery();
    const [ apply, applyStatus ] = useCreateAppMutation();

    const jobsPerPage = 4;

    // if no user, navigate to signin form...
    // if there is a user, trigger useLazyListAllJobsQuery()
    // and useLazyListAllAppsForJobSeekerQuery() redux hook function
    useEffect(() => {
        if (!user && !isLoadingUser) {
            navigate('/signin');
        } else if (user) {
            listAppsTrigger();
            listJobsTrigger();
        };
    }, [user, isLoadingUser, navigate, listJobsTrigger, listAppsTrigger]);

    // if app list result loads successfully, loop through apps
    // for their job IDs and setJobIDs on line 15
    // ..this is the list of jobIDs the user has applied to
    // and changes the apply button to a disabled applied button

    useEffect(() => {
        if (listAppsResult.isSuccess) {
            setJobIDs((listAppsResult.data.applications).map(app => app.job_id));
        } else if (listAppsResult.isError) {
            setJobIDs([]);
        };
    }, [listAppsResult, setJobIDs]);

    // if job list result loads successfully, setJobs on line 14
    // else, set error message and show modal
    useEffect(() => {
        if (listJobsResult.isSuccess) {
            setJobs(listJobsResult.data.jobs);
        } else if (listJobsResult.isError) {
            setErrorMessage(listJobsResult.error.data.detail);
            setShowModal(true);
        };
    }, [listJobsResult, setErrorMessage, setShowModal]);

    if (listJobsResult.isLoading ||
        listAppsResult.isLoading ||
        isLoadingUser) {
        return (<div>Loading Jobs...</div>);
    };

    const sortedJobs = jobs.slice().sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date));

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    };

    // if userID and job creator id matches, don't let them apply
    // else apply
    const handleApply = (creatorID, jobID) => {
        if (user.id === creatorID) {
            setShowModal(true)
            setErrorMessage("You can't apply to your own job posting")
        } else {
            apply(jobID)
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const closeModal = () => {
        setShowModal(false);
        setErrorMessage('');
    }

    return (
        <>
            {showModal && (
                <div className="modal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header" style={{ backgroundColor: '#e99b9b', textAlign: 'center', position: 'relative' }}>
                                <button type="button" className="btn-close" onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px', color: '#fff', fontSize: '1.25rem' }} aria-label="Close"></button>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16" style={{ marginRight: '5px' }}>
                                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                    </svg>
                                    <h3 style={{ margin: '0', color: 'black' }}>Uh-oh!</h3>
                                </div>
                            </div>
                            <div className="modal-body" style={{ padding: '10px' }}>
                                <p>{errorMessage}</p>
                            </div>
                            <div className="modal-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderTop: 'none', padding: '10px' }}>
                                <button type="button" className="btn btn-secondary" onClick={closeModal} style={{ borderRadius: '0' }}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
                                            <p className="card-text" style={{ width: '75%' }}>
                                                {job.job_description.length > 500 ? `${job.job_description.substring(0, 500)}...` : job.job_description} </p>
                                        <div className="d-flex align-items-center justify-content-end">
                                            {(jobIDs.includes(job.id)) ?
                                            <button
                                                type="button"
                                                className="btn btn-secondary mr-3"
                                                style={{ backgroundColor: '#493e57' }}
                                                disabled
                                            >
                                                Applied
                                            </button> :
                                            <button
                                                type="button"
                                                className="btn btn-secondary mr-3"
                                                style={{ backgroundColor: '#493e57' }}
                                                onClick={() => handleApply(job.creator_id, job.id)}
                                            >
                                                Apply
                                            </button>}
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                style={{ color: 'black', borderColor: '#302939', marginLeft: '10px' }}
                                                onClick={() => navigate(`/jobs/${job.id}`)}
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
        </>
    );
};

export default JobsTable;
