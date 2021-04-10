import React from "react";
import { Link } from "react-router-dom";

import "../../styles/headertopbar.scss";

export const HeaderTopbar = () => {
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
									mers85@gmail.com
								</li>
							</ul>
						</div>
					</div>
					<div className="col col-md-6 col-sm-12 col-12">
						<div className="contact-info">
							<ul>
								<li>
									<Link to="/login">Log In</Link>
								</li>
								<li>
									<Link to="/signup">Sign Up</Link>
								</li>
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
