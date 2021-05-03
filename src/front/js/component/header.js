import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { TopHeader } from "./topheader";
import { LogOut } from "../pages/logout";
import "../../styles/header.scss";
import "bootstrap/js/src/collapse.js";

export function Header() {
	const { actions } = useContext(Context);

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
			<TopHeader />
			<nav className="header-general navbar navbar-expand-lg navbar-light py-3 shadow">
				<div className="container font-weight-normal">
					<Link className="navbar-brand" to="/" title="">
						Ready2Help
					</Link>
					<button
						className="navbar-toggler custom-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon text-muted"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<div className="navbar-nav ml-auto d-none d-sm-none d-md-none d-lg-block">
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
							</ul>
						</div>
						<ul className="navbar-nav mr-auto d-sm-block d-md-block d-lg-none d-xl-none py-3">
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

							<li className="nav-item">{sessionLinks().log}</li>
							<li className="nav-item">{sessionLinks().signup}</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}
