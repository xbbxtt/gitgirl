import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavigation from './UserNavigation';
import JobDetailForApp from './JobDetailForApp';
import {
    useAuthenticateQuery,
    useLazyListAllAppsForJobseekerQuery,
    useDeleteAppMutation,
} from '../app/apiSlice';

const AppliedJobs = () => {
    const navigate = useNavigate();
    const [deleteID, setDeleteID] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: user, isLoading: isLoadingUser } = useAuthenticateQuery();
    const [appListTrigger, appListResult] =
        useLazyListAllAppsForJobseekerQuery();
    const [deleteApp, deleteAppStatus] = useDeleteAppMutation();

    const jobsPerPage = 8

    useEffect(() => {
        if (!user && !isLoadingUser) {
            navigate('/signin');
        } else if (user) {
            appListTrigger();
        };
    }, [user, isLoadingUser, navigate, appListTrigger]);

    useEffect(() => {
        if (appListResult.isSuccess) {
            setAppliedJobs(appListResult.data.applications);
        } else if (appListResult.isError) {
            setModalMessage(appListResult.error.data.detail);
            setAppliedJobs([]);
            setShowModal(true);
        };
    }, [appListResult, setModalMessage, setAppliedJobs, setShowModal]);

    if (appListResult.isLoading) {
        return (
        <div>Loading your applications...</div>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    };

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = appliedJobs.slice(indexOfFirstJob, indexOfLastJob);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = (appID) => {
        setDeleteID(appID);
        setShowModal(true);
        setModalMessage('Are you sure you want to delete this application?');
        setDeleteModal(true);
    };

    const confirmDelete = () => {
        deleteApp(deleteID);
        setDeleteID('');
        setShowModal(false);
        setModalMessage('');
        setDeleteModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
        setDeleteModal(false);
        setModalMessage('');
    };

    return (
        <>
            {showModal && (
                <div
                    className="modal"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                >
                    <div
                        className="modal-dialog"
                        role="document"
                        style={{ width: '30%', textAlign: 'center' }}
                    >
                        <div className="modal-content">
                            <div
                                className="modal-header"
                                style={{
                                    backgroundColor: '#dda3a6',
                                    textAlign: 'center',
                                    position: 'relative',
                                    height: '60px',
                                }}
                            >
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        color: '#fff',
                                        fontSize: '0.8rem',
                                    }}
                                    aria-label="Close"
                                ></button>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <h3 style={{ margin: '0', color: 'black' }}>
                                        Hey GitGirl,
                                    </h3>
                                </div>
                            </div>
                            <div
                                className="modal-body"
                                style={{
                                    paddingTop: '12px',
                                    paddingBottom: '0px',
                                }}
                            >
                                <p>{modalMessage}</p>
                            </div>
                            <div
                                className="modal-footer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'white',
                                    borderTop: 'none',
                                    paddingBottom: '10px',
                                    paddingTop: '0px',
                                }}
                            >
                                {deleteModal && (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={confirmDelete}
                                        style={{ borderRadius: '0' }}
                                    >
                                        Yes
                                    </button>
                                )}
                                {deleteModal && (
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeModal}
                                        style={{ borderRadius: '0' }}
                                    >
                                        No
                                    </button>
                                )}
                                {!deleteModal && (
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeModal}
                                        style={{ borderRadius: '0' }}
                                    >
                                        Close
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="container-fluid" style={{ minHeight: '80vh' }}>
                <div className="row">
                    <UserNavigation />
                    <main
                        className="col-md-10 ms-sm-auto col-lg-15 px-md-6"
                        style={{ marginTop: '20px' }}
                    >
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
                                    {currentJobs.map((app, index) => (
                                        <tr
                                            key={index}
                                            className={
                                                index % 2 === 0
                                                    ? 'table-default'
                                                    : 'table-primary'
                                            }
                                        >
                                            <JobDetailForApp
                                                jobID={app.job_id}
                                            />
                                            <td>
                                                {formatDate(app.applied_at)}
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary me-2"
                                                    onClick={() =>
                                                        navigate(
                                                            `/jobs/${app.job_id}`
                                                        )
                                                    }
                                                >
                                                    Job Detail
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary"
                                                    onClick={() =>
                                                        handleDelete(app.id)
                                                    }
                                                >
                                                    Delete Application
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-content-end">
                            <ul
                                className="pagination pagination-sm"
                                style={{ color: '#300b9b' }}
                            >
                                <li
                                    className={`page-item ${
                                        currentPage === 1 ? 'disabled' : ''
                                    }`}
                                >
                                    <a
                                        className="page-link"
                                        href="#"
                                        onClick={() =>
                                            paginate(currentPage - 1)
                                        }
                                    >
                                        &laquo;
                                    </a>
                                </li>
                                {Array.from(
                                    {
                                        length: Math.ceil(
                                            appliedJobs.length / jobsPerPage
                                        ),
                                    },
                                    (_, i) => (
                                        <li
                                            key={i}
                                            className={`page-item ${
                                                currentPage === i + 1
                                                    ? 'active'
                                                    : ''
                                            }`}
                                        >
                                            <a
                                                className="page-link"
                                                href="#"
                                                onClick={() => paginate(i + 1)}
                                            >
                                                {i + 1}
                                            </a>
                                        </li>
                                    )
                                )}
                                <li
                                    className={`page-item ${
                                        currentPage ===
                                        Math.ceil(
                                            appliedJobs.length / jobsPerPage
                                        )
                                            ? 'disabled'
                                            : ''
                                    }`}
                                >
                                    <a
                                        className="page-link"
                                        href="#"
                                        onClick={() =>
                                            paginate(currentPage + 1)
                                        }
                                    >
                                        &raquo;
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default AppliedJobs;
