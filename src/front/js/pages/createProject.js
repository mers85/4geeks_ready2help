import React, { useState, useContext } from "react";
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

export const CreateProject = props => {
	const history = useHistory();
	let { id } = useParams();
	const { actions } = useContext(Context);
	const [files, setFiles] = useState(null);

	const [value, setValue] = useState({
		title: "",
		subtitle: "",
		description: "",
		money_needed: "",
		people_needed: "",
		status: "",
		organization_id: ""
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

	const handlerFile = e => {};

	const submitForm = e => {
		e.preventDefault();
		if (validator.allValid()) {
			setValue({
				title: "",
				subtitle: "",
				description: "",
				money_needed: "",
				people_needed: "",
				status: "",
				organization_id: ""
			});
			validator.hideMessages();

			if (value.title) {
				let formData = new FormData();

				if (files && files.length > 0) {
					for (let i = 0; i < files.length; i++) {
						formData.append("img-project" + i, files[i]);
					}
				}

				let responseOk = false;
				id ? id : (id = props.wizardId);

				formData.append("title", value.title);
				formData.append("subtitle", value.subtitle);
				formData.append("description", value.description);
				formData.append("money_needed", parseFloat(value.money_needed));
				formData.append("people_needed", parseInt(value.people_needed));
				formData.append("status", value.status);
				formData.append("organization_id", id ? id : props.wizardId);

				fetch(process.env.BACKEND_URL + "/api/v1/organizations/" + id + "/projects", {
					method: "POST",
					headers: {
						Authorization: "Bearer " + actions.getAccessToken()
					},
					body: formData
				})
					.then(response => {
						responseOk = response.ok;
						return response.json();
					})
					.then(responseJson => {
						if (responseOk) {
							toast.success("Tu proyecto ha sido creado!");
							history.push("/profile");
						} else {
							toast.error(responseJson.message);
						}
					})
					.catch(error => {
						toast.error(error.message);
					});
			}
		} else {
			validator.showMessages();
			toast.error("¡Es necesario al menos un nombre del proyecto!");
		}
		return false;
	};

	return (
		<div className="container formulario-base py-5 mt-5 px-0">
			<div className="row mx-auto">
				<div className="col-sm-12 col-md-10 mx-auto">
					<div className="card p-md-4 py-4 border-0 shadow">
						<h2 className="card-title text-center p-3">Crear proyecto</h2>
						<small className="card-subtitle px-3 text-center">
							Puedes dar de alta tu proyecto solo con el nombre y luego ir a tu panel de administración y
							completar los datos antes de hacerlo público
						</small>
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
										{validator.message("title", value.title, "required:title")}
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

								<div className="form-row pb-2 my-2">
									{files && files.length > 0 ? (
										<div className="row mb-3">
											<div className="col-12 mx-auto">
												<p>Imagen seleccionada</p>
												<img src={URL.createObjectURL(files[0])} style={{ width: "35%" }} />
											</div>
										</div>
									) : (
										<p>Añade la imagen principal de tu proyecto</p>
									)}
									<div className="input-group mb-3">
										<div className="custom-file">
											<input
												type="file"
												name="img-project"
												className="custom-file-input"
												id="customFileLang"
												multiple
												lang="es"
												onChange={e => setFiles(e.currentTarget.files)}
											/>
											<label className="custom-file-label" i="labelId" htmlFor="customFileLang">
												Subir imagen
											</label>
										</div>
									</div>
								</div>

								<button type="submit" className="btn button-green btn-md btn-block">
									CREAR PROYECTO
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

CreateProject.propTypes = {
	id: PropTypes.object,
	wizardId: PropTypes.number
};
