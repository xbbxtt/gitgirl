import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    useLazyJobDetailsQuery,
    useAuthenticateQuery,
    useLazyListAllAppsForJobseekerQuery,
    useDeleteJobMutation,
    useCreateAppMutation,
} from '../app/apiSlice'

const JobDetail = () => {
    const navigate = useNavigate()
    const params = useParams()

    const [deleteID, setDeleteID] = useState('')
    const [jobIDs, setJobIDs] = useState([])
    const [job, setJob] = useState({})
    const [modalMessage, setModalMessage] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const { data: user, isLoading: isLoadingUser } = useAuthenticateQuery()
    const [jobDetailTrigger, jobDetailResult] = useLazyJobDetailsQuery()
    const [apply, applyStatus] = useCreateAppMutation()
    const [listAppsTrigger, appListResult] =
        useLazyListAllAppsForJobseekerQuery()
    const [deleteJob, deleteJobStatus] = useDeleteJobMutation()

    // if there is a user, trigger redux hooks
    useEffect(() => {
        if (!user && !isLoadingUser) {
            navigate('/signin')
        } else if (user) {
            jobDetailTrigger(params.jobID)
            listAppsTrigger()
        }
    }, [user, isLoadingUser, navigate, jobDetailTrigger, listAppsTrigger])

    // if app list result loads successfully, loop through apps
    // for their job IDs and setJobIDs on line 16
    // ..this is the list of jobIDs the user has applied to
    // and changes the apply button to a disabled applied button
    useEffect(() => {
        if (appListResult.isSuccess) {
            setJobIDs(appListResult.data.applications.map((app) => app.job_id))
        } else if (appListResult.isError) {
            setJobIDs([])
        }
    }, [appListResult])

    // if job detail result loads successfully, setJob on line 17
    // else, set error message and show modal
    useEffect(() => {
        if (jobDetailResult.isSuccess) {
            setJob(jobDetailResult.data)
        }
    }, [jobDetailResult, setJob])

    if (jobDetailResult.isLoading || appListResult.isLoading || isLoadingUser) {
        return <div>Loading Job Details...</div>
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const month = date.toLocaleString('default', { month: 'short' })
        const day = date.getDate()
        const year = date.getFullYear()
        return `${month}-${day}-${year}`
    }

    // if userID and job creator id matches, don't let them apply...
    // else apply
    const handleApply = (creatorID, jobID) => {
        if (user.id === creatorID) {
            setShowModal(true)
            setModalMessage("You can't apply to your own job posting")
        } else {
            apply(jobID)
        }
    }

    //stores job id you want to delete in state...
    // delete modal state shows yes/no buttons in modal instead of close button
    const handleDelete = (jobID) => {
        setDeleteID(jobID)
        setShowModal(true)
        setModalMessage('Are you sure you want to delete this job posting?')
        setDeleteModal(true)
    }

    // deleteJob takes delete id stored in state
    // and executes useDeleteJobMutation() function
    const confirmDelete = (e) => {
        deleteJob(deleteID)
        setDeleteID('')
        setShowModal(false)
        setModalMessage('')
        setDeleteModal(false)
        navigate('/mypostedjobs')
    }

    const closeModal = () => {
        setShowModal(false)
        setModalMessage('')
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
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div
                                className="modal-header"
                                style={{
                                    backgroundColor: '#e99b9b',
                                    textAlign: 'center',
                                    position: 'relative',
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
                                        fontSize: '1.25rem',
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
                                        width="64"
                                        height="64"
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
                                style={{ padding: '10px' }}
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
                                    padding: '10px',
                                }}
                            >
                                {deleteModal && (
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
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
            <div
                className="container"
                style={{
                    minHeight: '80vh',
                    paddingLeft: '0px',
                    marginLeft: '0px',
                }}
            >
                <div className="row justify-content-center">
                    <div className="col-md-11">
                        <div className="container-body">
                            <div className="card-body">
                                <div className="row">
                                    <div
                                        className="col-md-4"
                                        style={{
                                            paddingLeft: '1px',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        <div
                                            className="jumbotron jumbotron-fluid text-center"
                                            style={{
                                                marginTop: '50px',
                                                width: '80%',
                                                height: '95%',
                                                float: 'left',
                                                backgroundColor: '#F5F5F5',
                                            }}
                                        >
                                            <div className="container">
                                                <img
                                                    className="company_url"
                                                    src={job.image_url}
                                                    style={{
                                                        maxWidth: '250px',
                                                        maxHeight: '100px',
                                                        marginBottom: '40px',
                                                        marginTop: '40px',
                                                    }}
                                                />
                                                <div className="text-left">
                                                    <div className="list-group-item">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            className="bi bi-geo-alt-fill"
                                                            viewBox="0 0.2 16 16"
                                                            style={{
                                                                marginRight:
                                                                    '5px',
                                                            }}
                                                        >
                                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                        </svg>
                                                        {job.location}
                                                        <hr
                                                            style={{
                                                                margin: '20px 0',
                                                                borderColor:
                                                                    'black',
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="list-group-item">
                                                        Posted:{' '}
                                                        {formatDate(
                                                            job.posted_date
                                                        )}
                                                        <hr
                                                            style={{
                                                                margin: '20px 0',
                                                                borderColor:
                                                                    'black',
                                                            }}
                                                        />
                                                    </div>
                                                    {jobIDs.includes(job.id) ? (
                                                        <button
                                                            type="button"
                                                            className={
                                                                user &&
                                                                user.id ===
                                                                    job.creator_id
                                                                    ? 'btn btn-secondary mr-3 d-none'
                                                                    : 'btn btn-secondary mr-3'
                                                            }
                                                            style={{
                                                                backgroundColor:
                                                                    '#493e57',
                                                            }}
                                                            disabled
                                                        >
                                                            Applied
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            className={
                                                                user &&
                                                                user.id ===
                                                                    job.creator_id
                                                                    ? 'btn btn-secondary mr-3 d-none'
                                                                    : 'btn btn-secondary mr-3'
                                                            }
                                                            style={{
                                                                backgroundColor:
                                                                    '#493e57',
                                                            }}
                                                            onClick={() =>
                                                                handleApply(
                                                                    job.creator_id,
                                                                    job.id
                                                                )
                                                            }
                                                        >
                                                            Apply
                                                        </button>
                                                    )}
                                                    {user &&
                                                        user.id ===
                                                            job.creator_id && (
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-primary"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        job.id
                                                                    )
                                                                }
                                                            >
                                                                Delete Job
                                                            </button>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-8"
                                        style={{
                                            paddingLeft: '0px',
                                            marginTop: '80px',
                                        }}
                                    >
                                        <div className="container">
                                            <h1
                                                className="display-4"
                                                style={{
                                                    display: 'inline-block',
                                                }}
                                            >
                                                {job.position_title}
                                            </h1>
                                            <p
                                                className="lead"
                                                style={{
                                                    display: 'inline-block',
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                {job.company_name}
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                width: '100%',
                                                float: 'left',
                                            }}
                                        >
                                            <div className="card-body">
                                                <p
                                                    className="card-text job-description"
                                                    style={{
                                                        paddingLeft: '16px',
                                                        marginTop: '10px',
                                                        marginBottom: '80px',
                                                    }}
                                                >
                                                    {job.job_description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobDetail
