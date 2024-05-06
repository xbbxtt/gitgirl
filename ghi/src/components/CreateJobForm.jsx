import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import UserNavigation from './UserNavigation'
import {
    useAuthenticateQuery,
    useCreateJobMutation
} from '../app/apiSlice';


const CreateJobForm = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        image_url: '',
        position_title: '',
        location: '',
        company_name: '',
        job_description: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { data: user, isLoading: isLoadingUser } = useAuthenticateQuery();
    const [createJob, createJobStatus] = useCreateJobMutation();

    useEffect(() => {
        if (!user && !isLoadingUser) {
            navigate('/signin')
        }
    }, [user, isLoadingUser, navigate]);

    useEffect(() => {
        if (createJobStatus.isSuccess) {
            setErrorMessage('Job successfully posted!');
            setShowModal(true);
        }
        if (createJobStatus.isError) {
            setErrorMessage(signupStatus.error.data.detail);
            setShowModal(true);
        };
    }, [createJobStatus, navigate]);

    const handleChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value,
        })
    };

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
    };

    const closeModal = () => {
        setShowModal(false);
        setErrorMessage('');
    };

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
                                        <h3 style={{ margin: '0', color: 'black' }}></h3>
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
                                        // style={{
                                        //     backgroundColor: '#e99b9b',
                                        //     color: 'white',
                                        // }}
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

export default CreateJobForm;
