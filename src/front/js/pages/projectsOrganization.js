import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { toast } from "react-toastify";
import rigoImageUrl from "../../img/rigo-baby.jpg";

import Button from "@material-ui/core/Button";
import "../../styles/profile.scss";

export const ProjectsOrganization = props => {
	const [projects, setProjects] = useState([]);
	const { actions, store } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		let responsePersonOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/organizations/" + props.organization.id + "/projects", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			}
		})
			.then(response => {
				responsePersonOk = response.ok;
				return response.json();
			})
			.then(responseJson => {
				console.log("projects:", responseJson.projects);
				if (responsePersonOk) {
					setProjects([...projects, ...responseJson.projects]);
				} else {
					toast.error(responseJson.message);
				}
			})
			.catch(error => {
				toast.error(error.message);
			});
	}, []);

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
			<div className="col-12 mb-2">
				<div className="card border-0 shadow">
					<h6 className="card-header bg-white text-center">Crea un proyecto</h6>
					<div className="card-body text-center">
						<Link className="bg-green rounded-pill p-3 text-white" to="/create_project">
							<i className="fas fa-plus-circle fa-2x text-white p-2 px-4 align-middle"></i>
						</Link>
					</div>
				</div>
			</div>
			<div className="col-12 mt-2">
				<div className="card border-0 shadow">
					{projects && projects.length > 0 ? (
						<ul className="list-group">
							<li className="list-group-item d-flex justify-content-between align-items-center font-weight-bold">
								Nombre del proyecto
								<span className="">Acciones</span>
							</li>

							{projects.map(project => {
								return (
									<li
										key={project.id}
										className="list-group-item d-flex justify-content-between align-items-center">
										{truncateString(project.title, 40)}
										<Link
											className="btn btn-light rounded-pill p-2 my-2 text-muted rounded"
											to={"organizations/" + props.organization.id + "/projects/" + project.id}>
											editar
										</Link>
									</li>
								);
							})}
						</ul>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

ProjectsOrganization.propTypes = {
	organization: PropTypes.object
};
