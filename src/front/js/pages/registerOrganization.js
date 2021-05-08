import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";

import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import "../../styles/formularioBase2.scss";
import FixedAlert from "../component/fixedAlert";

export const RegisterOrganization = props => {
	const history = useHistory();
	const { actions } = useContext(Context);
	const [disableButton, setDisableButton] = useState(false);
	const [value, setValue] = useState({
		email: "",
		name: "",
		address: "",
		zipcode: "",
		phone: ""
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
			setValue({
				email: "",
				name: "",
				address: "",
				zipcode: "",
				phone: ""
			});
			validator.hideMessages();

			setDisableButton(true);

			let responseOk = false;
			fetch(process.env.BACKEND_URL + "/api/v1/register_org", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + actions.getAccessToken()
				},
				body: JSON.stringify({
					email: value.email,
					name: value.name,
					address: value.address,
					zipcode: value.zipcode,
					phone: value.phone
				})
			})
				.then(response => {
					setDisableButton(false);
					responseOk = response.ok;
					return response.json();
				})
				.then(responseJson => {
					if (responseOk) {
						actions.addNewUserRole("organization");
						actions.addOrganizationId(responseJson["organization"]["id"]);
						toast.success("¡Organización registrada!");
						history.push("/profile");
					} else {
						toast.error(responseJson.message);
					}
				})
				.catch(error => {
					toast.error(error.message);
				});
		}
		return false;
	};

	return (
		<div className="container formulario-base py-5 mt-5 px-0">
			<div className="row mx-auto">
				<div className="col-sm-12 col-md-10 mx-auto">
					{props.notification ? <FixedAlert color="info" message={props.notification} /> : ""}
					<div className="card p-md-4 py-4 border-0 shadow">
						<h2 className="card-title text-center p-3">Datos de la organización</h2>
						<small className="card-subtitle p-2 text-center">
							Crea tu organización para que puedas dar de alta tus proyectos
						</small>
						<div className="card-body mx-0">
							<form onSubmit={submitForm}>
								<div className="form-row py-3">
									<div className="form-group col-12 textOnInput">
										<label className="textLabel">Nombre</label>
										<input
											type="text"
											className="form-control"
											placeholder="Nombre"
											name="name"
											defaultValue={value.name}
											onBlur={e => changeHandler(e)}
											onChange={e => changeHandler(e)}
										/>
										{validator.message("Name", value.name, "required:name")}
									</div>
								</div>
								<div className="form-row pb-3">
									<div className="form-group col-md-12 textOnInput">
										<label className="textLabel">Dirección</label>
										<input
											type="text"
											className="form-control"
											placeholder="Dirreción"
											name="address"
											defaultValue={value.address}
											onBlur={e => changeHandler(e)}
											onChange={e => changeHandler(e)}
										/>
										{validator.message("address", value.address, "required:address")}
									</div>
								</div>
								<div className="form-row ">
									<div className="form-group col-sm-12 col-md-6 textOnInput pb-3">
										<label className="textLabel">Código Postal</label>
										<input
											type="text"
											className="form-control"
											placeholder="Código Postal"
											name="zipcode"
											defaultValue={value.zipcode}
											onBlur={e => changeHandler(e)}
											onChange={e => changeHandler(e)}
										/>
										{validator.message("zipcode", value.zipcode, "required:zipcode")}
									</div>
									<div className="form-group col-sm-12 col-md-6 textOnInput pb-3">
										<label className="textLabel">Email</label>
										<input
											type="email"
											className="form-control"
											placeholder="Email"
											name="email"
											defaultValue={value.email}
											onBlur={e => changeHandler(e)}
											onChange={e => changeHandler(e)}
										/>
										{validator.message("email", value.email, "required:email")}
									</div>
								</div>
								<div className="form-row pb-2">
									<div className="form-group col-sm-12 col-md-6 textOnInput pb-3">
										<label className="textLabel">Teléfono</label>
										<input
											type="text"
											className="form-control"
											placeholder="Teléfono"
											name="phone"
											defaultValue={value.phone}
											onBlur={e => changeHandler(e)}
											onChange={e => changeHandler(e)}
										/>
										{validator.message("phone", value.phone, "required:phone")}
									</div>
								</div>

								<button
									type="submit"
									className="btn button-green btn-md btn-block"
									disabled={disableButton}>
									CREAR ORGANIZACIÓN
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
RegisterOrganization.propTypes = {
	notification: PropTypes.string
};
