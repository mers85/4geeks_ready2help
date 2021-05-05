import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { LogIn } from "./login";
import { Volunteer } from "../component/volunteer";
import { ProgressBar } from "../component/progressBar";

import imgPrincipal from "../../img/hands_01.jpg";
import "../../styles/showproject.scss";

export const ShowProject = props => {
	let { id } = useParams();
	const { actions } = useContext(Context);
	const [project, setProject] = useState("");
	const [recaudado, setRecaudado] = useState("");
	const [isVolunteer, setIsVolunteer] = useState("");

	const [activeTab, setActiveTab] = useState("1");
	const toggle = tab => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	function isVolunteerInThisProject(project) {
		if (project && project.volunteers) {
			let volunteers = project.volunteers;
			for (let i = 0; i < volunteers.length; i++) {
				if (volunteers[i]["id"] == actions.getUserId()) {
					setIsVolunteer(true);
				} else {
					setIsVolunteer(false);
				}
			}
		}
	}

	useEffect(() => {
		let responseOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/projects/" + id, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				responseOk = response.ok;
				return response.json();
			})
			.then(responseJson => {
				if (responseOk) {
					setProject(responseJson.project);
					isVolunteerInThisProject(responseJson.project);
				} else {
					toast.error(responseJson.message);
				}
			})
			.catch(error => {
				toast.error(error.message);
			});
	}, []);

	return (
		<div className="show-project">
			<div className="wpo-case-details-area section-padding">
				<div className="container mx-auto">
					<div className="row">
						<div className="col col-lg-10">
							<div className="wpo-case-details-wrap">
								<div className="wpo-case-details-img">
									<img src={imgPrincipal} alt="" />
								</div>
								<div className="wpo-case-details-tab">
									<Nav tabs>
										<NavItem>
											<NavLink
												className={classnames({ active: activeTab === "1" })}
												onClick={() => {
													toggle("1");
												}}>
												Descripción
											</NavLink>
										</NavItem>
										<NavItem>
											<NavLink
												className={classnames({ active: activeTab === "2" })}
												onClick={() => {
													toggle("2");
												}}>
												Donar
											</NavLink>
										</NavItem>
										<NavItem>
											{(project && project.people_needed == 0) ||
											(project && project.volunteers_stats["completed"]) ? (
												""
											) : (
												<NavLink
													className={classnames({ active: activeTab === "3" })}
													onClick={() => {
														toggle("3");
													}}>
													Voluntario
												</NavLink>
											)}
										</NavItem>
									</Nav>
								</div>
								<div className="wpo-case-details-text">
									{project ? (
										<TabContent activeTab={activeTab}>
											<TabPane tabId="1">
												<div className="row">
													<div className="col-12">
														<div className="wpo-case-content">
															<div className="wpo-case-text-top">
																<h2>{project.title}</h2>
																<ProgressBar
																	total_donated={35000}
																	money_needed={project.money_needed}
																/>
																<div className="case-bb-text py-3">
																	<h5>{project.subtitle}</h5>
																	<p>{project.description}</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											</TabPane>
											<TabPane tabId="2">
												<div className="text-center display-4 bg-light">coming soon...</div>
											</TabPane>
											<TabPane tabId="3">
												<div className="text-center display-4 bg-light py-4">
													{actions.isLogIn() ? (
														<Volunteer project={project} isVolunteer={isVolunteer} />
													) : (
														<button className="btn my-2 btn-rounded cBtnTheme btn-lg btn-floating">
															<Link
																className="text-white"
																to={"/login?successpath=/projects/" + project.id}>
																Inicia sesión para poder participar
															</Link>
														</button>
													)}
												</div>
											</TabPane>
										</TabContent>
									) : (
										<div>Cargando project...</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
