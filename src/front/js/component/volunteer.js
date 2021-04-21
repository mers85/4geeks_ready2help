import React from "react";
import { Link } from "react-router-dom";
import { Card, CardDeck } from "reactstrap";

import PropTypes from "prop-types";

import "../../styles/volunteer.scss";

export const Volunteer = props => {
	return (
		<div className="volunteer">
			<div className="row">
				<div className="col-12 bg-white">
					<div className="card">
						<div className="card-body">
							<h3 className="card-title">¡ Gracias por ser Ubuntu!</h3>
							<blockquote className="blockquote p-2 m-2">
								<p className="mb-0 mx-2">
									Una persona con ubuntu es abierta y está disponible para las demás, respalda a las
									demás, no se siente amenazada cuando otras son capaces y son buenas en algo, porque
									está segura de sí misma ya que sabe que pertenece a una gran totalidad, que se
									decrece cuando otras personas son humilladas o menospreciadas, cuando otras son
									torturadas u oprimidas.
								</p>

								<footer className="blockquote-footer">
									<cite title="Source Title">Desmond Tutu</cite>
								</footer>
							</blockquote>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
