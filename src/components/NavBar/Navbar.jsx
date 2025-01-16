import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DayNightTheme from "../day-night-theme/DayNightTheme";
import { AuthContext } from "../Context/AuthProvider";
import "./Navbar.css";

function Navbar() {
	const { isAuthenticated, logout } = useContext(AuthContext);
	return (
		<nav className="navbar navbar-expand-lg navbar-dark custom-navbar  fixed-top">
			<div className="container-fluid">
				<Link className="navbar-brand my-text"  to="/">
					BookTalk
				</Link>
				<DayNightTheme />
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/find-book">
								Find a book
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/find-discussion">
								Find a discussion
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/about">
								About Us
							</Link>
						</li>
					</ul>
					<div className="d-flex ms-3">
						{isAuthenticated ? (
							<>
								<Link
									className="btn btn-outline-light custom-btn me-2"
									to="/userPage"
								>
									Profile
								</Link>
								<button
									className="btn btn-outline-light custom-btn me-2"
									onClick={logout}
								>
									Log Out
								</button>
							</>
						) : (
							<>
						<Link
							className="btn btn-outline-light custom-btn me-2"
							to="/signup"
						>
							Sign up
						</Link>
						<Link
							className="btn btn-outline-light custom-btn"
							to="/login"
						>
							Log in
						</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
