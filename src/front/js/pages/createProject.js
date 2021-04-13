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

import "../../styles/formularioBase.scss";

export const CreateProject = props => {
	const history = useHistory();
	let { id } = useParams();
	const { actions } = useContext(Context);

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
				let responseOk = false;
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
						organization_id: id
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
		<Grid className="projectWrapper">
			<Grid className="projectForm">
				<h2>Crear proyecto</h2>
				<p>
					Puedes dar de alta tu proyecto solo con el nombre y luego ir a tu panel de administración y
					completar los datos antes de hacerlo público
				</p>
				<form onSubmit={submitForm}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								className="inputOutline"
								fullWidth
								placeholder="Nombre del proyecto"
								value={value.title}
								variant="outlined"
								name="title"
								label="Nombre del proyecto"
								InputLabelProps={{
									shrink: true
								}}
								onBlur={e => changeHandler(e)}
								onChange={e => changeHandler(e)}
							/>
							{validator.message("Nombre del proyecto", value.title, "required:title")}
						</Grid>
						<Grid item xs={12}>
							<TextField
								className="inputOutline"
								fullWidth
								multiline
								rows={2}
								rowsMax={6}
								placeholder="Subtítulo"
								value={value.subtitle}
								variant="outlined"
								name="subtitle"
								type="text"
								label="Subtítulo"
								InputLabelProps={{
									shrink: true
								}}
								onBlur={e => changeHandler(e)}
								onChange={e => changeHandler(e)}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								className="inputOutline"
								fullWidth
								placeholder="Dinero"
								value={value.money_needed}
								variant="outlined"
								name="money_needed"
								type="text"
								label="Dinero"
								InputLabelProps={{
									shrink: true
								}}
								onBlur={e => changeHandler(e)}
								onChange={e => changeHandler(e)}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								className="inputOutline"
								fullWidth
								placeholder="Voluntarios"
								value={value.people_needed}
								variant="outlined"
								name="people_needed"
								type="text"
								label="Voluntarios"
								InputLabelProps={{
									shrink: true
								}}
								onBlur={e => changeHandler(e)}
								onChange={e => changeHandler(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextareaAutosize
								rowsMin={4}
								className="textAreaOutline"
								style={{ width: "100%" }}
								fullWidth
								placeholder="Descripción"
								value={value.description}
								variant="outlined"
								name="description"
								type="text"
								label="Descripción"
								InputLabelProps={{
									shrink: true
								}}
								onBlur={e => changeHandler(e)}
								onChange={e => changeHandler(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Grid className="formFooter">
								<Button fullWidth className="cBtnTheme" type="submit">
									Crear Proyecto
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</Grid>
	);
};

CreateProject.propTypes = {
	id: PropTypes.object
};
