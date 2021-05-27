import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory, useParams } from "react-router-dom";

import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

import "../../styles/formularioBase2.scss";
import { LogIn } from "./login";

export const CreateProject = props => {
	const history = useHistory();
	let { id } = useParams();
	const { actions } = useContext(Context);
	const [myCategories, setMyCategories] = useState([]);

	const [value, setValue] = useState({
		title: "",
		subtitle: "",
		description: "",
		money_needed: "",
		people_needed: "",
		status: "",
		categories: [],
		organization_id: ""
	});

	const changeHandler = e => {
		setValue({ ...value, [e.target.name]: e.target.value });
		validator.showMessages();
	};
	const changeHandlerSelect = e => {
		let selectCategory = [];
		let allCategories = e;

		for (let i = 0; i < allCategories.length; i++) {
			selectCategory.push(allCategories[i].value);
		}
		setValue({ ...value, categories: [...value.categories, ...selectCategory] });
	};

	const [validator] = React.useState(
		new SimpleReactValidator({
			className: "errorMessage"
		})
	);

	useEffect(() => {
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
					setMyCategories([...myCategories, ...allCategories]);
				}
			})
			.catch(error => {
				toast.error(error.message);
			});
	}, []);

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
				categories: [],
				organization_id: ""
			});
			validator.hideMessages();

			if (value.title) {
				let responseOk = false;
				id ? id : (id = props.wizardId);
				fetch(process.env.BACKEND_URL + "/api/v1/organizations/" + id + "/projects", {
					method: "POST",
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
						status: value.status,
						categories: value.categories,
						organization_id: id ? id : props.wizardId
					})
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
								<div className="form-group col-sm-12 col-md-12 py-3 px-0">
									<div className="textOnInput px-0">
										<label className="textLabel">
											Elige las categorias relacionadas con tu proyecto..
										</label>

										<Select
											defaultValue={value.categories}
											isMulti
											name="categories"
											options={myCategories}
											onBlur={e => changeHandlerSelect(e)}
											onChange={e => changeHandlerSelect(e)}
											className="basic-multi-select"
											classNamePrefix="select"
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
									{/* <div className="form-group col-sm-12 col-md-4 textOnInput pb-3">
										<label className="textLabel">Selecciona tu compromiso social</label>
										<select
											className="form-control"
											placeholder="Categorias"
											name="categories"
											onBlur={e => changeHandler(e)}
											onChange={e => changeHandler(e)}>
											{myCategories.map(category => (
												<option key={category.id} value={category.id}>
													{category.name}
												</option>
											))}
										</select>
									</div> */}
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
