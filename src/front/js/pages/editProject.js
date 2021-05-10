import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory, useParams } from "react-router-dom";

import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

import "../../styles/formularioBase2.scss";
import { LogIn } from "./login";

export const EditProject = props => {
	const history = useHistory();
	let { id } = useParams();
	const { actions } = useContext(Context);

	const [value, setValue] = useState({});

	const changeHandler = e => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		let responseOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/projects/" + id, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			}
		})
			.then(response => {
				responseOk = response.ok;
				return response.json();
			})
			.then(responseJson => {
				console.log("project show:", responseJson.project);
				if (responseOk) {
					console.log(responseJson.person);
					setValue({ ...value, ...responseJson.project });
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

		let responseOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/organizations/" + value.organization_id + "/projects/" + id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			},
			body: JSON.stringify({
				title: value.title,
				subtitle: value.subtitle,
				description: value.description,
				money_needed: parseFloat(value.money_needed),
				people_needed: parseInt(value.people_needed),
				status: value.status
			})
		})
			.then(response => {
				responseOk = response.ok;
				return response.json();
			})
			.then(responseJson => {
				if (responseOk) {
					toast.success("Tu proyecto ha sido modificado correctamente!");
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
					<div className="card p-md-4 py-4 border-0 shadow">
						<h2 className="card-title text-center p-3">Editar proyecto</h2>
						<div className="card-body mx-0">
							<form onSubmit={submitForm}>
								<div className="form-row py-3">
									<div className="form-group col-12 textOnInput">
										<label className="textLabel">Nombre del proyecto</label>
										<input
											type="text"
											className="form-control"
											placeholder="Nombre del proyecto"
											name="title"
											defaultValue={value.title}
											onBlur={e => changeHandler(e)}
											onChange={e => changeHandler(e)}
										/>
									</div>
								</div>
								<div className="form-row pb-3">
									<div className="form-group col-12 textOnInput">
										<label className="textLabel">Subtítulo</label>
										<textarea
											className="form-control"
											id="exampleFormControlTextarea1"
											name="subtitle"
											placeholder="Subtítulo"
											defaultValue={value.subtitle}
											onBlur={e => changeHandler(e)}
											onChange={e => changeHandler(e)}
											rows="2"></textarea>
									</div>
								</div>
								<div className="form-row ">
									<div className="form-group col-sm-12 col-md-6 textOnInput pb-3">
										<label className="textLabel">Dinero</label>
										<input
											type="text"
											className="form-control"
											placeholder="Dinero"
											name="money_needed"
											defaultValue={value.money_needed}
											onBlur={e => changeHandler(e)}
											onChange={e => changeHandler(e)}
										/>
									</div>
									<div className="form-group col-sm-12 col-md-6 textOnInput pb-3">
										<label className="textLabel">Voluntarios</label>
										<input
											type="text"
											className="form-control"
											placeholder="Voluntarios"
											name="people_needed"
											defaultValue={value.people_needed}
											onBlur={e => changeHandler(e)}
											onChange={e => changeHandler(e)}
										/>
									</div>
								</div>
								<div className="form-row pb-2">
									<div className="form-group col-12 textOnInput">
										<label className="textLabel">Descripción</label>
										<textarea
											className="form-control"
											id="exampleFormControlTextarea1"
											name="description"
											placeholder="Descripción"
											defaultValue={value.description}
											onBlur={e => changeHandler(e)}
											onChange={e => changeHandler(e)}
											rows="4"></textarea>
									</div>
								</div>

								<button type="submit" className="btn button-green btn-md btn-block">
									CREAR PROYECTO
								</button>
							</form>
						</div>
						<Link className="noteHelp p-2" to="/profile">
							Volver al menú personal
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

EditProject.propTypes = {};
