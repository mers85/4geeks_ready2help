import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";

const NotFound = () => {
	return (
		<div className="container py-5 -my-5">
			<div className="row text-center mt-5">
				<div className="col-sm mx-auto">
					<div className="card-body">
						<h3 className="display-4">Oops! Página no encontrada!</h3>
						<p>Lo sentimos, pero la página que busca no existe.</p>
						<Link to="/" className="bg-green rounded-pill p-3 text-white">
							Back to home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
