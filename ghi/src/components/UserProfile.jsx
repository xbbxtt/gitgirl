import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserNavigation from './UserNavigation';
import { useAuthenticateQuery, useUpdateUserMutation } from '../app/apiSlice';

const UserProfile = () => {
    const navigate = useNavigate()

    const [ update, setUpdate ] = useState(false)
    const [ error, setError ] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        email: '',
        linkedin_url: '',
    });
    const [ showModal, setShowModal ] = useState(false);
    const [ modalMessage, setModalMessage ] = useState('');

    const { data: user, isLoading: isLoadingUser } = useAuthenticateQuery()
    const [ updateUser, updateUserStatus ] = useUpdateUserMutation()

    useEffect(() => {
        if (!user && !isLoadingUser) {
            navigate('/signin')
        }
    }, [user, isLoadingUser, navigate])

    useEffect(() => {
        if (updateUserStatus.isSuccess) {
            setModalMessage('Profile updated successfully!')
            setShowModal(true)
            setUpdate(false)
        } else if (updateUserStatus.isError) {
            setModalMessage(updateUserStatus.error.data.detail)
            setShowModal(true)
            setError(true)
        }
    }, [updateUserStatus, setModalMessage, setShowModal]);

    if (isLoadingUser || updateUserStatus.isLoading) {
        return (
        <div>Loading...</div>
        )
    };

    const handleChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value,
        })};

    const handleFormSubmit = (e) => {
        if (formData.username === '') {
            formData.username = `${user.username}`
        }
        if (formData.full_name === '') {
            formData.full_name = `${user.full_name}`
        }
        if (formData.email === '') {
            formData.email = `${user.email}`
        }
        if (formData.linkedin_url === '') {
            formData.linkedin_url = `${user.linkedin_url}`
        }
        setShowModal(true)
        setModalMessage('Are you sure you want to make these changes to your profile?')
    };

    const handleConfirm = (e) => {
        e.preventDefault()
        updateUser(formData)
        setFormData({
        username: '',
        full_name: '',
        email: '',
        linkedin_url: '',
        })
        setUpdate(false)
        setShowModal(false)
        setModalMessage('')
    };

    const handleCancel = (e) => {
        setUpdate(false)
        setFormData({
            username: '',
            full_name: '',
            email: '',
            linkedin_url: '',
        })
    };

    const closeModal = () => {
        setShowModal(false);
        setError(false)
        setModalMessage('');
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
                                    {!error && <svg xmlns="http://www.w3.org/2000/svg" width="50" height="70" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16" style={{ marginRight: '5px' }}>
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                                    </svg>}
                                    {error && <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16" style={{ marginRight: '5px' }}>
                                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                    </svg>}
                                    <h4 style={{ margin: '0', color: 'black' }}>{modalMessage}</h4>
                                </div>
                            </div>
                            <div className="modal-body" style={{ padding: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {update && <button type="button" className="btn btn-secondary me-2" onClick={handleConfirm}>Yes</button>}
                                    {update && <button type="button" className="btn btn-primary" onClick={closeModal}>No</button>}
                                    {!update && <button type="button" className="btn btn-primary" onClick={closeModal}>Close</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="container-fluid" style={{ minHeight: '80vh' }}>
                <div className="row">
                    <UserNavigation />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ marginTop: '20px' }}>
                        <div className="card mb-3">
                            <h3 className="card-header">Profile</h3>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Full Name:</label>
                                            <div>
                                                {user && <input
                                                type="text"
                                                name="full_name"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={formData.full_name}
                                                placeholder={user.full_name}
                                                disabled={update ? "" : "disabled"} />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Email:</label>
                                            <div>
                                                {user && <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={formData.email}
                                                placeholder={user.email}
                                                disabled={update ? "" : "disabled"}/>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Username:</label>
                                            <div>
                                                {user && <input
                                                type="text"
                                                name="username"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={formData.username}
                                                placeholder={user.username}
                                                disabled={update ? "" : "disabled"} />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>LinkedIn:</label>
                                            <div>
                                                {user && <input
                                                type="text"
                                                name="linkedin_url"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={formData.linkedin_url}
                                                placeholder={user.linkedin_url}
                                                disabled={update ? "" : "disabled"} />}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                        {!update && <button
                                            type="button"
                                            className="btn btn-outline-primary d-flex align-items-center justify-content-end"
                                            style={{ color: 'bg-light', borderColor: 'bg-light', marginTop: '15px' }}
                                            onClick={() => setUpdate(true)}
                                        >
                                            Update Profile
                                        </button>}
                                        {update && <button
                                            type="button"
                                            className="btn btn-outline-primary d-flex align-items-center justify-content-end"
                                            style={{ color: 'bg-light', borderColor: 'bg-light', marginTop: '15px', marginRight:'15px' }}
                                            onClick={handleFormSubmit}
                                        >
                                            Submit Update
                                        </button>}
                                        {update && <button
                                            type="button"
                                            className="btn btn-outline-primary d-flex align-items-center justify-content-end"
                                            style={{ color: 'black', borderColor: 'black', marginTop: '15px' }}
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default UserProfile;
