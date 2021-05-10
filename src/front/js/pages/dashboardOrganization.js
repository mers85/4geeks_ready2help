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
				<div className="row">
					<div className="col-sm-12 col-md-8 col-lg-6 my-2">
						<div className="card border-0 shadow py-2">
							<div className="row ">
								<div className="col-md-4 text-center ">
									<img src={rigoImageUrl} className="m-2 img-thumbnail" />
									<h6 className="card-title  my-2">Datos de la organización</h6>
								</div>
								<div className="col-md-8 px-3">
									<div className="card-block px-3">
										<h6 className="card-text my-3">
											<p>{props.organization.name}</p>
										</h6>
										<p className="card-text">
											<i className="mr-auto px-1 fas fa-envelope fa-1x"></i>
											<span>{props.organization.email}</span>
										</p>
										<p className="card-text">
											<i className="mr-auto px-1 fas fa-map-marked-alt text-muted fa-1x"></i>
											<span className="text-right">{props.organization.address}</span>
										</p>
										<p className="card-text">
											<i className="mr-auto px-1 fas fa-phone-volume text-muted fa-1x"></i>
											<span>{props.organization.phone}</span>
										</p>
										<Link
											className="btn btn-light rounded-pill p-3 text-muted rounded"
											to={"/organizations/" + props.organization.id + "/edit"}>
											Editar datos de la organización
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-12 col-md-8 col-lg-6 my-2">
						<ProjectsOrganization organization={props.organization} />
					</div>
				</div>
			) : (
				<div className="row">
					<div className="col-12 col-md-8  mx-auto my-2">
						<div className="card border-0 shadow">
							<h6 className="card-header bg-white text-center">
								Añade tu Organización para poder crear proyectos
							</h6>
							<div className="card-body text-center py-4">
								<Link className="bg-green rounded-pill p-3 text-white" to="/register_org">
									<i className="fas fa-plus-circle fa-2x text-white p-2 px-4 align-middle"></i>
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

DashboardOrganization.propTypes = {
	organization: PropTypes.object
};
