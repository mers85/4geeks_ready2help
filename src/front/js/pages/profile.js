import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { DashboardOrganization } from "./dashboardOrganization";
import Button from "@material-ui/core/Button";

export const Profile = () => {
	const [email, setEmail] = useState("");
	const [organization, setOrganization] = useState("");
	const [person, setPerson] = useState("");
	const [error, setError] = useState("");
	const { actions, store } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		let accessToken = actions.getAccessToken();
		if (!accessToken) {
			history.push("/login");
			return;
		}
		let responseOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/profile", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			}
		})
			.then(response => {
				responseOk = response.ok;
				return response.json();
			})
			.then(responseJson => {
				if (responseOk) {
					if (responseJson.user.email) {
						setEmail(responseJson.user.email);
					}
					if (responseJson.user.organization) {
						setOrganization(responseJson.user.organization);
					} else if (responseJson.user.person) {
						setPerson(responseJson.user.person);
					}
				}
			});
	}, []);

	return (
		<div>
			<div className="jumbotron">
				<h4>Mi perfil</h4>
				{error ? <h3>{error}</h3> : ""}
				<div>Email: {email}</div>
				{organization ? (
					<div> Organización: {organization.name} </div>
				) : (
					<Link to="/register_org">
						<Button className="cBtnTheme py-1">Añade tu Organización</Button>
					</Link>
				)}
				{person ? (
					<div> Voluntario: {person.name} </div>
				) : (
					<Link to="/register_pers">
						<Button className="cBtnTheme py-1 mx-1">Añade tus datos personales</Button>
					</Link>
				)}
			</div>
			{organization ? <DashboardOrganization organization={organization} /> : ""}
		</div>
	);
};
