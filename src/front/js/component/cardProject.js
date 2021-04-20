import React from "react";
import { Link } from "react-router-dom";
import { Card, CardDeck } from "reactstrap";
import image_projects from "../../img/image_projects.png";
import "../../styles/projects.scss";
import PropTypes from "prop-types";

export const CardProject = props => {
	const ClickHandler = () => {
		window.scrollTo(10, 0);
	};

	return (
		<div className="projects">
			<div className="wpo-case-single">
				<div className="wpo-case-item">
					<div className="wpo-case-img">
						<img src={image_projects} alt="" />
					</div>
					<div className="wpo-case-content">
						<div className="wpo-case-text-top">
							<h2>{props.title}</h2>
							<div className="progress-section">
								<div className="process">
									<div className="progress">
										<div className="progress-bar">
											<div className="progress-value">
												<span>80.5</span>%
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
							</ul>
						</div>
						<div className="case-btn">
							<ul>
								<li>
									<Link onClick={ClickHandler} to={"/projects/" + props.id}>
										Learn More
									</Link>
								</li>
								<li>
									<Link onClick={ClickHandler} to="/">
										Donate Now
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

CardProject.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	money_needed: PropTypes.number,
	people_needed: PropTypes.number,
	id: PropTypes.number
};
