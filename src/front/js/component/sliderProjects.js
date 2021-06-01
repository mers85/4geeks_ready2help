import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../component/spinner";

import TestIMG from "../../img/hands_01.jpg";
import image_projects from "../../img/hands_01.jpg";

import "../../styles/home.scss";

export const SliderProjects = props => {
	function SampleNextArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{ ...style, display: "block", background: "linear-gradient(to right, #00a7d5, #27cdca)" }}
				onClick={onClick}
			/>
		);
	}
	SampleNextArrow.propTypes = {
		className: PropTypes.string,
		style: PropTypes.object,
		onClick: PropTypes.func
	};

	function SamplePrevArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{ ...style, display: "block", background: "linear-gradient(to right, #00a7d5, #27cdca)" }}
				onClick={onClick}
			/>
		);
	}
	SamplePrevArrow.propTypes = {
		className: PropTypes.string,
		style: PropTypes.object,
		onClick: PropTypes.func
	};

	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		initialSlide: 0,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	};

	function truncateString(str, num) {
		if (str) {
			if (str.length <= num) {
				return str;
			}

			return str.slice(0, num) + "...";
		}
	}

	return (
		<div className="text-center mt-5 home">
			<Slider {...settings}>
				{props.projects ? (
					props.projects.map(project => {
						return (
							<div key={project.id}>
								<Link to={"/projects/" + project.id}>
									<div className="card carrousel carrousel-projects  mx-2">
										<img className="card-img-top" src={project.featured_image_url} alt="" />
										<div className="list-home-projects card-img-overlay">
											<h6 className="card-text py-2 text-white d-node d-sm-block d-md-block d-lg-block d-xl-none">
												{project.title}
											</h6>
											<h5 className="card-text py-3 text-white d-node d-sm-none d-md-none d-lg-none d-xl-block">
												{project.title}
											</h5>
											<hr />
											<p className="card-text mb-1 text-white  mb-3">
												{truncateString(project.subtitle, 60)}
											</p>
										</div>
									</div>
								</Link>
							</div>
						);
					})
				) : (
					<Spinner />
				)}
			</Slider>
		</div>
	);
};
SliderProjects.propTypes = {
	projects: PropTypes.array
};
