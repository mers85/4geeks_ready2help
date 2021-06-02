import React, { useEffect, useState, useContext } from "react";
import { CardDeck, Card } from "reactstrap";
import { Context } from "../store/appContext";
import { CardProject } from "../component/cardProject";
import Spinner from "../component/spinner";
import PageTitle from "../component/pageTitle";
import { func } from "prop-types";
import "../../styles/projects.scss";

export const Projects = () => {
	const [error, setError] = useState("");
	const { store, actions } = useContext(Context);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		projects(0);
		getCategories();
	}, []);

	function getCategories() {
		let responseOkCat = false;
		fetch(process.env.BACKEND_URL + "/api/v1/categories", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				responseOkCat = response.ok;
				return response.json();
			})
			.then(responseCatego => {
				if (responseOkCat) {
					let allCategories = [];
					for (let i = 0; i < responseCatego.categories.length; i++) {
						let result = {
							label: responseCatego.categories[i].name,
							value: responseCatego.categories[i].id
						};
						allCategories.push(result);
					}
					setCategories(allCategories);
				} else {
					toast.error(responseCatego.message);
				}
			})
			.catch(error => {
				setError(error.message);
			});
	}

	function projects(category) {
		setError("");

		let responseOk = false;
		let ruta = process.env.BACKEND_URL + "/api/v1/projects";

		if (category > 0) {
			ruta = process.env.BACKEND_URL + "/api/v1/projects/categorie/" + category;
		}

		fetch(ruta, {
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

	function filtrar(catego) {
		projects(catego.value);
	}

	return (
		<div>
			<PageTitle pageTitle="Proyectos" myPath="/projects" />
			<div className="projects mt-2 mx-align-self-center text-center">
				<button
					key="todos"
					type="button"
					className="btn btn-outline-pill mx-1 mb-1 rounded-pill p-2 px-3"
					onClick={() => {
						filtrar(0);
					}}>
					Todos
				</button>
				{categories.map((catego, index) => {
					return (
						<button
							key={index}
							type="button"
							className="btn btn-outline-pill mx-1 mb-1 rounded-pill p-2 px-3"
							onClick={() => {
								filtrar(catego);
							}}>
							{catego.label}
						</button>
					);
				})}
			</div>
			<div className="container-fluid px-sm-2 px-md-4 px-lg-5 py-3 my-3">
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
