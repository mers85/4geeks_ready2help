import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import FixedAlert from "../component/fixedAlert";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SimpleReactValidator from "simple-react-validator";

export const RegisterPerson = props => {
	const { actions, store } = useContext(Context);
	const history = useHistory();

	const [value, setValue] = useState({
		name: "",
		lastname: "",
		email: "",
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
				name: "",
				lastname: "",
				email: "",
				address: "",
				zipcode: "",
				phone: ""
			});
			validator.hideMessages();

			let responseOk = false;
			fetch(process.env.BACKEND_URL + "/api/v1/register_pers", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + actions.getAccessToken()
				},
				body: JSON.stringify({
					name: value.name,
					lastname: value.lastname,
					email: value.email,
					address: value.address,
					zipcode: value.zipcode,
					phone: value.phone
				})
			})
				.then(response => {
					responseOk = response.ok;
					if (response.ok) {
						if (response.status === 201) {
							toast.success("¡Datos complementarios registrados!");
							history.push("/profile");
						}
					}
					return response.json();
				})
				.then(responseJson => {
					console.log(responseJson);

					if (responseOk) {
						actions.addPersonId(responseJson.person.id);
					} else {
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
			<div className="row mx-auto">
				<div className="col-8 mx-auto">
					{props.notification ? <FixedAlert color="info" message={props.notification} /> : ""}
				</div>
				<Grid className="projectForm">
					<h2>Datos Complementarios</h2>
					<p>Completa tu perfil</p>
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
								{validator.message("name", value.name, "required:name")}
							</Grid>
							<Grid item xs={12}>
								<TextField
									className="inputOutline"
									fullWidth
									placeholder="Apellidos"
									value={value.lastname}
									variant="outlined"
									name="lastname"
									type="text"
									label="Apellidos"
									InputLabelProps={{
										shrink: true
									}}
									onBlur={e => changeHandler(e)}
									onChange={e => changeHandler(e)}
								/>
								{validator.message("lastname", value.lastname, "required:lastname")}
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
								{validator.message("address", value.address, "required:address")}
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
								{validator.message("zipcode", value.zipcode, "required:zipcode")}
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
								{validator.message("email", value.email, "required:email")}
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
								{validator.message("phone", value.phone, "required:phone")}
							</Grid>
							<Grid item xs={12}>
								<Grid className="formFooter">
									<Button fullWidth className="cBtnTheme" type="submit">
										Completar Perfil
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</form>
				</Grid>
			</div>
		</Grid>
	);
};
RegisterPerson.propTypes = {
	notification: PropTypes.string
};
