// @ts-check
import React from 'react';
import logo from '/src/logo.jpg';

function Home(props) {
    return (
        <>
            <div className="card mb-3">
                <h1 className="card-title text-center">Welcome to GitGirl</h1>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <h6 className="card-subtitle text-muted">
                        Support card subtitle
                    </h6>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card-body">
                            <p className="card-text">
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Cras justo odio</li>
                            <li className="list-group-item">
                                Dapibus ac facilisis in
                            </li>
                            <li className="list-group-item">
                                Vestibulum at eros
                            </li>
                        </ul>
                        <div className="card-body">
                            <a href="#" className="card-link">
                                Card link
                            </a>
                            <a href="#" className="card-link">
                                Another link
                            </a>
                        </div>
                        <div className="card-footer text-muted">2 days ago</div>
                    </div>
                    <div className="col-md-4">
                        <img
                            className="d-block user-select-none"
                            src= {logo}
                            width="100%"
                            height="auto"
                        >
                        </img>
                    </div>
                </div>
            </div>
            <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                    <h4 className="card-title">Card title</h4>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Card subtitle
                    </h6>
                    <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </p>
                    <a href="#" className="card-link">
                        Card link
                    </a>
                    <a href="#" className="card-link">
                        Another link
                    </a>
                </div>
            </div>
        </>
    )
}
export default Home
