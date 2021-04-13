import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";

import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

import "../../styles/formularioBase.scss";

export const RegisterOrganization = props => {
	const history = useHistory();
	const { actions } = useContext(Context);

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
					responseOk = response.ok;
					if (response.ok) {
						if (response.status === 201) {
							toast.success("¡Organización registrada!");
							history.push("/profile");
						}
					}
					return response.json();
				})
				.then(responseJson => {
					console.log(responseJson);
					if (!responseOk) {
						toast.error(responseJson.message);
					}
				})
				.catch(error => {
					console.log("error", error);
					toast.error(error.message);
				});
		}
		return false;
	};

	return (
		<Grid className="projectWrapper">
			<Grid className="projectForm">
				<h2>Datos de la organización</h2>
				<p>Crea tu organización para que puedas dar de alta tus proyectos</p>
				<form onSubmit={submitForm}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								className="inputOutline"
								fullWidth
								placeholder="Nombre"
								value={value.name}
								variant="outlined"
								name="name"
								type="text"
								label="Nombre"
								InputLabelProps={{
									shrink: true
								}}
								onBlur={e => changeHandler(e)}
								onChange={e => changeHandler(e)}
							/>
							{validator.message("Name", value.name, "required:name")}
						</Grid>
						<Grid item xs={12}>
							<TextField
								className="inputOutline"
								fullWidth
								placeholder="Dirección"
								value={value.address}
								variant="outlined"
								name="address"
								type="text"
								label="Dirección"
								InputLabelProps={{
									shrink: true
								}}
								onBlur={e => changeHandler(e)}
								onChange={e => changeHandler(e)}
							/>
							{validator.message("address", value.name, "required:address")}
						</Grid>
						<Grid item xs={6}>
							<TextField
								className="inputOutline"
								fullWidth
								placeholder="Código Postal"
								value={value.zipcode}
								variant="outlined"
								name="zipcode"
								type="text"
								label="Código Postal"
								InputLabelProps={{
									shrink: true
								}}
								onBlur={e => changeHandler(e)}
								onChange={e => changeHandler(e)}
							/>
							{validator.message("zipcode", value.name, "required:zipcode")}
						</Grid>
						<Grid item xs={6}>
							<TextField
								className="inputOutline"
								fullWidth
								placeholder="Email de contacto"
								value={value.email}
								variant="outlined"
								name="email"
								label="Email de contacto"
								InputLabelProps={{
									shrink: true
								}}
								onBlur={e => changeHandler(e)}
								onChange={e => changeHandler(e)}
							/>
							{validator.message("email", value.name, "required:email")}
						</Grid>
						<Grid item xs={6}>
							<TextField
								className="inputOutline"
								fullWidth
								placeholder="Teléfono"
								value={value.phone}
								variant="outlined"
								name="phone"
								type="text"
								label="Teléfono"
								InputLabelProps={{
									shrink: true
								}}
								onBlur={e => changeHandler(e)}
								onChange={e => changeHandler(e)}
							/>
							{validator.message("phone", value.name, "required:phone")}
						</Grid>
						<Grid item xs={12}>
							<Grid className="formFooter">
								<Button fullWidth className="cBtnTheme" type="submit">
									Crear organización
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</Grid>
	);
};
