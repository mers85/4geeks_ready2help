import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import rigoImageUrl from "../../img/rigo-baby.jpg";

import Button from "@material-ui/core/Button";

export const DashboardOrganization = props => {
	const [error, setError] = useState("");
	const { actions, store } = useContext(Context);
	const history = useHistory();

	return (
		// <div className="card bg-card-org p-4">
		// 	<div className="row p-3 m-3">
		// 		<div className="card shadow border-0" style={{ width: "18rem;" }}>
		// 			<div className="m-4">
		// 				<img src={rigoImageUrl} className="mx-auto image-org img-thumbnail img-fluid" alt="..." />
		// 			</div>
		// 			<div className="card-body text-center">
		// 				<h5 className="card-title">{props.organization.name}</h5>
		// 				<p className="card-text btn cBtnTheme">Editar datos de la Organización</p>
		// 			</div>
		// 			<ul className="list-group list-group-flush">
		// 				<Link
		// 					className="list-group-item btn btn-light text-muted border-top rounded-0"
		// 					to={"/organizations/" + props.organization.id + "/projects"}>
		// 					Ver/Editar proyectos
		// 				</Link>
		// 				<Link
		// 					className="list-group-item btn btn-light text-muted rounded-0"
		// 					to={"/organizations/" + props.organization.id + "/create_project"}>
		// 					Añadir Proyecto
		// 				</Link>
		// 			</ul>
		// 		</div>
		// 	</div>
		// </div>
		<div className="container py-3">
			<div className="card">
				<div className="row ">
					<div className="col-md-4">
						<img src={rigoImageUrl} className="" />
					</div>
					<div className="col-md-8 px-3">
						<div className="card-block px-3">
							<h4 className="card-title">Lorem ipsum dolor sit amet</h4>
							<p className="card-text">
								Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
								aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
								aliquip ex ea commodo consequat.{" "}
							</p>
							<p className="card-text">
								Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
								officia deserunt mollit anim id est laborum.
							</p>
							<a href="#" className="btn btn-primary">
								Read More
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

DashboardOrganization.propTypes = {
	organization: PropTypes.object
};
