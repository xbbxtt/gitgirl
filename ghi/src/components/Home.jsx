// @ts-check
import React from 'react'
import banner_3 from '/src/banner_3.jpg'

function Home() {
    return (
        <div>
            <div className="card mb-3 d-flex justify-content-around">
                <h1 className="card-title text-center">
                    <img
                        className="d-block user-select-none "
                        src={banner_3}
                        width="100%"
                        height="100%"
                    ></img>
                </h1>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title">
                                Branch Out. Commit. Push Forward.
                            </h1>
                            <h6 className="card-subtitle text-muted"></h6>
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
                                GitGirl is more than just a job platform; it is a
                                movement towards a diverse, equitable, and
                                innovative tech industry where every girl has
                                the power to innovate, elevate, and execute her
                                vision. Together, we are not just coding; we are
                                transforming the tech industry one GitGirl at a
                                time.
                            </p>
                        </div>
                        <div className="row">
                            <div className="d-flex m-3">
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
                            className="d-block shadow-sm user-select-none"
                            src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            width="100%"
                            height="auto"
                        ></img>
                    </div>
                </div>
            </div>
            <div className="card text-white bg-primary mb-0 d-flex justify-content-around">
                <div className="card-body">
                    <div className="row">
                        <img
                            className="d-block user-select-none col-md-4"
                            src="https://images.unsplash.com/photo-1573165067541-4cd6d9837902?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            width="50%"
                            height="auto"
                        ></img>
                        <div className="col-md-8 text-end">
                            <h1 className="card-title ">GitGirls</h1>
                            <h6 className="card-subtitle mb-2 text-muted"></h6>
                            <p className="card-text">
                                Targeted Opportunities: GitGirl curates jobs,
                                internships, and apprenticeships with employers
                                who are committed to diversity and inclusion.
                                This eliminates the need to sift through job
                                listings that might not be as welcoming or
                                supportive.
                            </p>
                            <p>
                                Increased Visibility: By creating a profile on
                                GitGirl, you enhance your visibility to
                                inclusive employers actively looking to
                                diversify their tech teams.
                            </p>
                            <p>
                                Addressing the Gender Gap: GitGirl works towards
                                bridging the gender gap in tech by creating a
                                space where women and femme-presenting
                                individuals are at the forefront and providing a
                                more equitable access to opportunities.
                            </p>
                            <p className="col-md-18 text-end">
                                <button
                                    type="button"
                                    className="btn btn-secondary me-5"
                                >
                                    Sign In
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                >
                                    Join Network
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card text-white bg-secondary mb-0 d-flex justify-content-around">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className="card-title">Employers</h1>
                            <h6 className="card-subtitle mb-2 text-muted"></h6>
                            <p className="card-text">
                                Untapped Potential: GitGirl gives employers
                                access to a pool of highly qualified women and
                                femme-presenting individuals in tech who might
                                be overlooked on traditional job boards.
                            </p>
                            <p>
                                Diverse Talent: Employers can diversify their
                                tech teams by connecting with candidates from
                                underrepresented groups in tech.
                            </p>
                            <p>
                                Positive Brand Image: Using GitGirl signals to
                                potential candidates and the broader tech
                                community that your company is actively
                                committed to creating a diverse and inclusive
                                workplace. This can boost employer branding and
                                attract top talent who value inclusivity.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <img
                                className="d-block shadow-sm user-select-none"
                                src="https://images.unsplash.com/photo-1573165265437-f5e267bb3db6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                width="100%"
                                height="auto"
                            ></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home
