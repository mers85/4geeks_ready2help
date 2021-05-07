import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import "../../styles/spinner.scss";

const NotFound = () => {
	return (
		<section className="error-404-section section-padding">
			<div className="container">
				<div className="row">
					<div className="col col-xs-12">
						<div className="content clearfix">
							<div className="error">{/* <img src={erimg} alt="" /> */}</div>
							<div className="error-message">
								<h3>Oops! Página no encontrada!</h3>
								<p>Lo sentimos, pero la página que busca no existe.</p>
								<Link to="/" className="theme-btn-s4">
									Back to home
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
