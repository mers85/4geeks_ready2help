import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Card, CardDeck } from "reactstrap";
import image_projects from "../../img/hands_01.jpg";
import { CircleProgress } from "./circleProgress";
import { ProgressBar } from "./progressBar";

import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";

import "../../styles/projects.scss";
import "../../styles/circleProgressBar.scss";

export const CardUserDetails = props => {
	return (
		<div className="col-sm-12 col-md-6 col-lg-4">
			<div className="card shadow border-0 avatar-container">
				<div className="card-up aqua-gradient"></div>
				<img
					src={props.image}
					className="avatar mx-auto image img-fluid img-thumbnail rounded-circle"
					alt="..."
				/>

				{props.userDetails ? (
					<div className="card-body">
						<h6 className="card-title text-center">
							{props.userDetails.name + " " + props.userDetails.lastname}
						</h6>
						<p className="card-text">
							<i className="fas fa-map-marked-alt text-muted fa-1x mr-2"></i> {props.userDetails.address}
						</p>
						<p className="card-text">
							<i className="fas fa-phone-volume text-muted fa-1x mr-2"></i> {props.userDetails.phone}
						</p>
					</div>
				) : (
					<div className="card-body text-center">
						<h6 className="card-title text-center">{props.userEmail}</h6>
						<p className="card-text">No olvides completar tus datos de perfil</p>
					</div>
				)}

				{props.editPath && !props.resgisterDetailsPath ? (
					<Link
						className="col-12 px-0 border border-light py-2 footer bg-white btn btn-outline-lg-light rounded-0 text-muted text-center"
						to={props.editPath}>
						Editar perfil
					</Link>
				) : (
					<Link
						className="col-12 px-0 border border-light py-2 footer bg-white btn btn-outline-lg-light rounded-0 text-muted text-center"
						to={props.resgisterDetailsPath}>
						Añadir datos de perfil
					</Link>
				)}
			</div>
		</div>
	);
};

CardUserDetails.propTypes = {
	image: PropTypes.string,
	userDetails: PropTypes.object,
	userEmail: PropTypes.object,
	editPath: PropTypes.string,
	resgisterDetailsPath: PropTypes.string
};
