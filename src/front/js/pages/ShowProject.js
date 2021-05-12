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
import { Donate } from "./donate";
import { WizardCreateDonation } from "./wizardCreateDonation";
import { CircleProgress } from "../component/circleProgress";
import Spinner from "../component/spinner";

import imgPrincipal from "../../img/hands_01.jpg";
import "../../styles/showproject.scss";
import "../../styles/volunteer.scss";

export const ShowProject = props => {
	let { id } = useParams();
	const { actions } = useContext(Context);
	const [project, setProject] = useState("");
	const [recaudado, setRecaudado] = useState("");
	const [isVolunteer, setIsVolunteer] = useState(false);

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
						<div className="col col-lg-10 mx-auto">
							<div className="wpo-case-details-wrap">
								<div className="wpo-case-details-img">
									<img
										className="img-fluid img-thumbnail"
										src={imgPrincipal}
										style={{ width: "100" }}
										alt=""
									/>
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
											{project && project.money_needed > 0 ? (
												<NavLink
													className={classnames({ active: activeTab === "2" })}
													onClick={() => {
														toggle("2");
													}}>
													Donar
												</NavLink>
											) : (
												""
											)}
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
																	total_donated={project.total_donated}
																	money_needed={project.money_needed}
																/>
																{project.people_needed > 0 ? (
																	<div className="volunteer row d-flex justify-content-between py-4">
																		{isVolunteer ? (
																			<div className="col-sm-12 col-md my-3">
																				<div className="card py-4">
																					<div className="card-body">
																						<h6>
																							Gracias por ser voluntario
																							de este proyecto!
																						</h6>
																					</div>
																				</div>
																			</div>
																		) : (
																			<div className="col-sm-12 col-md my-3 d-none d-smn-one d-md-none d-lg-block">
																				<div className="card py-4">
																					<div className="card-body">
																						<h6>
																							Únete!! Nos encantaría
																							contar con tu apoyo
																						</h6>
																					</div>
																				</div>
																			</div>
																		)}
																		<div className="col-sm d-lg-flex justify-content-lg-end">
																			<CircleProgress
																				volunteers_stats={
																					project.volunteers_stats
																				}
																			/>
																		</div>
																	</div>
																) : (
																	""
																)}
																<div className="case-bb-text py-3 mt-3 text-justify">
																	<h5>{project.subtitle}</h5>
																	<p>{project.description}</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											</TabPane>
											<TabPane tabId="2">
												<div className="text-center">
													{actions.isLogIn() ? (
														<WizardCreateDonation />
													) : (
														<button className="btn my-2 btn-rounded cBtnTheme btn-lg btn-floating">
															<Link
																className="text-white"
																to={"/login?successpath=/projects/" + project.id}>
																Inicia sesión para poder realizar la donación
															</Link>
														</button>
													)}
												</div>
											</TabPane>
											<TabPane tabId="3">
												<div className="text-center display-4 py-4">
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
										<div className="row ">
											<div className="col-12 d-flex justify-content-center">
												<Spinner />
											</div>
										</div>
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
