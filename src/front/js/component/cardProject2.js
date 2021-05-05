import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Card, CardDeck } from "reactstrap";
import image_projects from "../../img/hands_01.jpg";
import { CircleProgress } from "./circleProgress";
import { ProgressBar } from "./progressBar";

import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";

import "../../styles/projects2.scss";
import "../../styles/circleProgressBar.scss";

export const CardProject2 = props => {
	const ClickHandler = () => {
		window.scrollTo(10, 0);
	};

	return (
		<div className="col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-4 mt-3">
			<div className="card projects border-0 shadow">
				<img className="img-fluid" src={image_projects} alt="" />
				<div className="card-body ">
					<h2 className="card-title">{props.title}</h2>
					<p className="card-subtitle">{props.subtitle}</p>
					<div className="card-text py-1">
						<div className="row">
							{props.people_needed > 0 ? (
								<div className="col-sm-12 col-xl-6 ustify-content-md-center">
									<CircleProgress volunteers_stats={props.volunteers_stats} />
								</div>
							) : (
								""
							)}
							{props.money_needed > 0 ? (
								<div className="col-sm-12  col-xl-6 justify-content-md-center">
									<ProgressBar
										total_donated={props.total_donated}
										money_needed={props.money_needed}
									/>
								</div>
							) : (
								""
							)}
						</div>
					</div>
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
