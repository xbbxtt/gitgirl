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
            job_desc: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse faucibus interdum posuere lorem ipsum dolor sit. Fusce id velit ut tortor. Iaculis urna id volutpat lacus laoreet non curabitur. In iaculis nunc sed augue lacus viverra. Aliquet porttitor lacus luctus accumsan tortor posuere. Lectus urna duis convallis convallis. Convallis convallis tellus id interdum velit laoreet id. Porttitor leo a diam sollicitudin tempor id eu nisl nunc. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Consectetur libero id faucibus nisl tincidunt. Congue eu consequat ac felis donec. Tincidunt id aliquet risus feugiat in ante metus. Mi proin sed libero enim sed faucibus turpis in. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque.

    Sem fringilla ut morbi tincidunt augue interdum velit. Pellentesque pulvinar pellentesque habitant morbi tristique. Sed libero enim sed faucibus turpis in eu. Risus in hendrerit gravida rutrum quisque non tellus orci ac. Purus semper eget duis at tellus at urna. Cras tincidunt lobortis feugiat vivamus at augue eget. Sapien pellentesque habitant morbi tristique senectus et netus et malesuada. Adipiscing bibendum est ultricies integer. Habitasse platea dictumst vestibulum rhoncus est. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat.`,
        },
    ]

    const job = postedJobsDetail[0]

    if (!job) {
        return <div>Loading...</div>
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const month = date.toLocaleString('default', { month: 'short' })
        const day = date.getDate()
        const year = date.getFullYear()
        return `${month}-${day}-${year}`
    }

    return (
        <div
            className="container"
            style={{ minHeight: '80vh', paddingLeft: '0px', marginLeft: '0px' }}
        >
            <div className="row justify-content-center">
                <div className="col-md-11">
                    <div className="container-body">
                        <div className="card-body">
                            <div className="row">
                                <div
                                    className="col-md-4"
                                    style={{
                                        paddingLeft: '1px',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <div
                                        className="jumbotron jumbotron-fluid text-center"
                                        style={{
                                            marginTop: '50px',
                                            width: '80%',
                                            height: '90%',
                                            float: 'left', // Adjusted to left
                                            backgroundColor: '#F5F5F5',
                                        }}
                                    >
                                        <div className="container">
                                            <img
                                                className="company_url"
                                                src={job.image_url}
                                                width="90%"
                                                height="auto"
                                                style={{
                                                    marginBottom: '50px',
                                                    marginTop: '40px',
                                                }}
                                            />
                                            <div className="text-left">
                                                <p className="list-group-item">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-geo-alt-fill"
                                                        viewBox="0 0.2 16 16"
                                                        style={{
                                                            marginRight: '5px',
                                                        }}
                                                    >
                                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                    </svg>
                                                    {job.location}
                                                    <hr
                                                        style={{
                                                            margin: '20px 0',
                                                            borderColor:
                                                                'black',
                                                        }}
                                                    />
                                                </p>
                                                <p className="list-group-item">
                                                    Posted:{' '}
                                                    {formatDate(
                                                        job.posted_date
                                                    )}
                                                    <hr
                                                        style={{
                                                            margin: '20px 0',
                                                            borderColor:
                                                                'black',
                                                        }}
                                                    />
                                                </p>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    style={{
                                                        backgroundColor:
                                                            '#E99B9B',
                                                        margin: '20px 0',
                                                    }}
                                                    onClick={() =>
                                                        handleApply(job.id)
                                                    }
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-md-8"
                                    style={{
                                        paddingLeft: '0px',
                                        marginTop: '80px',
                                    }}
                                >
                                    <div className="container">
                                        <h1
                                            className="display-4"
                                            style={{ display: 'inline-block' }}
                                        >
                                            {job.position_title}
                                        </h1>
                                        <p
                                            className="lead"
                                            style={{
                                                display: 'inline-block',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            {job.company_name}
                                        </p>
                                    </div>
                                    <div
                                        style={{
                                            width: '100%',
                                            float: 'left',
                                        }}
                                    >
                                        <div className="card-body">
                                            <p
                                                className="card-text"
                                                style={{
                                                    paddingLeft: '16px',
                                                    marginTop: '10px',
                                                    marginBottom: '80px',
                                                }}
                                            >
                                                {job.job_desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetail
