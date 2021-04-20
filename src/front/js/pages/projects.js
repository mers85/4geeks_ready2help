import React, { useEffect, useState, useContext } from "react";
import "../../styles/home.scss";
import { CardDeck, Card } from "reactstrap";
import { Context } from "../store/appContext";
import { CardProject } from "../component/cardProject";

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
				console.log("error", error);
				setError(error.message);
			});
	}

	return (
		<div className="container-fluid py-5 my-5">
			<div className="row justify-content-md-center">
				<CardDeck className="mx-auto">
					{store.projects ? (
						store.projects.map(project => {
							// return <h1 key={project.id}>{project.description}</h1>;
							return (
								<CardProject
									key={project.id}
									title={project.title}
									money_needed={project.money_needed}
									total_donated={project.total_donated}
								/>
							);
						})
					) : (
						<h1>CARGANDO...</h1>
					)}
				</CardDeck>
			</div>
		</div>
	);
};
