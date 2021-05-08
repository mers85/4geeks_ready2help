import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { DashboardOrganization } from "./dashboardOrganization";
import { MyActivities } from "./myActivities";
import FixedAlert from "../component/fixedAlert";
import { CardUserDetails } from "../component/cardUserDetails";
import Button from "@material-ui/core/Button";

import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/profile.scss";

export const Profile2 = () => {
	const [email, setEmail] = useState("");
	const [organization, setOrganization] = useState("");
	const [person, setPerson] = useState("");
	const [user, setUser] = useState("");
	const [volunteeringProjects, setVolunteeringProjects] = useState([]);
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
					if (responseJson.user) {
						setUser(responseJson.user);
						setEmail(responseJson.user.email);
						setVolunteeringProjects([...responseJson.user.volunteering_projects]);
						if (responseJson.user["details"]) {
							setPerson(responseJson.user["details"]);
						}
					}
					if (responseJson.user.organization) {
						setOrganization(responseJson.user.organization);
					}
				}
			});
	}, []);

	return (
		<div className="container-fluid">
			<div className="row py-5 my-5 mx-auto">
				{!person && volunteeringProjects.length > 0 ? (
					<FixedAlert color="primary" message={"Por favor, completa tu perfil!"} />
				) : (
					""
				)}
				{person ? (
					<CardUserDetails
						image={rigoImageUrl}
						userDetails={person}
						editPath={"/profile/users/" + actions.getUserId() + "/edit_details"}
					/>
				) : (
					<CardUserDetails
						image={rigoImageUrl}
						userEmail={user.email}
						resgisterDetailsPath={"/register_pers"}
					/>
				)}
				{organization ? <DashboardOrganization organization={organization} /> : ""}
			</div>
		</div>
	);
};
