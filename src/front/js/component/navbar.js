import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>
			<Link to="/signup">
				<span className="navbar-brand mb-0 h1">Sign Up</span>
			</Link>
			<Link to="/login">
				<span className="navbar-brand mb-0 h1">Log In</span>
			</Link>
			<Link to="/profile">
				<span className="navbar-brand mb-0 h1">Profile</span>
			</Link>
			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-primary">Check the Context in action</button>
				</Link>
			</div>
		</nav>
	);
};
