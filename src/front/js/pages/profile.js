import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export const Profile = () => {
	const [email, setEmail] = useState("");
	const [organization, setOrganization] = useState("");
	const [error, setError] = useState("");
	const { actions, store } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		let accessToken = actions.getAccessToken();
		if (!accessToken) {
			history.push("/login");
			return;
		}
		fetch(process.env.BACKEND_URL + "/api/v1/profile", {
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
				setOrganization(responseJson.user.organization_id);
			});
	}, []);

	return (
		<div className="jumbotron">
			{error ? <h3>{error}</h3> : ""}
			<div>Email: {email}</div>
			{organization ? <div> Organization: {organization} </div> : ""}
			<Link to="/register_org">
				<span className="navbar-brand mb-0 h1">Alta por Organización</span>
			</Link>
		</div>
	);
};
