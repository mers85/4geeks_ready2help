import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import { VolunteerActivities } from "./volunteerActivities";

export const MyActivities = props => {
	const [error, setError] = useState("");
	const { actions, store } = useContext(Context);
	const history = useHistory();

	return (
		<div className="jumbotron py-3">
			<h4>Actividades</h4>
			{props.user && props.user["volunteering_projects"].length > 0 ? (
				<VolunteerActivities projects={props.user["volunteering_projects"]} />
			) : (
				""
			)}
		</div>
	);
};

MyActivities.propTypes = {
	user: PropTypes.object
};
