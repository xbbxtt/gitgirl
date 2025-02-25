import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    useAuthenticateQuery,
    useLazyListAllJobsByPosterQuery,
    useDeleteJobMutation,
} from '../app/apiSlice'
import UserNavigation from './UserNavigation'

const MyPostedJobs = () => {
    const navigate = useNavigate()
    const [deleteID, setDeleteID] = useState('')
    const [myJobs, setMyJobs] = useState([])
    const [modalMessage, setModalMessage] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const { data: user, isLoading: isLoadingUser } = useAuthenticateQuery()
    const [listJobsTrigger, listJobsResult] = useLazyListAllJobsByPosterQuery()
    const [deleteJob, deleteJobStatus] = useDeleteJobMutation()
    const [currentPage, setCurrentPage] = useState(1)

    const jobsPerPage = 8

    useEffect(() => {
        if (!user && !isLoadingUser) {
            navigate('/signin')
        } else if (user) {
            listJobsTrigger()
        }
    }, [user, isLoadingUser, navigate, listJobsTrigger])

    useEffect(() => {
        if (listJobsResult.isSuccess) {
            setMyJobs(listJobsResult.data.jobs)
        } else if (listJobsResult.isError) {
            setModalMessage(listJobsResult.error.data.detail)
            setMyJobs([])
            setShowModal(true)
        }
    }, [listJobsResult])

    if (listJobsResult.isLoading) {
        return <div>Loading Jobs You've Posted...</div>
    }

    const indexOfLastJob = currentPage * jobsPerPage
    const indexOfFirstJob = indexOfLastJob - jobsPerPage
    const currentJobs = myJobs.slice(indexOfFirstJob, indexOfLastJob)

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const month = date.toLocaleString('default', { month: 'short' })
        const day = date.getDate()
        const year = date.getFullYear()
        return `${month}-${day}-${year}`
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const handleDelete = (jobID) => {
        setDeleteID(jobID)
        setShowModal(true)
        setModalMessage('Are you sure you want to delete this job posting?')
        setDeleteModal(true)
    }

    const confirmDelete = () => {
        deleteJob(deleteID)
        setDeleteID('')
        setShowModal(false)
        setModalMessage('')
        setDeleteModal(false)
    }

    const closeModal = () => {
        setShowModal(false)
        setModalMessage('')
        setDeleteModal(false)
    }

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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="35"
                                        height="35"
                                        fill="currentColor"
                                        className="bi bi-exclamation-triangle"
                                        viewBox="0 0 16 16"
                                        style={{ marginRight: '5px' }}
                                    >
                                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                                    </svg>
                                    <h3 style={{ margin: '0', color: 'black' }}>
                                        Uh-oh!
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
                        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
                        style={{ marginTop: '20px' }}
                    >
                        <div>
                            <h2>Posted Jobs</h2>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Company</th>
                                        <th scope="col">Position</th>
                                        <th scope="col">Posted Date</th>
                                        <th
                                            scope="col"
                                            style={{ width: '170px' }}
                                        >
                                            Review GitGirls
                                        </th>
                                        <th scope="col">Remind Me</th>
                                        <th scope="col">Remove Job</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentJobs.map((job, index) => (
                                        <tr
                                            key={index}
                                            className={
                                                index % 2 === 0
                                                    ? 'table-default'
                                                    : 'table-primary'
                                            }
                                        >
                                            <td>{job.company_name}</td>
                                            <td>{job.position_title}</td>
                                            <td>
                                                {formatDate(job.posted_date)}
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary me-2"
                                                    onClick={() =>
                                                        navigate(
                                                            `/jobs/${job.id}/applications`
                                                        )
                                                    }
                                                >
                                                    View Applicants
                                                </button>
                                            </td>
                                            <td>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'left',
                                                    }}
                                                >
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary"
                                                        style={{
                                                            color: '#332B3B',
                                                            borderColor:
                                                                '#332B3B',
                                                        }}
                                                        onClick={() =>
                                                            navigate(
                                                                `/jobs/${job.id}`
                                                            )
                                                        }
                                                    >
                                                        Job Detail
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary"
                                                    onClick={() =>
                                                        handleDelete(job.id)
                                                    }
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
                                            myJobs.length / jobsPerPage
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
                                        Math.ceil(myJobs.length / jobsPerPage)
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
    )
}

export default MyPostedJobs
