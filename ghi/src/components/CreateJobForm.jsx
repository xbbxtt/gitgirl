import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import UserNavigation from './UserNavigation'

const CreateJobForm = () => {
    const [formData, setFormData] = useState({
        image_url: '',
        position_title: '',
        company_name: '',
        job_description: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <div
            className="container-fluid"
            style={{ minHeight: '80vh', backgroundColor: 'white' }}
        >
            <div className="row">
                <UserNavigation />
                <main
                    className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
                    style={{ marginTop: '20px' }}
                >
                    <div className="card mb-3">
                        <h3 className="card-header">Post a Job</h3>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row mb-3">
                                    <div className="col">
                                        <label
                                            htmlFor="position_title"
                                            className="form-label"
                                        >
                                            Position Title
                                        </label>
                                        <input
                                            type="text"
                                            name="position_title"
                                            value={formData.position_title}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Position Title"
                                        />
                                    </div>
                                    <div className="col">
                                        <label
                                            htmlFor="company_name"
                                            className="form-label"
                                        >
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            name="company_name"
                                            value={formData.company_name}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Company Name"
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="image_url"
                                        className="form-label"
                                    >
                                        Company Image URL
                                    </label>
                                    <input
                                        type="text"
                                        name="image_url"
                                        value={formData.image_url}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Company Image URL"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="job_description"
                                        className="form-label"
                                    >
                                        Job Description
                                    </label>
                                    <textarea
                                        name="job_description"
                                        value={formData.job_description}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Job Description"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn"
                                    style={{
                                        backgroundColor: '#e99b9b',
                                        color: 'white',
                                    }}
                                >
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CreateJobForm
