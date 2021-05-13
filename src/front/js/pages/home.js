import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { CardProject } from "../component/cardProject";
import Spinner from "../component/spinner";

import rigoImageUrl from "../../img/rigo-baby.jpg";
import image_projects from "../../img/hands_01.jpg";

import "../../styles/home.scss";

export const Home = () => {
	const [error, setError] = useState("");
	const { store, actions } = useContext(Context);

	useEffect(() => {
		projects();
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
		<div className="home">
			<div className="jumbotron bg-img bg-white text-center border border-light">
				<div className="row">
					<div className="col-sm-8 col-md-6 col-lg-4 mx-auto bg-white-opacity p-3 text-dark">
						<h2 className="">Red de proyectos sociales</h2>
						<div className="row ">
							<div className="col-sm-12 col-md-6 mx-auto">
								{
									"Ready2help es una plataforma de cohesión ciudadana, cooperación y empatía hacia nuestro entorno."
								}
							</div>
						</div>
						<hr className="my-2" />
						<p>Impulsa, Únete, Contribuye económicamente</p>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="container py-5 my-5">
					<div className="row">
						<div className="col-sm-12 col-md-6 mx-auto my-2">
							<h3 className="text-center my-3">{"¿Cómo participar en ready2Help?"}</h3>
						</div>
					</div>
					<div className="row  d-flex justify-content-between">
						<div className="col-sm-12 col-md-12 col-lg-4 mb-5">
							<div className="card border-0 shadow">
								<div className="mt-4 avatar mx-auto image img-thumbnail rounded-circle text-center">
									<i className="text-muted fas fa-hands-helping p-3 fa-3x"></i>
								</div>

								<div className="card-body mx-2">
									<h5 className="card-title text-center">Echa una mano</h5>
									<p className="card-text text-justify">
										¿Quieres unirte a un proyecto de voluntariado? <br /> Forma parte de una
										comunidad comprometida con proyectos con impacto social.
										<br /> Accede en tres pasos, regístrate, explora los pyoyectos y únete.
									</p>
								</div>
								<div className="card-footer bg-white border-0 text-center mb-4">
									<Link to="/projects" className="text-center bg-green rounded-pill p-3 text-white">
										Explora los proyectos
									</Link>
								</div>
							</div>
						</div>
						<div className="col-sm-12 col-md-12 col-lg-4 mb-5">
							<div className="card border-0 shadow">
								<div className="mt-4 avatar mx-auto image img-thumbnail rounded-circle text-center">
									<i className="fas fa-hand-holding-usd text-muted p-3 fa-3x"></i>
								</div>

								<div className="card-body mx-2">
									<h5 className="card-title text-center">Contribuye económicamente</h5>
									<p className="card-text text-justify mb-2">
										Tu aportación, por pequeña que te parezca, puede ser muy importante y valiosa.{" "}
										<br /> <br /> Dona en 3 pasos, explora los proyectos, regístrate/completa tu
										perfil y dona
									</p>
								</div>

								<div className="card-footer bg-white border-0 text-center mt-3 mb-4">
									<Link to="/projects" className="text-center bg-green rounded-pill p-3 text-white">
										Explora los proyectos
									</Link>
								</div>
							</div>
						</div>
						<div className="col-sm-12 col-md-12 col-lg-4 mb-5">
							<div className="card border-0 shadow">
								<div className="mt-4 avatar mx-auto image img-thumbnail rounded-circle text-center">
									<i className="fas fa-hands text-muted p-3 fa-3x"></i>
								</div>

								<div className="card-body mx-2">
									<h5 className="card-title text-center">¿Eres una organización?</h5>
									<p className="card-text text-justify">
										Desde Ready2help cuentas con las herramientas para recaudar fondos y dar a
										conocer en tu comunidad tus proyectos sociales. <br /> Accede en tres pasos,
										regístratate, rellena los datos de tu organización y crea tu proyecto.
									</p>
								</div>
								<div className="card-footer bg-white border-0 text-center mb-4">
									<Link
										to="/create_project"
										className="text-center bg-green rounded-pill p-3 text-white">
										Crea tu proyecto
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-12 col-md-6 mx-auto d-none d-sm-none d-md-none d-xl-block">
					<h3 className="text-center">Algunos de nuestros proyectos</h3>
				</div>
				<div className="container d-flex justify-content-center py-1 my-1">
					<div className="row m-2 scrolling-wrapper-flexbox">
						{store.projects ? (
							store.projects.map(project => {
								return (
									<div
										key={project.id}
										className="col-sm-12 col-md-12 col-lg-4 d-none d-sm-none d-md-none d-xl-block">
										<div className="card projects border-0 shadow my-3">
											<img className="card-img-top" src={image_projects} alt="" />
											<div className="card-body ">
												<h4 className="card-title">{project.title}</h4>
												<p className="card-subtitle mb-1">
													{truncateString(project.subtitle, 58)}
												</p>
											</div>
											<div className="card-footer bg-white btn-group btn-group-lg d-inline-flex p-0">
												<Link
													className="btn bg-blue-light-gradient rounded-0"
													to={"/projects/" + project.id}>
													Detalle
												</Link>
											</div>
										</div>
									</div>
								);
							})
						) : (
							<Spinner />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
