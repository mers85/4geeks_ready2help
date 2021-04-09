import React from "react";
import { Link } from "react-router-dom";

import { HeaderTopbar } from "./headerTopbar";
import { MobileMenu } from "./mobileMenu";
import "../../styles/header.scss";

export const Header = () => {
	return (
		<div className="middle-header header-style-3">
			<HeaderTopbar />
			<div className="container">
				<div className="header-content">
					<div className="row">
						<div className="col-lg-3 col-md-4 col-sm-4 col-4">
							<div className="logo">
								<Link to="/" title="">
									Ready2help
								</Link>
							</div>
						</div>
						<div className="col-lg-8 d-lg-block d-none">
							<nav>
								<ul>
									<li>
										<Link className="active" to="/" title="">
											React Boilerplate
										</Link>
									</li>
									<li>
										<Link to="/signup" title="">
											Sign Up
										</Link>
									</li>
									<li>
										<Link to="/login" title="">
											Log In
										</Link>
									</li>
									<li>
										<Link to="/profile" title="">
											Profile
										</Link>
									</li>

									<li>
										<Link to="/#" title="">
											Contact
										</Link>
									</li>
								</ul>
							</nav>
						</div>
						<div className="col-md-2 col-sm-2 col-2">
							<MobileMenu />
						</div>
					</div>
					<div className="clearfix" />
				</div>
			</div>
		</div>
	);
};
