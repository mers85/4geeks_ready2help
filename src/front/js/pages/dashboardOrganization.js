import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

export const DashboardOrganization = props => {
	const [error, setError] = useState("");
	const { actions, store } = useContext(Context);
	const history = useHistory();

	return (
		<div className="jumbotron py-3">
			<h4>Mi organizacion</h4>
			<div className="card-body">
				<h6>Name: {props.organization.name}</h6>
				<Link to={"/organizations/" + props.organization.id + "/create_project"}>
					<Button className="cBtnTheme">Añadir proyecto</Button>
				</Link>
			</div>
		</div>
	);
};

DashboardOrganization.propTypes = {
	organization: PropTypes.object
};
