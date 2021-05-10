import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { toast } from "react-toastify";

import "../../styles/profile.scss";

export const CardUserDetails = props => {
	return (
		<div className="profile card shadow border-0 avatar-container ">
			<div className="card-up aqua-gradient"></div>
			<img src={props.image} className="avatar mx-auto image img-fluid img-thumbnail rounded-circle" alt="..." />

			{props.userDetails ? (
				<div className="card-body">
					<h6 className="card-title text-center">Datos de perfil</h6>
					<p className="card-text">
						<i className="fas fa-user text-muted fa-1x mr-2"></i>{" "}
						{props.userDetails.name + " " + props.userDetails.lastname}
					</p>
					<p className="card-text">
						<i className="fas fa-map-marked-alt text-muted fa-1x mr-2"></i> {props.userDetails.address}
					</p>
					<p className="card-text">
						<i className="fas fa-phone-volume text-muted fa-1x mr-2"></i> {props.userDetails.phone}
					</p>
				</div>
			) : (
				<div className="card-body text-center">
					<h6 className="card-title text-center">Datos de perfil</h6>
					<small className="card-text text-justify text-center">Completa tus datos</small>
					<p className="card-text text-justify py-3">
						La información de este apartado es necesaria para contactarte en caso de que quieras participar
						como voluntario y realizar donaciones
					</p>
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
	);
};

CardUserDetails.propTypes = {
	image: PropTypes.string,
	userDetails: PropTypes.object,
	userEmail: PropTypes.string,
	editPath: PropTypes.string,
	resgisterDetailsPath: PropTypes.string
};
