import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useLazyListAllAppsForPosterByJobQuery,
    useAuthenticateQuery,
    useLazyJobDetailsQuery,
} from '../app/apiSlice';
import UserNavigation from './UserNavigation';


const ViewApplicants = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [apps, setApps] = useState([]);
    const [job, setJob] = useState({});
    const { data: user, isLoading: isLoadingUser } = useAuthenticateQuery();
    const [listAppsTrigger, appListResult] = useLazyListAllAppsForPosterByJobQuery();
    const [jobDetailTrigger, jobDetailResult] = useLazyJobDetailsQuery();
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 8;

    useEffect(() => {
        if (!user && !isLoadingUser) {
            navigate('/signin');
        } else if (user) {
            jobDetailTrigger(params.jobID);
            listAppsTrigger(params.jobID);
        }
    }, [user, isLoadingUser, navigate, jobDetailTrigger, listAppsTrigger]);

    useEffect(() => {
        if (jobDetailResult.isSuccess) {
            setJob(jobDetailResult.data);
        }
    }, [jobDetailResult, setJob]);

    useEffect(() => {
        if (appListResult.isSuccess) {
            setApps(appListResult.data.applications);
        }
    }, [appListResult, setApps]);

    if (jobDetailResult.isLoading || appListResult.isLoading || isLoadingUser) {
        return <div>Loading Applicants...</div>;
    }

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentApps = apps.slice(indexOfFirstJob, indexOfLastJob);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container-fluid" style={{ minHeight: '80vh' }}>
            <div className="row">
                <UserNavigation />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ marginTop: '20px' }}>
                    <div>
                        <h2>Applicants</h2>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Linkedin URL</th>
                                    <th scope="col">Position Title</th>
                                    <th scope="col">Company Name</th>
                                    <th scope="col">Job Details</th>
                                    <th scope="col">Applied At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentApps.length === 0 ? (
                                    <tr>
                                        <td colSpan="7">No applicants at this time</td>
                                    </tr>
                                ) : (
                                    currentApps.map((app, index) => (
                                        <tr
                                            key={index}
                                            className={
                                                index % 2 === 0
                                                    ? 'table-default'
                                                    : 'table-primary'
                                            }
                                        >
                                            <td>{app.full_name}</td>
                                            <td>{app.email}</td>
                                            <td>{app.linkedin_url}</td>
                                            <td>{job.position_title}</td>
                                            <td>{job.company_name}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary me-2"
                                                    onClick={() =>
                                                        navigate(`/jobs/${job.id}`)
                                                    }
                                                >
                                                    Job Detail
                                                </button>
                                            </td>
                                            <td>{formatDate(app.applied_at)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-end">
                        <ul
                            className="pagination pagination-sm"
                            style={{ color: '#300b9b' }}
                        >
                            <li
                                className={`page-item ${
                                    currentPage === 1 ? 'disabled' : ''
                                }`}
                            >
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={() => paginate(currentPage - 1)}
                                >
                                    &laquo;
                                </a>
                            </li>
                            {Array.from(
                                {
                                    length: Math.ceil(
                                        apps.length / jobsPerPage
                                    ),
                                },
                                (_, i) => (
                                    <li
                                        key={i}
                                        className={`page-item ${
                                            currentPage === i + 1
                                                ? 'active'
                                                : ''
                                        }`}
                                    >
                                        <a
                                            className="page-link"
                                            href="#"
                                            onClick={() => paginate(i + 1)}
                                        >
                                            {i + 1}
                                        </a>
                                    </li>
                                )
                            )}
                            <li
                                className={`page-item ${
                                    currentPage ===
                                    Math.ceil(apps.length / jobsPerPage)
                                        ? 'disabled'
                                        : ''
                                }`}
                            >
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={() => paginate(currentPage + 1)}
                                >
                                    &raquo;
                                </a>
                            </li>
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ViewApplicants;
