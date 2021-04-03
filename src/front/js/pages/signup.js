import React, { useState } from "react";

export const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	function singup() {
		setError("");
		if (password != confirmPassword) {
			setError("Las contraseñas no coinciden");
			return;
		}

		let responseOk = false;
		fetch("https://3001-sapphire-rook-0fjgt9ia.ws-eu03.gitpod.io/api/v1/signup", {
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
				if (response.ok) {
					if (response.status === 201) {
						setMessage("Usuario registrado correctamente");
					} else if (response.status === 202) {
						setMessage("Este usuario ya se encuentra registrado");
					}
				}
				return response.json();
			})
			.then(responseJson => {
				console.log(responseJson);
				if (!responseOk) {
					setError(responseJson.message);
				}
			})
			.catch(error => {
				console.log("error", error);
				setError(error.message);
			});
	}

	return (
		<div className="jumbotron">
			{error ? <h3>{error}</h3> : ""}
			{message ? <h3>{message}</h3> : ""}
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
			<input type="button" value="Crear" onClick={singup} />
		</div>
	);
};
