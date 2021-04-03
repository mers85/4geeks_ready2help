import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const Profile = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const { actions, store } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		let accessToken = actions.getAccessToken();
		if (!accessToken) {
			history.push("/login");
			return;
		}
		fetch("https://3001-sapphire-rook-0fjgt9ia.ws-eu03.gitpod.io/api/v1/profile", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			}
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				setEmail(responseJson.user.email);
			});
	}, []);

	return (
		<div className="jumbotron">
			{error ? <h3>{error}</h3> : ""}
			<div>Email: {email}</div>
		</div>
	);
};
