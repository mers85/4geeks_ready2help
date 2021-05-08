import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";

import PageTitle from "../component/pageTitle";
import "../../styles/formularioBase2.scss";

export const EditUserDetails = props => {
	let { id } = useParams();
	const [value, setValue] = useState({ user_details: "" });
	const [disableButton, setDisableButton] = useState(false);
	const { actions, store } = useContext(Context);
	const history = useHistory();

	const url = window.location.search;
	let params = queryString.parse(url);

	useEffect(() => {
		let userDetailsId = actions.getUserDetails().id;

		let responsePersonOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/persons/" + userDetailsId, {
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
				if (responsePersonOk) {
					console.log(responseJson.person);
					setValue({ ...value, ["user_details"]: responseJson.person });
				} else {
					toast.error(responseJson.message);
				}
			})
			.catch(error => {
				toast.error(error.message);
			});
	}, []);

	function redirectToMyPath() {
		if (params.successpath) {
			history.push(params.successpath);
		} else {
			history.push("/profile");
		}
	}

	const changeHandler = e => {
		setValue({ ...value, user_details: { ...value.user_details, [e.target.name]: e.target.value } });
	};

	const submitForm = e => {
		e.preventDefault();

		setDisableButton(true);

		let responseOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/users/" + id + "/edit_details", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			},
			body: JSON.stringify({
				name: value.user_details.name,
				lastname: value.user_details.lastname,
				email: value.user_details.email,
				address: value.user_details.address,
				zipcode: value.user_details.zipcode,
				phone: value.user_details.phone
			})
		})
			.then(response => {
				setDisableButton(false);
				responseOk = response.ok;
				if (response.ok) {
					if (response.status === 201) {
						toast.success("¡Tu perfil ha sido editado correctamente!");
					}
				}
				return response.json();
			})
			.then(responseJson => {
				if (responseOk) {
					actions.addUserDetails(responseJson.user_details);
					redirectToMyPath();
				} else {
					toast.error(responseJson.message);
				}
			})
			.catch(error => {
				toast.error(error.message);
			});

		return false;
	};

	return (
		<div>
			<PageTitle pageTitle="Editar datos de perfil" myPath={"/profile/users/" + id + "/edit_details"} />
			<div className="container formulario-base py-5 mt-5 px-0">
				<div className="row mx-auto">
					<div className="col-sm-12 col-md-10 mx-auto">
						<div className="card p-md-4 py-4 border-0 shadow">
							<h2 className="card-title text-center p-3">Editar Datos Complementarios</h2>
							<small className="card-subtitle p-2 text-center">Actualiza tus datos de perfil</small>
							<div className="card-body mx-0">
								<form onSubmit={submitForm}>
									<div className="form-row py-3">
										<div className="form-group col-sm-12 col-md-12 textOnInput">
											<label className="textLabel">Nombre</label>
											<input
												type="text"
												className="form-control"
												placeholder="Nombre"
												name="name"
												defaultValue={value.user_details.name}
												onBlur={e => changeHandler(e)}
												onChange={e => changeHandler(e)}
											/>
										</div>
									</div>
									<div className="form-row pb-3">
										<div className="form-group col-sm-12 col-md-12 textOnInput">
											<label className="textLabel">Apellidos</label>
											<input
												type="text"
												className="form-control"
												placeholder="Apellidos"
												name="lastname"
												defaultValue={value.user_details.lastname}
												onBlur={e => changeHandler(e)}
												onChange={e => changeHandler(e)}
											/>
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
												defaultValue={value.user_details.address}
												onBlur={e => changeHandler(e)}
												onChange={e => changeHandler(e)}
											/>
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
												defaultValue={value.user_details.zipcode}
												onBlur={e => changeHandler(e)}
												onChange={e => changeHandler(e)}
											/>
										</div>
										<div className="form-group col-sm-12 col-md-6 textOnInput pb-3">
											<label className="textLabel">Email de contacto</label>
											<input
												type="email"
												className="form-control"
												placeholder="Email de contacto"
												name="email"
												defaultValue={value.user_details.email}
												onBlur={e => changeHandler(e)}
												onChange={e => changeHandler(e)}
											/>
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
												defaultValue={value.user_details.phone}
												onBlur={e => changeHandler(e)}
												onChange={e => changeHandler(e)}
											/>
										</div>
									</div>

									<button type="submit" className="btn button-green btn-md btn-block">
										Guardar cambios
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
