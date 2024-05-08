import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSigninMutation } from '../app/apiSlice';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';


const BounceAnimation = keyframes`${bounce}`;

const BouncingText = styled.h1`
  animation: 3s ${BounceAnimation} infinite;
  color: #e99b9b;
  font-size: 70px;
  font-weight: bold;
  text-align: center;
  margin-top: -50px
`;

export default function SignInForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [signin, signinStatus] = useSigninMutation();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (signinStatus.isSuccess) {
            navigate('/');
        }
        if (signinStatus.isError) {
            setErrorMessage(signinStatus.error.data.detail);
            setShowModal(true);
        }
    }, [signinStatus, navigate]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        signin({ username, password });
    };

    const closeModal = () => {
        setShowModal(false);
        setErrorMessage('');
    };

    return (
        <>
            {showModal && (
                <div className="modal" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}>
                    <div className="modal-dialog" role="document" style={{ width: '30%', textAlign: 'center' }}>
                        <div className="modal-content">
                            <div className="modal-header" style={{
                                backgroundColor: '#dda3a6',
                                textAlign: 'center',
                                position: 'relative',
                                height: '60px',
                            }}>
                                <button type="button" className="btn-close" onClick={closeModal} style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    color: '#fff',
                                    fontSize: '0.8rem',
                                }} aria-label="Close"></button>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16" style={{ marginRight: '5px' }}>
                                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                                    </svg>
                                    <h3 style={{ margin: '0', color: 'black' }}>Uh-oh!</h3>
                                </div>
                            </div>
                            <div className="modal-body" style={{
                                paddingTop: '12px',
                                paddingBottom: '0px',
                            }}>
                                <p>{errorMessage}</p>
                            </div>
                            <div className="modal-footer" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white',
                                borderTop: 'none',
                                paddingBottom: '10px',
                                paddingTop: '0px',
                            }}>
                                <button type="button" className="btn btn-secondary" onClick={closeModal} style={{ borderRadius: '0' }}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="d-flex justify-content-center align-items-center" style={{
                minHeight: '80vh',
                backgroundColor: 'white',
                position: 'relative',
            }}>
                <div className="container d-flex justify-content-center align-items-center" style={{ height: '100%', position: 'relative' }}>
                    <BouncingText style={{ position: 'absolute', top: '-50px', left: 0, right: 0 }}>
                        Welcome back GitGirl !
                    </BouncingText>
                    <form onSubmit={handleFormSubmit} style={{ maxWidth: '20rem', width: '100%' }}>
                        <div className="card text-white mb-3" style={{ backgroundColor: '#332b3b' }}>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputUsername" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="exampleInputUsername" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn" style={{
                                    backgroundColor: '#e99b9b',
                                    color: 'white',
                                }}>Sign In</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
