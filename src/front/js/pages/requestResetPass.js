import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";

import PageTitle from "../component/pageTitle";

import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";

import "../../styles/formularioBase2.scss";

export const RequestResetPass = () => {
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [disableButton, setDisableButton] = useState(false);
	const history = useHistory();
	const [value, setValue] = useState({ email: "" });

	const changeHandler = e => {
		setValue({ ...value, [e.target.name]: e.target.value });
		validator.showMessages();
	};

	const [validator] = React.useState(
		new SimpleReactValidator({
			className: "errorMessage"
		})
	);

	function submitForm(e) {
		e.preventDefault();

		setError("");
		switch (true) {
			case value.email.trim() == "":
				setError("Email field must be informed.");
				return;
			default:
				break;
		}

		setDisableButton(true);

		let responseOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/request_reset_pass", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: value.email
			})
		})
			.then(response => {
				setDisableButton(false);
				responseOk = response.ok;
				if (responseOk) {
					if (response.status === 201) {
						toast.success(
							"¡Le hemos enviado un email. En el caso de que no lo haya recibido, es posible que usted no esté registrado en nuestra plataforma!"
						);
					}
				}
				return response.json();
			})
			.then(responseJson => {
				if (responseOk) {
					history.push("/");
				}
			})
			.catch(error => {
				setError(error.message);
			});
	}

	return (
		<div>
			<div className="container formulario-base py-5 my-5">
				<div className="row">
					<div className="col-sm-12 col-md-10 mx-auto">
						<div className="card mb-3 p-3 shadow rounded border-0">
							<h2 className="card-title text-center p-3">Recuperar contraseña</h2>
							<small className="card-subtitle px-3 text-center">
								Introduce tu correo eléctronico (usuario) para poder enviarte el procedimiento para
								cambiar la contraseña.
							</small>
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
												placeholder="@"
												onBlur={e => changeHandler(e)}
												onChange={e => changeHandler(e)}
											/>
										</div>
									</div>
									<button
										type="submit"
										className="btn button-green btn-md btn-block"
										disabled={disableButton}>
										ENVIAR
									</button>
								</form>
								<p className="noteHelp">
									<Link to={"/"}>ir a la página principal</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
