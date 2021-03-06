import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";

import rigoImageUrl from "../../img/rigo-baby.jpg";
import PageTitle from "../component/pageTitle";

import "../../styles/formularioBase2.scss";

export const Contact = () => {
	const { store, actions } = useContext(Context);
	const [disableButton, setDisableButton] = useState(false);
	const [value, setValue] = useState({
		email: "",
		comment: ""
	});

	const changeHandler = e => {
		setValue({ ...value, [e.target.name]: e.target.value });
		validator.showMessages();
	};

	const [validator] = React.useState(
		new SimpleReactValidator({
			className: "errorMessage"
		})
	);

	const submitForm = e => {
		e.preventDefault();

		if (validator.allValid()) {
			setValue({ email: "", comment: "" });
		}
		validator.hideMessages();

		if (value.email && value.comment) {
			setDisableButton(true);

			let responseOk = false;
			fetch(process.env.BACKEND_URL + "/api/v1/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: value.email,
					comment: value.comment
				})
			})
				.then(response => {
					setDisableButton(false);
					responseOk = response.ok;
					return response.json();
				})
				.then(responseJson => {
					if (responseOk) {
						toast.success("Tus comentarios han sido enviados. Te responderemos muy pronto.");
					} else {
						toast.error(responseJson.message);
					}
				})
				.catch(error => {
					toast.error(error.message);
				});
		} else {
			validator.showMessages();
			toast.error("¡Rellenar los campos de Correo Electrónico y Comentarios!");
		}
		return false;
	};

	return (
		<div>
			<PageTitle pageTitle="Contáctanos" myPath="/contact" />
			<div className="container formulario-base py-5 my-5">
				<div className="row">
					<div className="col-sm-12 col-md-10 mx-auto">
						<div className="card mb-3 p-3 shadow rounded border-0">
							<h2 className="card-title text-center p-3">Contacto</h2>
							<p className="card-subtitle px-3 text-center">
								Dinos en qué te podemos ayudar, en qué nos quieres ayudar tú o simplemente deja tus
								comentarios.
							</p>
							<div className="card-body mx-0">
								<form onSubmit={submitForm}>
									<div className="form-row py-3">
										<div className="form-group col-12 textOnInput">
											<label>Correo Electrónico</label>
											<input
												type="email"
												className="form-control"
												id="email"
												name="email"
												defaultValue={value.email}
												value={value.email}
												placeholder="@"
												onBlur={e => changeHandler(e)}
												onChange={e => changeHandler(e)}
											/>
											{validator.message("email", value.email, "required:email")}
										</div>
									</div>
									<div className="form-row py-3">
										<div className="form-group col-12 textOnInput">
											<label>Comentarios</label>
											<textarea
												className="form-control"
												id="comment"
												name="comment"
												defaultValue={value.comment}
												value={value.comment}
												rows="4"
												onBlur={e => changeHandler(e)}
												onChange={e => changeHandler(e)}
											/>
											{validator.message("comment", value.comment, "required:comment")}
										</div>
									</div>
									<button
										type="submit"
										className="btn button-green btn-md btn-block"
										disabled={disableButton}>
										ENVIAR
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>

				<div className="row mx-lg-5 px-lg-5 d-flex  justify-content-between justify-content-md-center">
					<div className="card col-sm-12 col-md-8 col-lg  mx-sm-2 p-2  mb-3 rounded shadow border-0">
						<a href="mailto:ready2helpemail@gmail.com">
							<div className="card-body">
								<h5 className="card-title">
									ready2helpemail <br /> @gmail.com
								</h5>
								<div className="card-subtitle text-center mb-2 py-2 d-flex flex-wrap flex-row justify-content-start">
									<div className="col-sm px-0">
										<span className="badge badge-pill bg-icon-1 p-4 rounded-circle">
											<i className="fas fa-at text-white fa-2x"></i>
										</span>
									</div>
									<div className="col-sm  py-4">
										<h6 className="text-muted ml-md-2">Correo Electrónico</h6>
									</div>
								</div>
							</div>
						</a>
					</div>

					<div className="card col-sm-12 col-md-8 col-lg p-2 mb-3 mx-2 mx-lg-4 rounded shadow border-0">
						<a href="tel:+34667780442">
							<div className="card-body">
								<h5 className="card-title pb-4">(+34) 667 780 442</h5>

								<div className="card-subtitle text-center mb-2 py-2 d-flex flex-wrap flex-row justify-content-start">
									<div className="col-sm px-0">
										<span className="badge badge-pill bg-icon-2 p-4 rounded-circle">
											<i className="fas fa-phone text-white fa-2x"></i>
										</span>
									</div>
									<div className="col-sm py-4">
										<h6 className="text-muted ml-md-2">Teléfono</h6>
									</div>
								</div>
							</div>
						</a>
					</div>
					<div className="card col-sm-12 col-md-8 col-lg  p-2  mb-3 mx-sm-2 rounded shadow border-0">
						<a href="https://g.page/4geeks-academy-madrid?share" target="_blank" rel="noopener noreferrer">
							<div className="card-body">
								<h5 className="card-title">Cl. de Edison, 3, 28006, Madrid</h5>

								<div className="card-subtitle text-center mb-2 py-2 d-flex flex-wrap flex-row justify-content-start">
									<div className="col-sm px-0">
										<span className="badge badge-pill bg-icon-3 p-4 rounded-circle">
											<i className="fas fa-map-marked text-white fa-2x"></i>
										</span>
									</div>
									<div className="col-sm py-4">
										<h6 className="text-muted ml-md-2">Dirección</h6>
									</div>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
