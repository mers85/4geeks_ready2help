import React, { useState } from "react";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";

import "../../styles/projects2.scss";

export const ProgressBar = props => {
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
		<div className="bar-progress-green">
			<div className="progress-section pt-4 mt-3 mb-md-3">
				<div className="process">
					<div className="progress">
						{console.log(Math.round(percent(props.total_donated, props.money_needed)).toString())}
						<div
							className="progress-bar"
							role="progressbar"
							style={{ width: Math.round(percent(props.total_donated, props.money_needed)).toString() }}
							aria-valuenow={Math.round(percent(props.total_donated, props.money_needed)).toString()}
							aria-valuemin="0"
							aria-valuemax="100">
							<div className="progress-value">
								<span>{percent(props.total_donated, props.money_needed)}</span> %
							</div>
						</div>
					</div>
				</div>
			</div>
			<ul className="d-flex justify-content-between list-unstyled">
				<li className="mr-2">
					<span>Recaudado:</span>
					<br />${number_format(props.total_donated, 2)}
				</li>

				<li className="ml-2">
					<span>Objetivo:</span>
					<br />${number_format(props.money_needed, 2)}
				</li>
			</ul>
		</div>
	);
};

ProgressBar.propTypes = {
	total_donated: PropTypes.number,
	money_needed: PropTypes.number
};
