import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory, useParams } from "react-router-dom";

import { Card, CardDeck } from "reactstrap";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";

import PropTypes from "prop-types";

import "../../styles/volunteer.scss";
import { Projects } from "../pages/projects";

export const Volunteer = props => {
	const history = useHistory();
	const { actions } = useContext(Context);
	let { id } = useParams();
	const [becameVolunteer, setBecameVolunteer] = useState("");

	function addVolunteer() {
		let responseOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/projects/" + id + "/volunteers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			}
		})
			.then(response => {
				responseOk = response.ok;
				return response.json();
			})
			.then(responseJson => {
				if (responseOk) {
					setBecameVolunteer(true);
					toast.success("¡Gracias por unirte!");
					window.location.reload();
				} else {
					toast.error(responseJson.message);
				}
			})
			.catch(error => {
				toast.error(error.message);
			});
	}

	return (
		<div className="volunteer">
			<div className="row">
				<div className="col-12 bg-white">
					{props.isVolunteer || becameVolunteer ? (
						<div className="card">
							<div className="card-body">
								<h3 className="card-title">¡ Gracias por formar parte!</h3>
								<small className="card-title">¡ Gracias por ser Ubuntu!</small>
								<blockquote className="blockquote p-2 m-2">
									<p className="mb-0 mx-2 text-justify">
										Una persona con ubuntu es abierta y está disponible para las demás, respalda a
										las demás, no se siente amenazada cuando otras son capaces y son buenas en algo,
										porque está segura de sí misma ya que sabe que pertenece a una gran totalidad,
										que se decrece cuando otras personas son humilladas o menospreciadas, cuando
										otras son torturadas u oprimidas.
									</p>
									<footer className="blockquote-footer">
										<cite title="Source Title">Desmond Tutu</cite>
									</footer>
								</blockquote>
							</div>
						</div>
					) : (
						<div className="card">
							<div className="card-body">
								<Button className="cBtnTheme" onClick={addVolunteer}>
									Unirme como voluntario al proyecto!
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
Volunteer.propTypes = {
	project: PropTypes.object,
	isVolunteer: PropTypes.bool
};
