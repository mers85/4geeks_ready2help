import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import imgPrincipal from "../../img/hands_01.jpg";
import Button from "@material-ui/core/Button";

export const VolunteerActivities = props => {
	const [error, setError] = useState("");
	const { actions, store } = useContext(Context);
	const history = useHistory();

	return (
		<div>
			<h4>Proyectos en los que participas como voluntario</h4>
			<div className="card-deck">
				<div className="row">
					{props.projects.map(project => {
						return (
							<div className="col-md-3" key={project.id}>
								<div className="card">
									<img className="card-img-top" src={imgPrincipal} />
									<div className="card-body">
										<h6>{project.title}</h6>
										<Link to={"/projects/" + project.id}>
											<Button className="cBtnTheme">ver detalles</Button>
										</Link>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

VolunteerActivities.propTypes = {
	projects: PropTypes.array
};
