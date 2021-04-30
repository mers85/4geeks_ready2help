import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { LogOut } from "../pages/logout";

import { MobileMenu } from "./mobileMenu";
import "../../styles/header2.scss";

export function Topbar() {
	const { actions, store } = useContext(Context);

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
		<div className="header-general navbar navbar-expand-lg d-none d-sm-none d-md-none d-lg-block border-bottom">
			<div className=" container">
				<ul className="navbar-nav mr-auto">
					<li classNam="nav-item mx-1">
						<i className="fas fa-phone-volume" />
						+34667780442
					</li>
					<span className="border-right mx-1"></span>
					<li classNam="nav-item">
						<i className="fas fa-envelope mx-1" />
						ready2helpemail@gmail.com
					</li>
				</ul>

				<ul className="navbar-nav ml-auto">
					<li className="nav-item">{sessionLinks().log}</li>
					<span className="border-right mx-2"></span>
					<li className="nav-item">{sessionLinks().signup}</li>
					<li className="nav-item">
						<Link className="btn bg-green" to="/create_project">
							Crear proyecto
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
