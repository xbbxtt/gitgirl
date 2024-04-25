// @ts-check
import React from 'react';
import logo from '/src/logo.jpg';

function Home(props) {
    return (
        <>
            <div className="card mb-3">
                <h1 className="card-title text-center">Welcome to GitGirl</h1>
                <div className="card-body">
                    {/* <h5 className="card-title">Special title treatment</h5>
                    <h6 className="card-subtitle text-muted">
                        Support card subtitle
                    </h6> */}
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title">GitGirl</h3>
                            <h6 className="card-subtitle text-muted">
                                Branch Out. Commit. Push Forward.
                            </h6>
                            <p className="card-text">
                                GitGirl exists to redefine the tech landscape
                                into a realm where women and femme-presenting
                                individuals not only belong but flourish and
                                lead. Our mission is to secure a place for our
                                members in the forefront of technology by
                                empowering them with opening positions within
                                the tech sector and a community needed to
                                navigate and excel in the tech world. Through
                                GitGirl, we offer a platform where dreams are
                                merged with reality; futures are committed to
                                innovation, and career paths are coded with
                                success.
                            </p>
                            <p className="card-text">
                                We commit to creating an inclusive environment
                                by connecting talents with opportunities. We aim
                                to push the boundaries of what is possible,
                                encouraging our members to branch out, commit to
                                their goals, and advance in their careers and
                                aspirations.
                            </p>
                            <p className="card-text">
                                GitGirl is more than just a job platform; it's a
                                movement towards a diverse, equitable, and
                                innovative tech industry where every girl has
                                the power to innovate, elevate, and execute her
                                vision. Together, we are not just coding; we are
                                transforming the tech industry one GitGirl at a
                                time.
                            </p>
                        </div>
                        <div className="row">
                            <div className="col-md-15 d-flex justify-content-around">
                                <p>
                                    <button
                                        type="button"
                                        className="btn btn-secondary me-5"
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                    >
                                        Sign up
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <img
                            className="d-block user-select-none"
                            src={logo}
                            width="100%"
                            height="auto"
                        ></img>
                    </div>
                </div>
            </div>
            <div className="card text-white bg-primary mb-0">
                <div className="card-body">
                    <div>
                        <h4 className="card-title">GitGirls</h4>
                        <img
                            className="d-block user-select-none col-md-4"
                            src={logo}
                            width="50%"
                            height="auto"
                        ></img>
                        <h6 className="card-subtitle mb-2 text-muted">

                        </h6>
                        <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card content.
                        </p>
                        <p>
                            <button
                                type="button"
                                className="btn btn-secondary me-5"
                            >
                                Sign In
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary me-5"
                            >
                                Join Network
                            </button>
                        </p>
                    </div>
                    <div>
                        <h4 className="card-text justify-content-end">
                            Employers
                        </h4>
                        <img
                            className="d-block user-select-none col-md-4"
                            src={logo}
                            width="50%"
                            height="auto"
                        ></img>
                        <h6 className="card-subtitle mb-2 text-muted">

                        </h6>
                        <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card content.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home
