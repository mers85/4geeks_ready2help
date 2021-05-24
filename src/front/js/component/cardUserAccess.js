import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Card, CardDeck } from "reactstrap";
import image_projects from "../../img/hands_01.jpg";
import { CircleProgress } from "./circleProgress";
import { ProgressBar } from "./progressBar";

import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";

import "../../styles/profile.scss";

export const CardUserAccess = props => {
	return (
		<div className="profile card shadow border-0 avatar-container">
			<div className="card-up bg-card-password"></div>
			<div className="avatar mx-auto image img-thumbnail rounded-circle text-center">
				<i className="fas fa-user-secret fa-5x text-muted p-3"></i>
			</div>

			<div className="card-body text-center">
				<h6 className="card-title text-center">Datos de acceso</h6>
				<small className="card-text">¿Cambiar contraseña?</small>
				<p className="card-text text-justify pt-2">
					Desde aquí puedes acceder para cambiar tu contraseña Ready2Help
				</p>
				<p className="card-text text-justify pb-2">
					<i className="fas fa-envelope fa-1x mr-2"></i> {props.userEmail}
				</p>
			</div>

			<Link
				className="col-12 px-0 border border-light py-2 footer bg-white btn btn-outline-lg-light rounded-0 text-muted text-center"
				to={props.recuperarPasswordPath}>
				Cambiar contraseña
			</Link>
		</div>
	);
};

CardUserAccess.propTypes = {
	userEmail: PropTypes.string,
	recuperarPasswordPath: PropTypes.string
};
