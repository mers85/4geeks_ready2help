import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { DashboardOrganization } from "./dashboardOrganization";
import { MyActivities } from "./myActivities";
import FixedAlert from "../component/fixedAlert";
import { CardUserDetails } from "../component/cardUserDetails";

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import classnames from "classnames";

import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/profile.scss";
import { CardUserAccess } from "../component/cardUserAccess";

export const Profile2 = () => {
	const [email, setEmail] = useState("");
	const [organization, setOrganization] = useState("");
	const [person, setPerson] = useState("");
	const [user, setUser] = useState("");
	const [volunteeringProjects, setVolunteeringProjects] = useState([]);
	const [error, setError] = useState("");
	const { actions, store } = useContext(Context);
	const history = useHistory();

	const [activeTab, setActiveTab] = useState("1");

	const toggle = tab => {
		if (activeTab !== tab) setActiveTab(tab);
	};

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
		<div className="container">
			{/* <div className="row py-5 my-5 mx-auto">
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
			</div> */}
			<Nav tabs className="py-2 mt-3 justify-content-center">
				<NavItem className="border border-light mx-1">
					<NavLink
						className={classnames({ active: activeTab === "1" })}
						onClick={() => {
							toggle("1");
						}}>
						Editar perfil
					</NavLink>
				</NavItem>
				<NavItem className="border border-light mx-1">
					<NavLink
						className={classnames({ active: activeTab === "2" })}
						onClick={() => {
							toggle("2");
						}}>
						Organización
					</NavLink>
				</NavItem>
				<NavItem className="border border-light mx-1">
					<NavLink
						className={classnames({ active: activeTab === "3" })}
						onClick={() => {
							toggle("3");
						}}>
						Actividades
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={activeTab}>
				<TabPane tabId="1">
					<div className="row">
						<div className="col-lg-6 col-sm-12 py-2 my-2">
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
						</div>
						<div className="col-lg-6 col-sm-12 py-2 my-2">
							<CardUserAccess userEmail={user.email} recuperarPasswordPath={"/request_reset_pass"} />
						</div>
					</div>
				</TabPane>
				<TabPane tabId="2">
					<Row>
						<Col sm="6">
							<Card body>
								<CardTitle>Special Title Treatment</CardTitle>
								<CardText>
									With supporting text below as a natural lead-in to additional content.
								</CardText>
								<Button>Go somewhere</Button>
							</Card>
						</Col>
						<Col sm="6">
							<Card body>
								<CardTitle>Special Title Treatment</CardTitle>
								<CardText>
									With supporting text below as a natural lead-in to additional content.
								</CardText>
								<Button>Go somewhere</Button>
							</Card>
						</Col>
					</Row>
				</TabPane>
				<TabPane tabId="3">
					<Row>
						<Col sm="12">
							<h4>Actividades</h4>
						</Col>
					</Row>
				</TabPane>
			</TabContent>
		</div>
	);
};
