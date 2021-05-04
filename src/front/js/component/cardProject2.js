import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Card, CardDeck } from "reactstrap";
import image_projects from "../../img/image_projects.png";
import { CircleProgress } from "./circleProgress";

import "../../styles/projects2.scss";
import "../../styles/circleProgressBar.scss";

export const CardProject2 = props => {
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
		<div className="card projects border-0 shadow">
			<img src={image_projects} alt="" />
			<div className="card-body">
				<h2 className="card-title">{props.title}</h2>
				<p className="card-subtitle">{props.subtitle}</p>
				<div className="card-text"></div>
			</div>
			<div className="card-footer bg-white btn-group btn-group-lg d-inline-flex p-0">
				<Link className="btn rounded-0 text-dark" onClick={ClickHandler} to={"/projects/" + props.id}>
					Detalle
				</Link>
				<Link
					className="btn bg-blue-light-gradient rounded-0"
					onClick={ClickHandler}
					to={"/projects/" + props.id + "/donate"}>
					Donar
				</Link>
			</div>
		</div>
	);
};

CardProject2.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	description: PropTypes.string,
	money_needed: PropTypes.number,
	people_needed: PropTypes.number,
	total_donated: PropTypes.number,
	id: PropTypes.number,
	volunteers_stats: PropTypes.object
};
