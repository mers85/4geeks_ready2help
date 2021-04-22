import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { LogIn } from "./login";
import { Volunteer } from "../component/volunteer";

import imgPrincipal from "../../img/hands_01.jpg";
import "../../styles/showproject.scss";

export const ShowProject = props => {
	let { id } = useParams();
	const { actions } = useContext(Context);
	const [project, setProject] = useState("");
	const [recaudado, setRecaudado] = useState("");
	const [progressbarMoney, setProgressBarMoney] = useState("");
	const [progressBarColor, setProgressBarColor] = useState("");
	const [isVolunteer, setIsVolunteer] = useState("");

	const [activeTab, setActiveTab] = useState("1");
	const toggle = tab => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	function myProgressBar(money_needed) {
		let money_recaudado = 35000;
		let percent = (money_recaudado * 100) / money_needed;
		Math.round(percent);
		setProgressBarMoney(percent);
		let widthPorcentaje = percent + "%";
		setProgressBarColor(widthPorcentaje);
	}

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
					myProgressBar(responseJson.project.money_needed);
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
											<NavLink
												className={classnames({ active: activeTab === "3" })}
												onClick={() => {
													toggle("3");
												}}>
												Voluntario
											</NavLink>
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
																<div className="progress-section">
																	<div className="process">
																		<div className="progress">
																			<div
																				className="progress-bar"
																				style={{ width: progressBarColor }}>
																				<div className="progress-value">
																					<span>{progressbarMoney}</span>%
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<ul className="mb-3">
																	<li>
																		<span>Recaudado:</span> {35000}{" "}
																		<i className="fas fa-euro-sign text-secondary fa-1x"></i>
																	</li>
																	<li>
																		<span>Objetivo:</span> {project.money_needed}{" "}
																		<i className="fas fa-euro-sign text-secondary fa-1x"></i>
																	</li>
																</ul>
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
												{actions.isLogIn() ? (
													<div className="text-center display-4 bg-light">
														<Volunteer project={project} isVolunteer={isVolunteer} />
													</div>
												) : (
													<LogIn path={"/projects/" + project.id} />
												)}
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
