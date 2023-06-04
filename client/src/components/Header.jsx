import { ConnectWallet } from "@thirdweb-dev/react";
import {Link} from "react-router-dom";

export const Header = () => {
    return<>
        <header>
            <div className="collapse bg-dark" id="navbarHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-7 py-4">
                            <h4 className="text-white">About US</h4>
                            <p className="text-muted">Add some information about the album below, the author, or any other background
                                context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off
                                to some social networking sites or contact information.</p>
                        </div>
                        <div className="col-sm-4 offset-md-1 py-4">
                            <h4 className="text-white">Contact</h4>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white">Follow on Twitter</a></li>
                                <li><a href="#" className="text-white">Like on Facebook</a></li>
                                <li><a href="#" className="text-white">Email me</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar navbar-dark bg-dark shadow-sm">
                <div className="container">
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        <strong>Lush</strong>
                    </Link>
                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <Link to="/" className="me-3 py-2 text-white text-decoration-none" href="#">Home</Link>
                        <Link to="/new-property" className="me-3 py-2 text-white text-decoration-none" href="#">Add property</Link>
                        <Link to="/properties" className="me-3 py-2 text-white text-decoration-none" href="#">Properties</Link>
                        <Link to="/my-properties" className="me-3 py-2 text-white text-decoration-none" href="#">My Properties</Link>
                    </nav>
                    <div className="connect p-2">
                        <ConnectWallet dropdownPosition={{
                            align: 'center',
                            side: 'bottom'
                        }} />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader"
                            aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
        </header>
    </>
}