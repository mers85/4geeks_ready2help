import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const LogIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { actions } = useContext(Context);

	function login() {
		event.preventDefault();
		setError("");
		// if (password != confirmPassword) {
		// 	setError("Las contraseñas no coinciden");
		// 	return;
		// }

		let responseOk = false;
		fetch("https://3001-sapphire-rook-0fjgt9ia.ws-eu03.gitpod.io/api/v1/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
			.then(response => {
				responseOk = response.ok;
				return response.json();
			})
			.then(responseJson => {
				console.log(responseJson);
				if (responseOk) {
					actions.saveAccessToken(responseJson.message);
				} else {
					setError(responseJson.message);
				}
			})
			.catch(error => {
				console.log("error", error);
				setError(error.message);
			});
		return false;
	}

	return (
		<div className="jumbotron">
			{error ? <h3>{error}</h3> : ""}
			<form onSubmit={login}>
				<input
					type="email"
					placeholder="Enter email"
					onChange={event => {
						setEmail(event.target.value);
					}}
				/>
				<input
					type="password"
					placeholder="Enter password"
					onChange={event => {
						setPassword(event.target.value);
					}}
				/>
				<input
					type="password"
					placeholder="Confirm password"
					onChange={event => {
						setConfirmPassword(event.target.value);
					}}
				/>
				<input type="submit" value="acceder" />
			</form>
		</div>
	);
};
