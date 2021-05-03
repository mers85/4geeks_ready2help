import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

import Grid from "@material-ui/core/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link, useHistory } from "react-router-dom";

import "../../styles/formularioBase.scss";

export const Contact = () => {
	const { store, actions } = useContext(Context);

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
		setValue({
			email: "",
			comment: ""
		});

		e.preventDefault();
		console.log(value.email, value.comment);
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
	};

	return (
		<section className="wpo-contact-form-map section-padding">
			<div className="container">
				<div className="row">
					<div className="col-sm">
						<div className="shadow bg-white rounded">
							<div className="card mb-3 p-3">
								<h2 className="card-title text-center p-3">Contacto</h2>
								<div className="card-body mx-0">
									<form onSubmit={submitForm}>
										<div className="form-group">
											<label>Correo Electrónico</label>
											<input
												type="email"
												className="form-control"
												id="email"
												name="email"
												defaultValue={value.email}
												placeholder="@"
												onBlur={e => changeHandler(e)}
												onChange={e => changeHandler(e)}
											/>
										</div>
										<div className="form-group">
											<label>Comentarios</label>
											<textarea
												className="form-control"
												id="comment"
												name="comment"
												defaultValue={value.comment}
												rows="4"
												onBlur={e => changeHandler(e)}
												onChange={e => changeHandler(e)}
											/>
										</div>
										<button type="submit" className="btn button-green btn-md btn-block">
											ENVIAR
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm">
						<div className="shadow bg-white rounded">
							<div className="card mb-3">
								<div className="card-body text-center">
									<a href="mailto:ready2helpemail@gmail.com">
										<h5 className="card-title">ready2helpemail@gmail.com</h5>{" "}
									</a>
									<h6 className="card-subtitle mb-2 text-muted">
										Correo Electrónico <i className="fas fa-at"></i>
									</h6>
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm">
						<div className="shadow bg-white rounded">
							<div className="card mb-3">
								<div className="card-body text-center">
									<a href="tel:+34667780442">
										<h5 className="card-title">(+34) 667 780 442</h5>
									</a>
									<h6 className="card-subtitle mb-2 text-muted text-center">
										Teléfono <i className="fas fa-phone"></i>{" "}
									</h6>
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm">
						<div className="shadow bg-white rounded">
							<div className="card mb-3">
								<div className="card-body text-center">
									<a href="https://g.page/4geeks-academy-madrid?share">
										<h5 className="card-title">Cl. de Edison, 3, 28006, Madrid</h5>
									</a>
									<h6 className="card-subtitle mb-2 text-muted">
										Dirección <i className="fas fa-map-marked"></i>
									</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
