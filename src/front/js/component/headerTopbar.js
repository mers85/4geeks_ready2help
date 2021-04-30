import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import { toast } from "react-toastify";

import "../../styles/headertopbar.scss";
import { LogOut } from "../pages/logout";

export const HeaderTopbar = () => {
	const { actions, store } = useContext(Context);

	function sessionLinks() {
		let link = { log: "", signup: "" };
		let token = actions.getAccessToken();
		if (token) {
			link.log = <LogOut />;
		} else {
			link.log = <Link to="/login">Log In</Link>;
			link.signup = <Link to="/signup">Sign Up</Link>;
		}
		return link;
	}

	return (
		<div className="topbar">
			<nav className="navbar navbar-expand-lg navbar-light bg-white">
				<div className="container">
					<div className="row">
						<div className="col col-md-6 col-sm-12 col-12">
							<div className="">
								<ul className="navbar-nav mr-auto">
									<li classNam="nav-item">
										<i className="fas fa-phone-volume mr-1" />
										+34667780442
									</li>
									<li classNam="nav-item">
										<i className="fas fa-envelope mr-1" />
										ready2helpemail@gmail.com
									</li>
								</ul>
							</div>
						</div>
						<div className="col col-md-6 col-sm-12 col-12">
							<div className="">
								<ul className="navbar-nav ml-auto">
									<li classNam="nav-item">{sessionLinks().log}</li>
									<li classNam="nav-item">{sessionLinks().signup}</li>
									<li classNam="nav-item">
										<Link className="btn theme-btn" to="/create_project">
											Crear proyecto
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};
