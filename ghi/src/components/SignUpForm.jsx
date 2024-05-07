import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../app/apiSlice';
import workingwoman from '/src/workingwoman.mp4';
import HeroImage from './HeroImage';

export default function SignUpForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        full_name: '',
        email: '',
        linkedin_url: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [signup, signupStatus] = useSignupMutation();

    useEffect(() => {
        if (signupStatus.isSuccess) {
            navigate('/');
        } else if (signupStatus.isError) {
            setErrorMessage(signupStatus.error.data.detail);
            setShowModal(true);
        }
    }, [signupStatus, navigate, setErrorMessage, setShowModal]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        signup(formData);
    };

    const closeModal = () => {
        setShowModal(false);
        setErrorMessage('');
    };

    const [openAccordionItem, setOpenAccordionItem] = useState(null);

    const toggleAccordionItem = (index) => {
        setOpenAccordionItem(openAccordionItem === index ? null : index);
    };

    const accordionItems = [
        {
            title: 'What is GitGirl?',
            body: 'A job board serving women and femme presenting individuals to get jobs in Tech'
        },
        {
            title: 'Who does GitGit Serve?',
            body: 'Women and Femme presenting individuals'
        },
        {
            title: 'Can I post Jobs?',
            body: 'Yes, once logged in you can post jobs you want ot share with the community.'
        }
    ];

    return (
        <>
            <HeroImage />

            {showModal && (
                <div className="modal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header" style={{ backgroundColor: '#e99b9b', textAlign: 'center', position: 'relative' }}>
                                <button type="button" className="btn-close" onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px', color: '#fff', fontSize: '1.25rem' }} aria-label="Close"></button>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src="/src/workingwomen.jpg" alt="Exclamation" style={{ width: '40px', marginRight: '5px' }} />
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
                <div className="container d-flex justify-content-between align-items-start" style={{ height: '100%' }}>
                    <div style={{ width: '30rem' }}>
                        <h3 className="text-center">FAQ</h3>
                        <div className="accordion" id="accordionExample" style={{ width: '100%' }}>
                            {accordionItems.map((item, index) => (
                                <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header" id={`heading${index}`}>
                                        <button
                                            className={`accordion-button ${openAccordionItem === index ? '' : 'collapsed'}`}
                                            type="button"
                                            onClick={() => toggleAccordionItem(index)}
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {item.title}
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse${index}`}
                                        className={`accordion-collapse collapse ${openAccordionItem === index ? 'show' : ''}`}
                                        aria-labelledby={`heading${index}`}
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            {item.body}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="card text-white mb-3" style={{ backgroundColor: '#332b3b', width: '100%' }}>
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
                    <form onSubmit={handleFormSubmit} style={{ maxWidth: '30rem', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div className="card text-white mb-3" style={{ backgroundColor: '#332b3b', flex: '1 1 auto' }}>
                            <h3 className="card-header text-center" style={{ color: '#e99b9b' }}>Become a GitGirl</h3>
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
                            </div>
                            <div className="card-footer" style={{ backgroundColor: '#332b3b' }}>
                                <button type="submit" className="btn" style={{ backgroundColor: '#e99b9b', color: 'white', width: '100%' }} onClick={handleFormSubmit}>Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
