import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import { VolunteerActivities } from "./volunteerActivities";
import { DonationsActivities } from "./DonationsActivities";

export const MyActivities = props => {
	const [error, setError] = useState("");
	const { actions, store } = useContext(Context);
	const history = useHistory();

	return (
		<div className="row py-2 my-2">
			<div className="col-sm-12 col-md-8 mx-auto mb-2">
				{props.user && props.user["volunteering_projects"].length > 0 ? (
					<VolunteerActivities projects={props.user["volunteering_projects"]} />
				) : (
					""
				)}
			</div>
			<div className="col-sm-12 col-md-8 mx-auto mb-2">
				{props.user && props.user["details"] && props.user["details"]["donations"].length > 0 ? (
					<DonationsActivities projects={props.user["details"]["donations"]} />
				) : (
					""
				)}
			</div>
			<div className="col-sm- 12 col-md-8  mx-auto my-2">
				<div className="card border-0 shadow">
					<div className="card-header bg-white text-center">
						<h6>Únete a más proyectos</h6>
					</div>
					<div className="card-body text-center py-5">
						<Link className="bg-green rounded-pill p-3 text-white" to="/projects">
							<span className="text-white p-2 px-4 align-middle">ver proyectos</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

MyActivities.propTypes = {
	user: PropTypes.object
};
