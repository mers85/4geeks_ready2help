import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { TopHeader } from "./topheader";
import classnames from "classnames";
import { LogOut } from "../pages/logout";
import "../../styles/header.scss";
import "bootstrap/js/src/collapse.js";

export function Header() {
	const { actions } = useContext(Context);

	function sessionLinks() {
		let link = { log: "", signup: "" };
		let token = actions.getAccessToken();
		if (token) {
			link.log = <LogOut />;
		} else {
			link.log = (
				<NavLink className="nav-link" to="/login" activeClassName="active">
					Log In
				</NavLink>
			);
			link.signup = (
				<NavLink className="nav-link" to="/signup" activeClassName="active">
					Sign Up
				</NavLink>
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
								<li className="nav-item">
									<NavLink
										className="nav-link"
										to="/projects"
										title="Proyectos"
										activeClassName="active">
										Proyectos
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										to="/about_us"
										title="Acerca de nosotros"
										className="nav-link"
										activeClassName="active">
										Acerca de nosotros
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										className="nav-link"
										to="/contact"
										title="contacto"
										activeClassName="active">
										Contacto
									</NavLink>
								</li>
								{actions.isLogIn() ? (
									<li className="nav-item">
										<NavLink
											className="nav-link"
											to="/profile"
											title="Menú personal"
											activeClassName="active">
											Menú personal
										</NavLink>
									</li>
								) : (
									""
								)}
							</ul>
						</div>
						<ul className="navbar-nav mr-auto d-sm-block d-md-block d-lg-none d-xl-none py-3">
							<li className="nav-item active">
								<NavLink className="nav-link" to="/projects" title="Proyectos" activeClassName="active">
									Proyectos
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									className="nav-link"
									to="/about_us"
									title="Acerca de nosotros"
									activeClassName="active">
									Acerca de nosotros
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/contact" title="contacto" activeClassName="active">
									Contacto
								</NavLink>
							</li>
							{actions.isLogIn() ? (
								<li className="nav-item">
									<NavLink
										className="nav-link"
										to="/profile"
										title="Menú personal"
										activeClassName="active">
										Menú personal
									</NavLink>
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
