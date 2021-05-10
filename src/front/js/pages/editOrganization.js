import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory, useParams } from "react-router-dom";

import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import "../../styles/formularioBase2.scss";
import FixedAlert from "../component/fixedAlert";

export const EditOrganization = props => {
	const history = useHistory();
	let { id } = useParams();
	const { actions } = useContext(Context);
	const [disableButton, setDisableButton] = useState(false);
	const [value, setValue] = useState({ organization: "" });

	const changeHandler = e => {
		setValue({ ...value, organization: { ...value.organization, [e.target.name]: e.target.value } });
	};

	useEffect(() => {
		let responsePersonOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/organizations/" + id, {
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
					setValue({ ...value, ["organization"]: responseJson.organization });
				} else {
					toast.error(responseJson.message);
				}
			})
			.catch(error => {
				toast.error(error.message);
			});
	}, []);

	const submitForm = e => {
		e.preventDefault();
		setDisableButton(true);
		let responseOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/organizations/" + id + "/edit", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			},
			body: JSON.stringify({
				email: value.organization.email,
				name: value.organization.name,
				address: value.organization.address,
				zipcode: value.organization.zipcode,
				phone: value.organization.phone
			})
		})
			.then(response => {
				setDisableButton(false);
				responseOk = response.ok;
				return response.json();
			})
			.then(responseJson => {
				if (responseOk) {
					toast.success("¡Organización editada correctamente!");
					history.push("/profile");
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
		<div className="container formulario-base py-5 mt-5 px-0">
			<div className="row mx-auto">
				<div className="col-sm-12 col-md-10 mx-auto">
					{props.notification ? <FixedAlert color="info" message={props.notification} /> : ""}
					<div className="card p-md-4 py-4 border-0 shadow">
						<h2 className="card-title text-center p-3">Editar Datos de la organización</h2>

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
											defaultValue={value.organization.name}
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
											defaultValue={value.organization.address}
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
											defaultValue={value.organization.zipcode}
											onBlur={e => changeHandler(e)}
											onChange={e => changeHandler(e)}
										/>
									</div>
									<div className="form-group col-sm-12 col-md-6 textOnInput pb-3">
										<label className="textLabel">Email</label>
										<input
											type="email"
											className="form-control"
											placeholder="Email"
											name="email"
											defaultValue={value.organization.email}
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
											defaultValue={value.organization.phone}
											onBlur={e => changeHandler(e)}
											onChange={e => changeHandler(e)}
										/>
									</div>
								</div>

								<button
									type="submit"
									className="btn button-green btn-md btn-block"
									disabled={disableButton}>
									EDITAR ORGANIZACIÓN
								</button>
							</form>
						</div>
						<Link className="noteHelp p-2 text-center" to="/profile">
							Volver al menú personal
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
EditOrganization.propTypes = {
	notification: PropTypes.string
};
