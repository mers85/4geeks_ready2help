import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { ProjectsOrganization } from "./projectsOrganization";
import rigoImageUrl from "../../img/rigo-baby.jpg";

import Button from "@material-ui/core/Button";
import "../../styles/profile.scss";

export const DashboardOrganization = props => {
	const [error, setError] = useState("");
	const { actions, store } = useContext(Context);
	const history = useHistory();

	return (
		<div>
			{props.organization ? (
				<div className="row d-flex justify-content-center my-5">
					<div className="col-sm-12 col-md-6 col-lg-6 mt-2 mb-4">
						<div className="profile card shadow border-0 avatar-container">
							<div className="card-up bg-card-org"></div>
							<img
								src={rigoImageUrl}
								className="avatar mx-auto image img-fluid img-thumbnail rounded-circle"
								alt="..."
							/>

							<div className="card-body">
								<h6 className="card-title text-center">Datos de La organización</h6>
								<p className="card-text">
									<i className="fas fa-users text-muted fa-1x mr-2"></i>
									{props.organization.name}
								</p>
								<p className="card-text">
									<i className="fas fa-envelope text-muted fa-1x mr-2"></i>
									{props.organization.email}
								</p>
								<p className="card-text">
									<i className="fas fa-map-marked-alt text-muted fa-1x mr-2"></i>{" "}
									{props.organization.address}
								</p>
								<p className="card-text">
									<i className="fas fa-phone-volume text-muted fa-1x mr-2"></i>{" "}
									{props.organization.phone}
								</p>
							</div>

							<Link
								className="col-12 px-0 border border-light py-2 footer bg-white btn btn-outline-lg-light rounded-0 text-muted text-center"
								to={"/organizations/" + props.organization.id + "/edit"}>
								Editar datos de la organización
							</Link>
						</div>
					</div>
					<div className="col-sm-12 col-md-6 col-lg-6 my-2">
						<ProjectsOrganization organization={props.organization} />
					</div>
				</div>
			) : (
				<div className="row my-5">
					<div className="col-12 col-md-8  mx-auto my-2">
						<Link to="/register_org">
							<div className="card-body rounded-pill p-3 bg-list-org text-center border-0 shadow">
								<h5 className="text-center ">Añade tu Organización para poder crear proyectos</h5>
							</div>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

DashboardOrganization.propTypes = {
	organization: PropTypes.object
};
