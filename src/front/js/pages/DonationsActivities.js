import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import imgPrincipal from "../../img/hands_01.jpg";
import Button from "@material-ui/core/Button";

export const DonationsActivities = props => {
	const [error, setError] = useState("");
	const { actions, store } = useContext(Context);
	const history = useHistory();

	function truncateString(str, num) {
		// If the length of str is less than or equal to num
		// just return str--don't truncate it.
		if (str.length <= num) {
			return str;
		}
		// Return str truncated with '...' concatenated to the end of str.
		return str.slice(0, num) + "...";
	}

	return (
		<div>
			<div className="card border-0 shadow">
				<h6 className="card-header bg-white text-center">Proyectos en los que haz realizado donaciones</h6>
				<div className="card-body">
					<ul className="list-group">
						{props.projects.map(project => {
							return (
								<li
									key={project.id}
									className="list-group-item d-flex justify-content-between align-items-center">
									{truncateString(project.project_title, 45)}
									<Link className="badge badge-pill cBtnTheme p-2" to={"/projects/" + project.id}>
										ver detalles
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

DonationsActivities.propTypes = {
	projects: PropTypes.array
};
