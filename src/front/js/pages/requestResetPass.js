import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";

export const RequestResetPass = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const history = useHistory();

	function requestResetPass() {
		setError("");
		switch (true) {
			case email.trim() == "":
				setError("Email field must be informed.");
				return;
			default:
				break;
		}
		let responseOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/request_reset_pass", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
			.then(response => {
				responseOk = response.ok;
				if (responseOk) {
					if (response.status === 201) {
						setMessage("The request was generated correctly");
					}
				}
				return response.json();
			})
			.then(responseJson => {
				if (responseOk) {
					history.push("/");
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
			<form>
				<input
					type="email"
					placeholder="Enter your email"
					onChange={event => {
						setEmail(event.target.value);
					}}
				/>
				<input type="button" value="Recuperar" onClick={requestResetPass} />
			</form>
		</div>
	);
};
