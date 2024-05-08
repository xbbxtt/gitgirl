import React from 'react'
import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import UserNavigation from './UserNavigation'
import { useAuthenticateQuery, useCreateJobMutation } from '../app/apiSlice'

const CreateJobForm = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        image_url: '',
        position_title: '',
        location: '',
        company_name: '',
        job_description: '',
    })
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { data: user, isLoading: isLoadingUser } = useAuthenticateQuery()
    const [createJob, createJobStatus] = useCreateJobMutation()

    useEffect(() => {
        if (!user && !isLoadingUser) {
            navigate('/signin')
        }
    }, [user, isLoadingUser, navigate])

    useEffect(() => {
        if (createJobStatus.isSuccess) {
            setErrorMessage('Job posted successfully!')
            setShowModal(true)
        }
        if (createJobStatus.isError) {
            setErrorMessage(createJobStatus.error.data.detail)
            setShowModal(true)
        }
    }, [createJobStatus, navigate])

    const handleChange = (e) => {
        const value = e.target.value
        const inputName = e.target.name
        setFormData({
            ...formData,
            [inputName]: value,
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        createJob(formData)
        setFormData({
            image_url: '',
            position_title: '',
            location: '',
            company_name: '',
            job_description: '',
        })
    }

    const closeModal = () => {
        setShowModal(false)
        setErrorMessage('')
    }

    const addMoreJobs = () => {
        closeModal()
        setFormData({
            image_url: '',
            position_title: '',
            location: '',
            company_name: '',
            job_description: '',
        })
    }

    const viewMyPostedJobs = () => {
        navigate('/mypostedjobs')
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
                                        width="25"
                                        height="25"
                                        fill="currentColor"
                                        class="bi bi-check-circle"
                                        viewBox="0 0 16 16"
                                        style={{ marginRight: '5px' }}
                                    >
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                    </svg>
                                    <h3
                                        style={{
                                            margin: '0',
                                            color: 'black',
                                            fontSize: '1.3rem',
                                        }}
                                    >
                                        {errorMessage}
                                    </h3>
                                </div>
                            </div>
                            <div
                                className="modal-body"
                                style={{ padding: '25px' }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={addMoreJobs}
                                        style={{
                                            borderRadius: '0',
                                            marginRight: '5px',
                                        }}
                                    >
                                        Add More Jobs
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={viewMyPostedJobs}
                                        style={{
                                            borderRadius: '0',
                                            marginLeft: '5px',
                                        }}
                                    >
                                        View Posted Jobs
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div
                className="container-fluid"
                style={{ minHeight: '80vh', backgroundColor: 'white' }}
            >
                <div className="row">
                    <UserNavigation />
                    <main
                        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
                        style={{ marginTop: '20px' }}
                    >
                        <div className="card mb-3">
                            <h3 className="card-header">Post a Job</h3>
                            <div className="card-body">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-group row mb-3">
                                        <div className="col">
                                            <label
                                                htmlFor="position_title"
                                                className="form-label"
                                            >
                                                Position Title
                                            </label>
                                            <input
                                                type="text"
                                                name="position_title"
                                                value={formData.position_title}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Position Title"
                                                required
                                            />
                                        </div>
                                        <div className="col">
                                            <label
                                                htmlFor="company_name"
                                                className="form-label"
                                            >
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                name="company_name"
                                                value={formData.company_name}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Company Name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="location"
                                            className="form-label"
                                        >
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Location"
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="image_url"
                                            className="form-label"
                                        >
                                            Company Image URL
                                        </label>
                                        <input
                                            type="text"
                                            name="image_url"
                                            value={formData.image_url}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Company Image URL"
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="job_description"
                                            className="form-label"
                                        >
                                            Job Description
                                        </label>
                                        <textarea
                                            name="job_description"
                                            value={formData.job_description}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Job Description"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary me-2"
                                    >
                                        Create
                                    </button>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default CreateJobForm
