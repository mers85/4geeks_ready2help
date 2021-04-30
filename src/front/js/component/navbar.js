import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { Topbar } from "./topbar";
import { LogOut } from "../pages/logout";
import { MobileMenu } from "./mobileMenu";
import "../../styles/header.scss";
import "bootstrap/js/src/collapse.js";

export function Navbar() {
	const { actions } = useContext(Context);

	const [collapsed, setCollapsed] = useState(true);
	const toggleNavbar = () => setCollapsed(!collapsed);

	function sessionLinks() {
		let link = { log: "", signup: "" };
		let token = actions.getAccessToken();
		if (token) {
			link.log = (
				<li className="nav-item">
					<LogOut />
				</li>
			);
		} else {
			link.log = (
				<Link className="nav-link" to="/login">
					Log In
				</Link>
			);
			link.signup = (
				<Link className="nav-link" to="/signup">
					Sign Up
				</Link>
			);
		}
		return link;
	}

	return (
		<div>
			<Topbar />
			<nav className="header-general navbar navbar-expand-lg navbar-light pt-3 shadow">
				<div className="container">
					<Link className="navbar-brand" to="/" title="">
						Ready2Help
					</Link>
					<button
						className="navbar-toggler"
						onClick={toggleNavbar}
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon text-muted"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent" isOpen={!collapsed}>
						<ul className="navbar-nav ml-auto">
							<li className="nav-item active">
								<Link className="nav-link" to="/projects" title="Proyectos">
									Proyectos
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/" title="Acerca de nosotros">
									Acerca de nosotros
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/" title="contacto">
									Contacto
								</Link>
							</li>
							{actions.isLogIn() ? (
								<li className="nav-item">
									<Link className="nav-link" to="/" title="Menú personal">
										Menú personal
									</Link>
								</li>
							) : (
								""
							)}

							<li className="nav-item d-md-block d-lg-none d-xl-none">{sessionLinks().log}</li>
							<li className="nav-item  d-md-block d-lg-none d-xl-none">{sessionLinks().signup}</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}
