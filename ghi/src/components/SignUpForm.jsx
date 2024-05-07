import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../app/apiSlice';
import workingwoman from '/src/workingwoman.mp4';

export default function SignUpForm() {
    const navigate = useNavigate()

    const [ formData, setFormData ] = useState({
        username: '',
        password: '',
        full_name: '',
        email: '',
        linkedin_url: ''
    });
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ showModal, setShowModal ] = useState(false);
    // redux hook
    const [ signup, signupStatus ] = useSignupMutation()

    useEffect(() => {
        if (signupStatus.isSuccess) {
            navigate('/')
        } else if (signupStatus.isError) {
            setErrorMessage(signupStatus.error.data.detail)
            setShowModal(true)
        }
    }, [signupStatus, navigate, setErrorMessage, setShowModal]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        signup(formData);
    };

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
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', backgroundColor: 'white' }}>
                <div className="container d-flex justify-content-between align-items-center" style={{ height: '100%' }}>
                    <form onSubmit={handleFormSubmit} style={{ maxWidth: '30rem', width: '100%' }}>
                        <div className="card text-white mb-3" style={{ backgroundColor: '#332b3b' }}>
                            <h3 className="card-header text-center" style={{color:'#e99b9b'}}>Join the GitGirl Network</h3>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        placeholder="Create a GitGirl Username"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Enter Password"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="full_name" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        id="full_name"
                                        className="form-control"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        placeholder="Enter Full Name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Enter Email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="linkedin_url" className="form-label">LinkedIn URL</label>
                                    <input
                                        type="text"
                                        id="linkedin_url"
                                        className="form-control"
                                        value={formData.linkedin_url}
                                        onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                        placeholder="Enter LinkedIn URL"
                                    />
                                </div>
                                <button type="submit" className="btn" style={{ backgroundColor: '#e99b9b', color: 'white' }} onClick={handleFormSubmit}>Sign Up</button>
                            </div>
                        </div>
                    </form>
                    <div className="card text-white mb-3" style={{ backgroundColor: '#332b3b', width: '100%', flexBasis: '50%', marginLeft: '20px' }}>
                        <video className="card-img-top" controls autoPlay muted loop style={{ width: '100%' }}>
                            <source src={workingwoman} type="video/mp4" />
                            Whoops! Looks like our video is not working.
                        </video>
                        <div className="card-body">
                            <h5 className="card-title text-center" style={{ color: '#e99b9b' }}>Branch Out. Commit. Push Forward.</h5>
                            <p className="card-text"></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
