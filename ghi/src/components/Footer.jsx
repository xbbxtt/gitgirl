import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <footer
            className="navbar navbar-expand-lg bg-primary footer"
            data-bs-theme="dark"
        >
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div>
                    <NavLink className="navbar-brand" to="/">
                        <img src="/src/logo.jpg" alt="Logo" height="70" />
                    </NavLink>
                    <br />
                    <span className="text-light small-text">
                        Copyright &copy; 2024 GitGirl, LLC. All rights reserved.
                    </span>
                </div>
                <div className="connect-section">
                    <h5 className="text-light">Connect with us!</h5>
                    <ul
                        className="navbar-nav"
                        style={{ listStyle: 'none', padding: '0' }}
                    >
                        <li className="nav-item small">
                            <NavLink className="nav-link small" to="/instagram">
                                Instagram
                            </NavLink>
                        </li>
                        <li className="nav-item small">
                            <NavLink className="nav-link small" to="/linkedin">
                                LinkedIn
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer
