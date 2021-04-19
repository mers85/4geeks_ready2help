import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import imgPrincipal from "../../img/hands_01.jpg";

import "../../styles/showproject.scss";

export const ShowProject = props => {
	const SubmitHandler = e => {
		e.preventDefault();
	};

	const [activeTab, setActiveTab] = useState("1");

	const toggle = tab => {
		if (activeTab !== tab) setActiveTab(tab);
	};

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
									</Nav>
								</div>
								<div className="wpo-case-details-text">
									<TabContent activeTab={activeTab}>
										<TabPane tabId="1">
											<div className="row">
												<div className="col-12">
													<div className="wpo-case-content">
														<div className="wpo-case-text-top">
															<h2>Ensure Education for every poor children</h2>
															<div className="progress-section">
																<div className="process">
																	<div className="progress">
																		<div className="progress-bar">
																			<div className="progress-value">
																				<span>65.5</span>%
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<ul className="mb-3">
																<li>
																	<span>Recaudado:</span> 7,000.00{" "}
																	<i className="fas fa-euro-sign text-secondary fa-1x"></i>
																</li>
																<li>
																	<span>Objetivo:</span> 8,000.00{" "}
																	<i className="fas fa-euro-sign text-secondary fa-1x"></i>
																</li>
															</ul>
															<div className="case-bb-text py-3">
																<h3>We want to ensure the education for the kids.</h3>
																<p>
																	These cases are perfectly simple and easy to
																	distinguish. In a free hour, when our power of
																	choice is untrammelled and when nothing prevents our
																	being able to do what we like best, every pleasure.
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</TabPane>
										<TabPane tabId="2">
											<div className="text-center bg-light">
												Renderizar componente para donaciones
											</div>
										</TabPane>
									</TabContent>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
