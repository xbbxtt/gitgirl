// @ts-check
import { Link } from 'react-router-dom'
import banner_3 from '/src/banner_3.jpg'

function Home() {
    return (
        <div>
            <div
                className="card mb-3 d-flex justify-content-around"
                style={{
                    border: 'none',
                }}
            >
                <h1 className="card-title text-center">
                    <img
                        className="d-block user-select-none "
                        src={banner_3}
                        width="100%"
                        height="50%"
                    />
                </h1>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1
                                className="card-title"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#302939',
                                    border: 'none',
                                    marginBottom: '30px',
                                }}
                            >
                                Mission Statement
                            </h1>
                            <p className="card-text " style={{ width: '75%' }}>
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
                            <p
                                className="card-text"
                                style={{
                                    width: '75%',
                                    marginBottom: '30px',
                                }}
                            >
                                We commit to creating an inclusive environment
                                by connecting talents with opportunities. We aim
                                to push the boundaries of what is possible,
                                encouraging our members to branch out, commit to
                                their goals, and advance in their careers and
                                aspirations.
                            </p>
                            <h4
                                className="card-subtitle text-muted"
                                style={{ marginBottom: '20px' }}
                            >
                                Branch Out. Commit. Push Forward.
                            </h4>
                            <div className="d-flex m-4">
                                <Link
                                    to="/signin"
                                    type="button"
                                    className="btn me-4"
                                    style={{
                                        backgroundColor: '#302939',
                                        color: 'white',
                                        border: 'none',
                                    }}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    type="button"
                                    className="btn"
                                    style={{
                                        backgroundColor: '#302939',
                                        color: 'white',
                                        border: 'none',
                                    }}
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <img
                            className="d-block shadow-sm user-select-none"
                            src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            width="100%"
                            height="auto"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4" style={{ paddingRight: '0' }}>
                    <div
                        className="card mb-3 d-flex justify-content-around"
                        style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                        }}
                    >
                        <div
                            className="card-body"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0',
                            }}
                        >
                            <img
                                className="d-block user-select-none img-fluid"
                                src="https://images.unsplash.com/photo-1573165067541-4cd6d9837902?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Sample"
                                style={{ borderRadius: '8px' }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div
                        className="card mb-0"
                        style={{
                            padding: '25px',
                            color: '#302939',
                            backgroundColor: '#F2C5C5',
                        }}
                    >
                        <div className="card-body">
                            <h1
                                className="card-title"
                                style={{ marginBottom: '35px' }}
                            >
                                GitGirls
                            </h1>
                            <p
                                className="card-text"
                                style={{ marginBottom: '25px' }}
                            >
                                <strong>Targeted Opportunities:</strong> GitGirl
                                curates jobs, internships, and apprenticeships
                                with employers who are committed to diversity
                                and inclusion. This eliminates the need to sift
                                through job listings that might not be as
                                welcoming or supportive.
                            </p>
                            <p style={{ marginBottom: '25px' }}>
                                <strong>Increased Visibility:</strong> By
                                creating a profile on GitGirl, you enhance your
                                visibility to inclusive employers actively
                                looking to diversify their tech teams.
                            </p>
                            <p style={{ marginBottom: '50px' }}>
                                <strong>Addressing the Gender Gap: </strong>
                                GitGirl works towards bridging the gender gap in
                                tech by creating a space where women and
                                femme-presenting individuals are at the
                                forefront and providing a more equitable access
                                to opportunities.
                            </p>
                            <div className="d-flex justify-content-end">
                                <Link
                                    to="/signin"
                                    type="button"
                                    className="btn me-4"
                                    style={{
                                        backgroundColor: '#302939',
                                        color: 'white',
                                        border: 'none',
                                    }}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    type="button"
                                    className="btn"
                                    style={{
                                        backgroundColor: '#302939',
                                        color: 'white',
                                        border: 'none',
                                    }}
                                >
                                    Join Network
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8" style={{ paddingRight: '0' }}>
                    <div
                        className="card mb-0"
                        style={{
                            padding: '25px',
                            color: '#302939',
                            backgroundColor: '#ffffff',
                            border: 'none',
                        }}
                    >
                        <div className="card-body">
                            <h1
                                className="card-title"
                                style={{ marginBottom: '35px' }}
                            >
                                Employers
                            </h1>
                            <p
                                className="card-text"
                                style={{ marginBottom: '25px' }}
                            >
                                <strong>Untapped Potential:</strong> GitGirl
                                gives employers access to a pool of highly
                                qualified women and femme-presenting individuals
                                in tech who might be overlooked on traditional
                                job boards.
                            </p>
                            <p style={{ marginBottom: '25px' }}>
                                <strong>Diverse Talent:</strong> Employers can
                                diversify their tech teams by connecting with
                                candidates from underrepresented groups in tech.
                            </p>
                            <p style={{ marginBottom: '50px' }}>
                                <strong>Positive Brand Image:</strong> Using
                                GitGirl signals to potential candidates and the
                                broader tech community that your company is
                                actively committed to creating a diverse and
                                inclusive workplace. This can boost employer
                                branding and attract top talent who value
                                inclusiveness.
                            </p>
                            <div className="d-flex">
                                <Link
                                    to="/signin"
                                    type="button"
                                    className="btn me-4"
                                    style={{
                                        backgroundColor: '#302939',
                                        color: 'white',
                                        border: 'none',
                                    }}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    type="button"
                                    className="btn"
                                    style={{
                                        backgroundColor: '#302939',
                                        color: 'white',
                                        border: 'none',
                                    }}
                                >
                                    Join Network
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4" style={{ paddingRight: '0' }}>
                    <div
                        className="card mb-3 d-flex justify-content-around"
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                    >
                        <div
                            className="card-body"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0',
                                margin: '0',
                            }}
                        >
                            <img
                                className="d-block user-select-none img-fluid"
                                src="https://images.unsplash.com/photo-1573165265437-f5e267bb3db6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Sample"
                                style={{
                                    borderRadius: '8px',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home
