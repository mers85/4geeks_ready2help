import React, { useEffect, useState, useContext } from "react";
import { CardDeck, Card } from "reactstrap";
import { Context } from "../store/appContext";
import { CardProject } from "../component/cardProject";
import Spinner from "../component/spinner";
import PageTitle from "../component/pageTitle";

export const Projects = () => {
	const [error, setError] = useState("");
	const { store, actions } = useContext(Context);

	useEffect(() => {
		projects();
	}, []);

	function projects() {
		setError("");

		let responseOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/projects", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				responseOk = response.ok;
				return response.json();
			})
			.then(responseProjects => {
				if (responseOk) {
					actions.addProjects(responseProjects);
				}
			})
			.catch(error => {
				setError(error.message);
			});
	}

	return (
		<div>
			<PageTitle pageTitle="Proyectos" myPath="/projects" />
			<div className="container-fluid d-flex justify-content-center px-sm-2 px-md-4 px-lg-5 py-3 my-3">
				<div className="row d-flex flex-wrap pb-md-3 mb-md-3">
					{store.projects ? (
						store.projects.map(project => {
							return (
								<CardProject
									key={project.id}
									title={project.title}
									featured_image_url={project.featured_image_url}
									subtitle={project.subtitle}
									money_needed={project.money_needed}
									total_donated={project.total_donated}
									people_needed={project.people_needed}
									id={project.id}
									volunteers_stats={project.volunteers_stats}
								/>
							);
						})
					) : (
						<Spinner />
					)}
				</div>
			</div>
		</div>
	);
};
