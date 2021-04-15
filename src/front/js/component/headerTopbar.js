import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import { toast } from "react-toastify";

import "../../styles/headertopbar.scss";
import { LogOut } from "../pages/logout";

export const HeaderTopbar = () => {
	const { actions, store } = useContext(Context);

	function sessionLinks(handleLogOut) {
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
			<div className="container">
				<div className="row">
					<div className="col col-md-6 col-sm-12 col-12">
						<div className="contact-intro">
							<ul>
								<li>
									{/* <i className="fi flaticon-call" /> */}
									<i className="fas fa-phone-volume mr-1" />
									+34667780442
								</li>
								<li>
									{/* <i className="fi flaticon-envelope" /> */}
									<i className="fas fa-envelope mr-1" />
									ready2helpemail@gmail.com
								</li>
							</ul>
						</div>
					</div>
					<div className="col col-md-6 col-sm-12 col-12">
						<div className="contact-info">
							<ul>
								<li>{sessionLinks().log}</li>
								<li>{sessionLinks().signup}</li>
								<li>
									<Link className="theme-btn" to="/#">
										Donate Now
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
