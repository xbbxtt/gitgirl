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
        linkedin_url: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [signup, signupStatus] = useSignupMutation();
    const [touchedFields, setTouchedFields] = useState({});

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
        if (!isValidForm()) {
            setErrorMessage('Please fill out all required fields correctly.');
            setShowModal(true);
            return;
        }
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
            body: 'A job board serving women and femme presenting individuals to get jobs in Tech.',
        },
        {
            title: 'Who does GitGit Serve?',
            body: 'Women and Femme presenting individuals.',
        },
        {
            title: 'Can I post Jobs?',
            body: 'Yes, once logged in you can post jobs you want to share with the community.',
        },
    ];

    const isValid = (fieldName, value, touched) => {
        switch (fieldName) {
            case 'username':
                return touched.username && value.trim() !== '';
            case 'password':
            case 'full_name':
                return touched[fieldName] && !/\d/.test(value); // Check if the value contains numbers
            case 'email':
                return touched.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Email format validation
            case 'linkedin_url':
                return touched.linkedin_url && /^www\.linkedin\.com/.test(value); // Check if the value starts with "www.linkedin.com"
            default:
                return true;
        }
    };

    const isValidForm = () => {
        return (
            isValid('username', formData.username, touchedFields) &&
            isValid('password', formData.password, touchedFields) &&
            isValid('full_name', formData.full_name, touchedFields) &&
            isValid('email', formData.email, touchedFields) &&
            isValid('linkedin_url', formData.linkedin_url, touchedFields)
        );
    };

    const handleInputChange = (fieldName, value) => {
        setFormData({ ...formData, [fieldName]: value });
        setTouchedFields({ ...touchedFields, [fieldName]: true });
    };

    return (
        <>
            <HeroImage />

            {showModal && (
                <div
                    className="modal"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9999,
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
                                <p>{errorMessage}</p>
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
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                    style={{ borderRadius: '0' }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '80vh', backgroundColor: 'white' }}
            >
                <div
                    className="container d-flex justify-content-between align-items-start"
                    style={{ height: '100%' }}
                >
                    <div style={{ width: '30rem' }}>
                        <h3 className="text-center">FAQ</h3>
                        <div
                            className="accordion"
                            id="accordionExample"
                            style={{ width: '100%' }}
                        >
                            {accordionItems.map((item, index) => (
                                <div className="accordion-item" key={index}>
                                    <h2
                                        className="accordion-header"
                                        id={`heading${index}`}
                                    >
                                        <button
                                            className={`accordion-button ${
                                                openAccordionItem === index
                                                    ? ''
                                                    : 'collapsed'
                                            }`}
                                            type="button"
                                            onClick={() =>
                                                toggleAccordionItem(index)
                                            }
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {item.title}
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse${index}`}
                                        className={`accordion-collapse collapse ${
                                            openAccordionItem === index
                                                ? 'show'
                                                : ''
                                        }`}
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
                        <div
                            className="card text-white mb-3"
                            style={{
                                backgroundColor: '#332b3b',
                                width: '100%',
                            }}
                        >
                            <video
                                className="card-img-top"
                                controls
                                autoPlay
                                muted
                                loop
                                style={{ width: '100%' }}
                            >
                                <source src={workingwoman} type="video/mp4" />
                                Whoops! Looks like our video is not working.
                            </video>
                            <div className="card-body">
                                <h5
                                    className="card-title text-center"
                                    style={{ color: '#e99b9b' }}
                                >
                                    Branch Out. Commit. Push Forward.
                                </h5>
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                    <form
                        onSubmit={handleFormSubmit}
                        style={{
                            maxWidth: '30rem',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div
                            className="card text-white mb-3"
                            style={{
                                backgroundColor: '#332b3b',
                                flex: '1 1 auto',
                            }}
                        >
                            <h3
                                className="card-header text-center"
                                style={{ color: '#e99b9b' }}
                            >
                                Become a GitGirl
                            </h3>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label
                                        htmlFor="username"
                                        className="form-label"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        className={`form-control ${
                                            !isValid('username', formData.username, touchedFields)
                                                ? 'is-invalid'
                                                : ''
                                        }`}
                                        value={formData.username}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'username',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Create a GitGirl Username"
                                        required
                                    />
                                    {touchedFields.username && !isValid('username', formData.username, touchedFields) && (
                                        <div className="invalid-feedback">
                                            Please enter a valid username.
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className={`form-control ${
                                            !isValid('password', formData.password, touchedFields)
                                                ? 'is-invalid'
                                                : ''
                                        }`}
                                        value={formData.password}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'password',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter Password"
                                        required
                                    />
                                    {touchedFields.password && !isValid('password', formData.password, touchedFields) && (
                                        <div className="invalid-feedback">
                                            Password should not contain numbers.
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="full_name"
                                        className="form-label"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="full_name"
                                        className={`form-control ${
                                            !isValid('full_name', formData.full_name, touchedFields)
                                                ? 'is-invalid'
                                                : ''
                                        }`}
                                        value={formData.full_name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'full_name',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter Full Name"
                                    />
                                    {touchedFields.full_name && !isValid('full_name', formData.full_name, touchedFields) && (
                                        <div className="invalid-feedback">
                                            Full name should not contain numbers.
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`form-control ${
                                            touchedFields.email && !isValid('email', formData.email, touchedFields)
                                                ? 'is-invalid'
                                                : ''
                                        }`}
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter Email"
                                    />
                                    {touchedFields.email && !isValid('email', formData.email, touchedFields) && (
                                        <div className="invalid-feedback">
                                            Please enter a valid email.
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="linkedin_url"
                                        className="form-label"
                                    >
                                        LinkedIn URL
                                    </label>
                                    <input
                                        type="text"
                                        id="linkedin_url"
                                        className={`form-control ${
                                            !isValid('linkedin_url', formData.linkedin_url, touchedFields)
                                                ? 'is-invalid'
                                                : ''
                                        }`}
                                        value={formData.linkedin_url}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'linkedin_url',
                                                e.target.value
                                            )
                                        }
                                        placeholder="www.linkedin.com/username"
                                        required
                                    />
                                    {touchedFields.linkedin_url && !isValid('linkedin_url', formData.linkedin_url, touchedFields) && (
                                        <div className="invalid-feedback">
                                            Please enter a valid LinkedIn URL.
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                className="card-footer"
                                style={{ backgroundColor: '#332b3b' }}
                            >
                                <button
                                    type="submit"
                                    className="btn"
                                    style={{
                                        backgroundColor: '#e99b9b',
                                        color: 'white',
                                        width: '100%',
                                    }}
                                    onClick={handleFormSubmit}
                                    required
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
