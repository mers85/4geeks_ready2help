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

	function number_format(amount, decimals) {
		amount += ""; // por si pasan un numero en vez de un string
		amount = parseFloat(amount.replace(/[^0-9\.]/g, "")); // elimino cualquier cosa que no sea numero o punto

		decimals = decimals || 0; // por si la variable no fue fue pasada

		// si no es un numero o es igual a cero retorno el mismo cero
		if (isNaN(amount) || amount === 0) return parseFloat(0).toFixed(decimals);

		// si es mayor o menor que cero retorno el valor formateado como numero
		amount = "" + amount.toFixed(decimals);

		var amount_parts = amount.split("."),
			regexp = /(\d+)(\d{3})/;

		while (regexp.test(amount_parts[0])) amount_parts[0] = amount_parts[0].replace(regexp, "$1" + "," + "$2");

		return amount_parts.join(".");
	}

	function percent(raised, goal = 1) {
		let percentage = (raised * 100) / goal;

		let percentage_format = number_format(percentage, 1);

		return percentage_format;
	}

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
												<span>{percent(props.total_donated, props.money_needed)}</span>%
											</div>
										</div>
									</div>
								</div>
							</div>
							<ul>
								<li>
									<span>Raised:</span> ${number_format(props.total_donated, 2)}
								</li>
								<li>
									<span>Goal:</span> ${number_format(props.money_needed, 2)}
								</li>
							</ul>
						</div>
						<div className="case-btn">
							<ul>
								<li>
									<Link onClick={ClickHandler} to="/">
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
	total_donated: PropTypes.number,
	id: PropTypes.number
};
