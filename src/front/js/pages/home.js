import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { CardProject } from "../component/cardProject";
import Spinner from "../component/spinner";
import "bootstrap/js/src/carousel.js";

import rigoImageUrl from "../../img/rigo-baby.jpg";
import image_projects from "../../img/hands_01.jpg";
import IMGhome1 from "../../img/ready2help_home1.jpg";
import IMGhome2 from "../../img/ready2help_home2.jpg";
import IMGhome3 from "../../img/ready2help_home3.jpg";

import "../../styles/home.scss";
import { SliderProjects } from "../component/sliderProjects";

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
			<div id="myCarousel" className="carousel slide" data-ride="carousel">
				<ol className="carousel-indicators">
					<li data-target="#myCarousel" data-slide-to="0" className="active"></li>
					<li data-target="#myCarousel" data-slide-to="1"></li>
				</ol>
				<div className="carousel-inner">
					<div className="carousel-item active  bg-text-carrousel">
						<img className="first-slide" src={IMGhome2} alt="First slide" />
						<div className="container">
							<div className="carousel-caption text-center  bg-text-carrousel">
								<h2 className="text-white">Peque??as acciones para grandes cambios</h2>
								<p className="font-size-css">
									Empieza Ahora, encuentra proyectos incre??bles y colabora...
								</p>
								<p>
									<Link to="/signup" className="btn btn-lg bg-green font-weight-bold ">
										??nete
									</Link>
								</p>
							</div>
						</div>
					</div>
					<div className="carousel-item ">
						<img className="second-slide" src={IMGhome3} alt="Second slide" />
						<div className="container ">
							<div className="carousel-caption text-center bg-text-carrousel ">
								<h2 className="text-white">Red de proyectos sociales</h2>
								<p className="font-size-css">
									Crea proyectos y conecta con personas incre??bles para llevarlos a cabo...
								</p>
								<p>
									<Link to="/create_project" className="btn btn-lg bg-green font-weight-bold ">
										crear proyecto
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
				<a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="sr-only">Next</span>
				</a>
			</div>

			<div className="container-fluid">
				{/* <div className="jumbotron bg-img text-center border border-light py-5">
					<div className="row">
						<div className="col-sm-10 col-md-8 col-lg-10 mx-auto zindex4 py-5 text-dark zindex2">
							<h6 className="display-4">Red de proyectos sociales</h6>
							<hr />
							<div className="row ">
								<div className="col-sm-12 col-md-6 mx-auto">
									{
										"Ready2help es una plataforma de cohesi??n ciudadana, cooperaci??n y empat??a hacia nuestro entorno."
									}
								</div>
							</div>

							<Link to="/signup" className="btn btn-lg bg-green font-weight-bold ">
								??nete
							</Link>
						</div>
					</div>
				</div> */}

				<div className="row">
					<div className="container py-3 my-2">
						<div className="row">
							<div className="col-sm-12 col-md-6 mx-auto my-2">
								<h3 className="text-center my-3">{"??C??mo participar en ready2Help?"}</h3>
							</div>
						</div>
						<div className="row  d-flex justify-content-between">
							<div className="col-sm-12 col-md-12 col-lg-4 mb-5">
								<div className="card border-0">
									<div className="mt-4 avatar mx-auto image img-thumbnail rounded-circle text-center">
										<i className="text-muted fas fa-hands-helping p-3 fa-3x"></i>
									</div>

									<div className="card-body mx-2">
										<h5 className="card-title text-center">Echa una mano</h5>
										<p className="card-text text-justify">
											??Quieres unirte a un proyecto de voluntariado? <br /> Forma parte de una
											comunidad comprometida con proyectos con impacto social.
											<br /> Accede en tres pasos, reg??strate, explora los pyoyectos y ??nete.
										</p>
									</div>
									<div className="card-footer bg-white border-0 text-center mb-4">
										<Link
											to="/projects"
											className="text-center bg-green rounded-pill p-3 text-white">
											Explora los proyectos
										</Link>
									</div>
								</div>
							</div>
							<div className="col-sm-12 col-md-12 col-lg-4 mb-5">
								<div className="card border-0">
									<div className="mt-4 avatar mx-auto image img-thumbnail rounded-circle text-center">
										<i className="fas fa-hand-holding-usd text-muted p-3 fa-3x"></i>
									</div>

									<div className="card-body mx-2">
										<h5 className="card-title text-center">Contribuye econ??micamente</h5>
										<p className="card-text text-justify mb-2">
											Tu aportaci??n, por peque??a que te parezca, puede ser muy importante y
											valiosa. <br /> <br /> Dona en 3 pasos, explora los proyectos,
											reg??strate/completa tu perfil y dona
										</p>
									</div>

									<div className="card-footer bg-white border-0 text-center mt-3 mb-4">
										<Link
											to="/projects"
											className="text-center bg-green rounded-pill p-3 text-white">
											Explora los proyectos
										</Link>
									</div>
								</div>
							</div>
							<div className="col-sm-12 col-md-12 col-lg-4 mb-5">
								<div className="card border-0">
									<div className="mt-4 avatar mx-auto image img-thumbnail rounded-circle text-center">
										<i className="fas fa-hands text-muted p-3 fa-3x"></i>
									</div>

									<div className="card-body mx-2">
										<h5 className="card-title text-center">??Eres una organizaci??n?</h5>
										<p className="card-text text-justify">
											Desde Ready2help cuentas con las herramientas para recaudar fondos y dar a
											conocer en tu comunidad tus proyectos sociales. <br /> Accede en tres pasos,
											reg??stratate, rellena los datos de tu organizaci??n y crea tu proyecto.
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
					<div className="container-fluid bg-light py-5 my-2">
						<div className="col-sm-12 col-md-12 col-lg-10 py-5 mx-auto">
							<h3 className="text-center">Algunos de nuestros proyectos</h3>
							<SliderProjects projects={store.projects} />
						</div>
					</div>
				</div>

				<div className="row mt-3">
					<div className="container-fluid  py-5 my-2">
						<div className="col-12 text-center py-5">
							<h6 className="py-2 text-muted">??Listo para darle un impulso a tu proyecto?</h6>
							<Link to="/create_project" className="btn btn-lg bg-green">
								Crear proyecto
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
