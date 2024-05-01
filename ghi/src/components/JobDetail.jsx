import React from 'react'

const JobDetail = () => {
    // Hardcoded job data
    const postedJobsDetail = [
        {
            id: '4',
            creator_id: '1',
            company_name: 'Company F',
            position_title: 'Position A',
            location: 'New York, NY',
            posted_date: '2024-04-25',
            image_url:
                'https://www.edigitalagency.com.au/wp-content/uploads/Linkedin-logo-png.png',
            job_desc:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',
        },
    ]

    const job = postedJobsDetail[0]

    if (!job) {
        return <div>Loading...</div>
    }

    return (
        <div
            className="card mb-3 d-flex justify-content-around"
            style={{ height: '80vh' }}
        >
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-md-4 text-center">
                        <img
                            className="company_url"
                            src={job.image_url}
                            width="50%"
                            height="auto"
                            style={{
                                marginBottom: '20px',
                                marginTop: '20px',
                            }}
                        />
                        <div className="row">
                            <div className="col-md-12">
                                <h6
                                    className="card-subtitle mb-2"
                                    style={{
                                        marginBottom: '10px',
                                        marginTop: '10px',
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-geo-alt-fill"
                                        viewBox="0 0.2 16 16"
                                        style={{ marginRight: '5px' }}
                                    >
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                    </svg>
                                    {job.location}
                                </h6>
                            </div>
                            <div className="col-md-12">
                                <h6
                                    className="card-subtitle mb-2"
                                    style={{
                                        marginBottom: '10px',
                                        marginTop: '10px',
                                    }}
                                >
                                    {job.posted_date}
                                </h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    style={{
                                        backgroundColor: '#493e57',
                                        width: '80%',
                                        marginTop: '20px',
                                    }}
                                    onClick={() => handleApply(job.id)}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-12">
                                <h2
                                    className="card-title"
                                    style={{
                                        marginTop: '40px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    {job.position_title}{' '}
                                    <span
                                        className="card-subtitle mb-2 text-muted"
                                        style={{
                                            fontSize: '15px',
                                            marginTop: '20px',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        {job.company_name}
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <p
                                    className="card-text"
                                    style={{ width: '80%', marginTop: '20px' }}
                                >
                                    {job.job_desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetail
