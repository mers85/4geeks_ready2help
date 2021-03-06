import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory, useParams } from "react-router-dom";

import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import Select from "react-select";
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
	const [files, setFiles] = useState(null);

	const [value, setValue] = useState({});
	const [categoriesList, setCategoriesList] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);

	const changeHandler = e => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	const changeHandlerSelect = e => {
		let allCategories = e;

		for (let i = 0; i < allCategories.length; i++) {
			setValue({ ...value, categories: [...value.categories, allCategories[i].value] });
		}
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
				if (responseOk) {
					setValue({ ...value, ...responseJson.project });
					let categoriesSelected = [];
					for (let i = 0; i < responseJson.project.categories.length; i++) {
						let result = {
							label: responseJson.project.categories[i].name,
							value: responseJson.project.categories[i].id
						};
						categoriesSelected.push(result);
					}
					setSelectedCategories([...selectedCategories, ...categoriesSelected]);
				} else {
					toast.error(responseJson.message);
				}
			})
			.catch(error => {
				toast.error(error.message);
			});
		updateAllCategories();
	}, []);

	function updateAllCategories() {
		let responseOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/categories", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				responseOk = response.ok;
				return response.json();
			})
			.then(responseJson => {
				if (responseOk) {
					let allCategories = [];
					for (let i = 0; i < responseJson.categories.length; i++) {
						let result = { label: responseJson.categories[i].name, value: responseJson.categories[i].id };
						allCategories.push(result);
					}

					setCategoriesList([...categoriesList, ...allCategories]);
				}
			})
			.catch(error => {
				toast.error(error.message);
			});
	}

	const submitForm = e => {
		e.preventDefault();

		let responseOk = false;
		let formData = new FormData();

		if (files && files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				formData.append("img-project" + i, files[i]);
			}
		}

		formData.append("title", value.title);
		formData.append("subtitle", value.subtitle);
		formData.append("description", value.description);
		formData.append("money_needed", parseFloat(value.money_needed));
		formData.append("people_needed", parseInt(value.people_needed));
		formData.append("categories", value.categories);
		formData.append("status", value.status);

		fetch(process.env.BACKEND_URL + "/api/v1/organizations/" + value.organization_id + "/projects/" + id, {
			method: "PUT",
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
								{/* <div className="form-group col-sm-12 col-md-12 py-3 px-0">
									<div className="px-0 textSelectonInput">
										<label className="select-label py-1 ">
											Elige las categorias relacionadas con tu proyecto...
										</label>
										<Select
											defaultValue={value.categories}
											isMulti
											name="categories"
											options={categoriesList}
											onBlur={e => changeHandlerSelect(e)}
											onChange={e => changeHandlerSelect(e)}
											className="ZIndex2 basic-multi-select"
											classNamePrefix="select"
										/>
									</div>
								</div> */}
								<div className="form-row pb-3">
									<div className="form-group col-12 textOnInput">
										<label className="textLabel">Subt??tulo</label>
										<textarea
											className="form-control"
											id="exampleFormControlTextarea1"
											name="subtitle"
											placeholder="Subt??tulo"
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
										<label className="textLabel">Descripci??n</label>
										<textarea
											className="form-control"
											id="exampleFormControlTextarea1"
											name="description"
											placeholder="Descripci??n"
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
										<div className="row mb-3">
											<div className="col-12 mx-auto">
												<p>Imagen actual del proyecto</p>
												<img src={value.featured_image_url} style={{ width: "35%" }} />
											</div>
										</div>
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
												seleccionar archivo
											</label>
										</div>
									</div>
								</div>

								<button type="submit" className="btn button-green btn-md btn-block">
									GUARDAR CAMBIOS
								</button>
							</form>
						</div>
						<Link className="noteHelp p-2" to="/profile">
							Volver al men?? personal
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

EditProject.propTypes = {};
