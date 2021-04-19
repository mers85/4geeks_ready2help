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
												Description
											</NavLink>
										</NavItem>
										<NavItem>
											<NavLink
												className={classnames({ active: activeTab === "2" })}
												onClick={() => {
													toggle("2");
												}}>
												Donations
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
															<ul>
																<li>
																	<span>Raised:</span> $7,000.00
																</li>
																<li>
																	<span>Goal:</span> $8,000.00
																</li>
																<li>
																	<span>Donar:</span> 380
																</li>
															</ul>
															<div className="case-b-text">
																<p>
																	On the other hand, we denounce with righteous
																	indignation and dislike men who are so beguiled and
																	demoralized by the charms of pleasure of the moment,
																	so blinded by desire, that they cannot foresee the
																	pain and trouble that are bound to ensue and equal
																	blame belongs to those who fail in their duty
																	through weakness of will, which is the same as
																	saying through shrinking from toil and pain.
																</p>
																<p>
																	These cases are perfectly simple and easy to
																	distinguish. In a free hour, when our power of
																	choice is untrammelled and when nothing prevents our
																	being able to do what we like best, every pleasure
																	is to be welcomed and every pain avoided.
																</p>
																<p>
																	But in certain circumstances and owing to the claims
																	of duty or the obligations of business it will
																	frequently occur that pleasures have to be
																	repudiated and annoyances accepted. The wise man
																	therefore always holds in these matters to this
																	principle of selection: he rejects pleasures.
																</p>
															</div>
															<div className="case-bb-text">
																<h3>We want to ensure the education for the kids.</h3>
																<p>
																	These cases are perfectly simple and easy to
																	distinguish. In a free hour, when our power of
																	choice is untrammelled and when nothing prevents our
																	being able to do what we like best, every pleasure.
																</p>
																<ul>
																	<li>
																		The wise man therefore always holds in these
																		matters.
																	</li>
																	<li>
																		In a free hour, when our power of choice and
																		when nothing.
																	</li>
																	<li>Else he endures pains to avoid worse pains.</li>
																	<li>
																		We denounce with righteous indignation and
																		dislike men.{" "}
																	</li>
																	<li>Which is the same as saying through.</li>
																</ul>
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
