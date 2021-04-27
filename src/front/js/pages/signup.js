import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import queryString from "query-string";

//validacines y notificaciones
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";

//vistas
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "../../styles/signup.scss";

export const SignUp = props => {
	const history = useHistory();
	const url = window.location.search;
	let params = queryString.parse(url);

	const [value, setValue] = useState({
		email: "",
		password: "",
		confirm_password: ""
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

	function redirectToMyPath() {
		if (params.successpath) {
			history.push(params.successpath);
		} else {
			history.push("/login");
		}
	}

	const submitForm = e => {
		e.preventDefault();
		if (validator.allValid()) {
			let responseOk = false;
			fetch(process.env.BACKEND_URL + "/api/v1/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: value.email,
					password: value.password
				})
			})
				.then(response => {
					responseOk = response.ok;
					if (response.ok) {
						if (response.status === 201) {
							setValue({
								email: "",
								password: "",
								confirm_password: ""
							});
							validator.hideMessages();
							toast.success("Usuario registrado correctamente");
							redirectToMyPath();
						} else if (response.status === 202) {
							toast.warn("Este usuario ya se encuentra registrado");
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
		} else {
			validator.showMessages();
			toast.error("Empty field is not allowed!");
		}
	};

	return (
		<Grid className="loginWrapper">
			<Grid className="loginForm">
				<h2>Signup</h2>
				<p>Signup your account</p>
				<form onSubmit={submitForm}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								className="inputOutline"
								fullWidth
								placeholder="E-mail"
								value={value.email}
								variant="outlined"
								name="email"
								label="E-mail"
								InputLabelProps={{
									shrink: true
								}}
								onBlur={e => changeHandler(e)}
								onChange={e => changeHandler(e)}
							/>
							{validator.message("email", value.email, "required|email")}
						</Grid>
						<Grid item xs={12}>
							<TextField
								className="inputOutline"
								fullWidth
								placeholder="Password"
								value={value.password}
								variant="outlined"
								name="password"
								label="Password"
								InputLabelProps={{
									shrink: true
								}}
								onBlur={e => changeHandler(e)}
								onChange={e => changeHandler(e)}
							/>
							{validator.message("password", value.password, "required")}
						</Grid>
						<Grid item xs={12}>
							<TextField
								className="inputOutline"
								fullWidth
								placeholder="Confirm Password"
								value={value.password}
								variant="outlined"
								name="confirm_password"
								label="Confirm Password"
								InputLabelProps={{
									shrink: true
								}}
								onBlur={e => changeHandler(e)}
								onChange={e => changeHandler(e)}
							/>
							{validator.message("confirm password", value.confirm_password, `in:${value.password}`)}
						</Grid>
						<Grid item xs={12}>
							<Grid className="formFooter">
								<Button fullWidth className="cBtn cBtnLarge cBtnTheme" type="submit">
									Sign Up
								</Button>
							</Grid>

							<p className="noteHelp">
								Already have an account? <Link to="/login">Return to Login In</Link>
							</p>
							<p className="noteHelp">
								<Link to="/">ir a la página principal</Link>
							</p>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</Grid>
	);
};
