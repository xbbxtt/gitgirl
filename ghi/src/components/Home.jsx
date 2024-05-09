// @ts-check
import { useState } from 'react'
import { Link } from 'react-router-dom'
import banner_3 from '/src/banner_3.jpg'

function Home() {
    const [activeIndex, setActiveIndex] = useState(0)

    const handlePrev = () => {
        setActiveIndex(activeIndex === 0 ? reviews.length - 1 : activeIndex - 1)
    }

    const handleNext = () => {
        setActiveIndex(activeIndex === reviews.length - 1 ? 0 : activeIndex + 1)
    }

    const reviews = [
        {
            name: 'Sierra R',
            position: 'Director of Engineering - Apple',
            image: '/src/sr.png',
            testimonial:
                "The hires I've made from GitGirl have been top notch! We will continue to hire from this platform as we stay dedicated to increasing the number of Women in Tech!",
        },
        {
            name: 'Jay W.',
            position: 'CEO & Founder - Too many companies to list',
            image: '/src/jw.png',
            testimonial: 'No one can hold a candle to the GitGirl devs!',
        },
        {
            name: 'Chris Z.',
            position: 'VP of Product - Meta',
            image: '/src/chris.png',
            testimonial:
                "Every hire we've made has exceeded expectations. Simply put, GitGirl is a game-changer in the tech hiring landscape.",
        },
        {
            name: 'Brittany R.',
            position: 'Director of Eng - Amazon',
            image: '/src/bb.png',
            testimonial:
                'GitGirl has been an incredible platform for me to find opportunities in tech. The supportive community and the focus on diversity make it stand out.',
        },
    ]

    return (
        <div>
            <div style={{ margin: '0 auto', maxWidth: '100%' }}>
                <div
                    className="card mb-3 d-flex justify-content-center"
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
                            alt="Banner"
                        />
                    </h1>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="grid-container">
                            <div
                                className="grid-box"
                                style={{
                                    marginTop: '100px',
                                    marginBottom: '40px',
                                }}
                            >
                                <img
                                    className="d-block user-select-none img-fluid"
                                    src="https://images.unsplash.com/photo-1573165265437-f5e267bb3db6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Sample"
                                    style={{
                                        borderRadius: '8px',
                                        height: '100%',
                                        width: '90%',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="grid-container">
                            <div
                                className="grid-box"
                                style={{
                                    marginTop: '100px',
                                    marginBottom: '40px',
                                }}
                            >
                                <div className="d-flex align-items-center">
                                    <div
                                        className="vr"
                                        style={{
                                            paddingLeft: '3px',
                                            height: '100px',
                                        }}
                                    >
                                        <h1
                                            className="mb-2"
                                            style={{ marginLeft: '10px' }}
                                        >
                                            For Individuals
                                        </h1>
                                    </div>
                                    <div>
                                        <p style={{ marginTop: '100px' }}>
                                            GitGirl offers employers access to a
                                            diverse pool of highly qualified
                                            women and femme-presenting
                                            individuals in tech, fostering
                                            inclusivity and enriching their
                                            talent pipelines. By leveraging
                                            GitGirl, employers can not only
                                            diversify their tech teams but also
                                            enhance their brand image by
                                            showcasing a commitment to creating
                                            an inclusive workplace, ultimately
                                            attracting top talent and fostering
                                            a positive company culture.
                                        </p>
                                        <div className="d-flex justify-content-between mt-3">
                                            <div className="col">
                                                <Link
                                                    to="/signin"
                                                    type="button"
                                                    className="btn btn-block"
                                                    style={{
                                                        backgroundColor:
                                                            '#302939',
                                                        color: 'white',
                                                        border: 'none',
                                                        textAlign: 'center',
                                                        width: '100px',
                                                        marginLeft: '80px',
                                                        marginTop: '20px',
                                                    }}
                                                >
                                                    Sign In
                                                </Link>
                                            </div>
                                            <div className="col">
                                                <Link
                                                    to="/signup"
                                                    type="button"
                                                    className="btn btn-block"
                                                    style={{
                                                        backgroundColor:
                                                            '#302939',
                                                        color: 'white',
                                                        border: 'none',
                                                        textAlign: 'center',
                                                        width: '130px',
                                                        marginRight: '30px',
                                                        marginTop: '20px',
                                                    }}
                                                >
                                                    Sign Up
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h1
                className="card-title"
                style={{
                    backgroundColor: 'transparent',
                    color: '#302939',
                    border: 'none',
                    marginBottom: '30px',
                    textAlign: 'center',
                }}
            >
                What We Offer
            </h1>
            <div className="container d-flex justify-content-center">
                <div className="row justify-content-center">
                    <div className="col-3 m-4">
                        <div className="d-flex justify-content-center">
                            <div
                                className="shadow-sm p-3 mb-5 bg-body-tertiary rounded"
                                style={{
                                    height: '350px',
                                    width: '600px',
                                    textAlign: 'center',
                                }}
                            >
                                <img
                                    src="/src/home_2.png"
                                    alt="Working Woman"
                                    style={{
                                        height: '120px',
                                        width: '120px',
                                        objectFit: 'contain',
                                        display: 'block',
                                        margin: 'auto',
                                    }}
                                />
                                <p>{''}</p>
                                <h5>Increased Visibility</h5>
                                <p>{''}</p>
                                <p>
                                    Creating a profile on GitGirl boosts your
                                    visibility to inclusive companies hiring
                                    women in tech.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 m-4">
                        <div className="d-flex justify-content-center">
                            <div
                                className="shadow-sm p-3 mb-5 bg-body-tertiary rounded"
                                style={{
                                    height: '350px',
                                    width: '600px',
                                    textAlign: 'center',
                                }}
                            >
                                <img
                                    src="/src/home_1.png"
                                    alt="Working Woman"
                                    style={{
                                        height: '120px',
                                        width: '120px',
                                        objectFit: 'contain',
                                        display: 'block',
                                        margin: 'auto',
                                    }}
                                />
                                <p>{''}</p>
                                <h5>Addressing the Gender Gap</h5>
                                <p>{''}</p>

                                <p>
                                    GitGirl is committed to bridging the gender
                                    gap in tech by prioritizing women and
                                    femme-presenting individuals..
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 m-4">
                        <div className="d-flex justify-content-center">
                            <div
                                className="shadow-sm p-3 mb-5 bg-body-tertiary rounded"
                                style={{
                                    height: '350px',
                                    width: '600px',
                                    textAlign: 'center',
                                }}
                            >
                                <img
                                    src="/src/home_3.png"
                                    alt="Working Woman"
                                    style={{
                                        height: '120px',
                                        width: '120px',
                                        objectFit: 'contain',
                                        display: 'block',
                                        margin: 'auto',
                                    }}
                                />
                                <p>{''}</p>
                                <h5>Untapped Potential</h5>
                                <p>{''}</p>
                                <p>
                                    GitGirl connects employers with qualified
                                    women and femme-presenting tech talent
                                    overlooked on traditional boards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="grid-container">
                            <div
                                className="grid-box"
                                style={{
                                    marginTop: '100px',
                                    marginBottom: '40px',
                                }}
                            >
                                <img
                                    className="d-block user-select-none img-fluid"
                                    src="https://images.unsplash.com/photo-1573165265437-f5e267bb3db6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Sample"
                                    style={{
                                        borderRadius: '8px',
                                        height: '100%',
                                        width: '90%',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="grid-container">
                            <div
                                className="grid-box"
                                style={{
                                    marginTop: '100px',
                                    marginBottom: '40px',
                                }}
                            >
                                <div className="d-flex align-items-center">
                                    <div
                                        className="vr"
                                        style={{
                                            paddingLeft: '3px',
                                            height: '100px',
                                        }}
                                    >
                                        <h1
                                            className="mb-2"
                                            style={{ marginLeft: '10px' }}
                                        >
                                            For Individuals
                                        </h1>
                                    </div>
                                    <div>
                                        <p style={{ marginTop: '100px' }}>
                                            GitGirl offers employers access to a
                                            diverse pool of highly qualified
                                            women and femme-presenting
                                            individuals in tech, fostering
                                            inclusivity and enriching their
                                            talent pipelines. By leveraging
                                            GitGirl, employers can not only
                                            diversify their tech teams but also
                                            enhance their brand image by
                                            showcasing a commitment to creating
                                            an inclusive workplace, ultimately
                                            attracting top talent and fostering
                                            a positive company culture.
                                        </p>
                                        <div className="d-flex justify-content-between mt-3">
                                            <div className="col">
                                                <Link
                                                    to="/signin"
                                                    type="button"
                                                    className="btn btn-block"
                                                    style={{
                                                        backgroundColor:
                                                            '#302939',
                                                        color: 'white',
                                                        border: 'none',
                                                        textAlign: 'center',
                                                        width: '100px',
                                                        marginLeft: '80px',
                                                        marginTop: '20px',
                                                    }}
                                                >
                                                    Sign In
                                                </Link>
                                            </div>
                                            <div className="col">
                                                <Link
                                                    to="/signup"
                                                    type="button"
                                                    className="btn btn-block"
                                                    style={{
                                                        backgroundColor:
                                                            '#302939',
                                                        color: 'white',
                                                        border: 'none',
                                                        textAlign: 'center',
                                                        width: '130px',
                                                        marginRight: '30px',
                                                        marginTop: '20px',
                                                    }}
                                                >
                                                    Join Network
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-5">
                        <div className="grid-container">
                            <div
                                className="grid-box"
                                style={{
                                    marginBottom: '150px',
                                }}
                            >
                                <div className="d-flex align-items-center">
                                    <div
                                        className="vr"
                                        style={{ paddingLeft: '3px' }}
                                    >
                                        <h1
                                            className="mb-2"
                                            style={{ marginLeft: '10px' }}
                                        >
                                            For Employers
                                        </h1>
                                    </div>
                                </div>
                                <p>
                                    GitGirl offers employers access to a diverse
                                    pool of highly qualified women and
                                    femme-presenting individuals in tech,
                                    fostering inclusivity and enriching their
                                    talent pipelines. By leveraging GitGirl,
                                    employers can not only diversify their tech
                                    teams but also enhance their brand image by
                                    showcasing a commitment to creating an
                                    inclusive workplace, ultimately attracting
                                    top talent and fostering a positive company
                                    culture.
                                </p>
                                <div className="d-flex justify-content-between mt-3">
                                    <div className="col">
                                        <Link
                                            to="/signin"
                                            type="button"
                                            className="btn btn-block"
                                            style={{
                                                backgroundColor: '#302939',
                                                color: 'white',
                                                border: 'none',
                                                textAlign: 'center',
                                                width: '100px',
                                                marginLeft: '80px',
                                                marginTop: '20px',
                                            }}
                                        >
                                            Sign In
                                        </Link>
                                    </div>
                                    <div className="col">
                                        <Link
                                            to="/signup"
                                            type="button"
                                            className="btn btn-block"
                                            style={{
                                                backgroundColor: '#302939',
                                                color: 'white',
                                                border: 'none',
                                                textAlign: 'center',
                                                width: '130px',
                                                marginRight: '60px',
                                                marginTop: '20px',
                                            }}
                                        >
                                            Join Network
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="grid-container">
                            <div
                                className="grid-box"
                                style={{
                                    marginBottom: '150px',
                                }}
                            >
                                <img
                                    className="d-block user-select-none img-fluid"
                                    src="https://images.unsplash.com/photo-1573167243872-43c6433b9d40?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Sample"
                                    style={{
                                        borderRadius: '8px',
                                        height: '100%',
                                        width: '90%',
                                        marginLeft: '50px',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                id="carouselExampleControls"
                className="carousel slide text-center carousel-dark"
                data-bs-ride="carousel"
            >
                <div className="carousel-inner">
                    {reviews.map((review, index) => (
                        <div
                            className={`carousel-item ${
                                index === activeIndex ? 'active' : ''
                            }`}
                            key={index}
                            style={{ minHeight: '400px' }}
                        >
                            <img
                                className="rounded-circle shadow-1-strong mb-4"
                                src={review.image}
                                alt={review.name}
                                style={{ width: '150px' }}
                            />
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-8">
                                    <h5 className="mb-3">{review.name}</h5>
                                    <p>{review.position}</p>
                                    <p className="text-muted">
                                        <i className="fas fa-quote-left pe-2"></i>
                                        {review.testimonial}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    onClick={handlePrev}
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    onClick={handleNext}
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Home
