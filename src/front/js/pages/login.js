import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory } from "react-router-dom";

import "../../styles/login.scss";
import s1 from "../../img/shape.png";

export const LogIn = props => {
	const history = useHistory();
	const { actions } = useContext(Context);

	const [value, setValue] = useState({
		email: "",
		password: "",
		remember: false
	});

	const changeHandler = e => {
		setValue({ ...value, [e.target.name]: e.target.value });
		validator.showMessages();
	};

	const rememberHandler = () => {
		setValue({ ...value, remember: !value.remember });
	};

	const [validator] = React.useState(
		new SimpleReactValidator({
			className: "errorMessage"
		})
	);

	function redirectToMyPath() {
		if (props.path === "/create_project") {
			if (actions.getUser() && actions.getUser()["roles"].includes("organization")) {
				history.push(props.path);
			} else {
				history.push("/register_org");
				toast.info("Debes registrarte como organización para crear un proyecto");
			}
		} else if (props.path && props.path.includes("/projects/")) {
			history.push(props.path);
		} else {
			history.push("/profile");
		}
	}

	const submitForm = e => {
		e.preventDefault();
		if (validator.allValid()) {
			setValue({
				email: "",
				password: "",
				remember: false
			});
			validator.hideMessages();

			const userRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			const email = value.email;
			if (email.match(userRegex)) {
				let responseOk = false;
				fetch(process.env.BACKEND_URL + "/api/v1/login", {
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
						return response.json();
					})
					.then(responseJson => {
						if (responseOk) {
							let orgID = responseJson.user["organization_id"]
								? responseJson.user["organization_id"]
								: null;
							let personId = responseJson.person ? responseJson.person["id"] : null;

							actions.saveUserDetails(responseJson.token, responseJson.user, personId);

							toast.success("¡Has iniciado sesión con éxito!");
							redirectToMyPath();
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
			toast.error("¡Los campos no pueden estar vacios!");
		}
		return false;
	};

	return (
		<Grid className="loginWrapper">
			<Grid className="loginForm">
				<h2>Log In</h2>
				<p>Inicia sesión en tu cuenta</p>
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
								type="password"
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
							<Grid className="formAction">
								<FormControlLabel
									control={<Checkbox checked={value.remember} onChange={rememberHandler} />}
									label="Remember Me"
								/>
								<Link to="/request_reset_pass">¿Olvidó su contraseña?</Link>
							</Grid>
							<Grid className="formFooter">
								<Button fullWidth className="cBtnTheme" type="submit">
									Login
								</Button>
							</Grid>
							<p className="noteHelp">
								¿Ya tienes un usuario?{" "}
								{props.path == "/create_project" ? (
									<Link to="/signup/create_project">Sign Up</Link>
								) : props.path && props.path.includes("/projects/") ? (
									<Link to={"/signup/projects"}>Sign Up</Link>
								) : (
									<Link to="/signup">Sign Up</Link>
								)}
							</p>
							<p className="noteHelp">
								<Link to={"/"}>ir a la página principal</Link>
							</p>
						</Grid>
					</Grid>
				</form>
				<div className="shape-img">
					<img src={s1} alt="" />
				</div>
			</Grid>
		</Grid>
	);
};

LogIn.propTypes = {
	path: PropTypes.string
};
