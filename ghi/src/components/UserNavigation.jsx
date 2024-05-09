import { Link, useLocation } from 'react-router-dom';


const UserNavigation = () => {
    const location = useLocation();

    return (
        <nav
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar"
            style={{ marginTop: '20px' }}
        >
            <div className="position-sticky">
                <div className="list-group">
                    <Link
                        to="/profile"
                        className={
                            location.pathname === '/profile'
                                ? 'list-group-item list-group-item-action active'
                                : 'list-group-item list-group-item-action'
                        }
                    >
                        Profile
                    </Link>
                    <Link
                        to="/applications"
                        className={
                            location.pathname === '/applications'
                                ? 'list-group-item list-group-item-action active'
                                : 'list-group-item list-group-item-action'
                        }
                    >
                        My Applications
                    </Link>
                    <Link
                        to="/mypostedjobs"
                        className={
                            location.pathname === '/mypostedjobs'
                                ? 'list-group-item list-group-item-action active'
                                : 'list-group-item list-group-item-action'
                        }
                    >
                        Posted Jobs
                    </Link>
                    <Link
                        to="/createjob"
                        className={
                            location.pathname === '/createjob'
                                ? 'list-group-item list-group-item-action active'
                                : 'list-group-item list-group-item-action'
                        }
                    >
                        Post a Job
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default UserNavigation;
