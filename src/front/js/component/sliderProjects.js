import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../component/spinner";

import TestIMG from "../../img/hands_01.jpg";
import image_projects from "../../img/hands_01.jpg";

import "../../styles/sliderprojects.scss";

export const SliderProjects = props => {
	function SampleNextArrow(props) {
		const { className, style, onClick } = props;
		return <div className={className} style={{ ...style, display: "block" }} onClick={onClick} />;
	}
	SampleNextArrow.propTypes = {
		className: PropTypes.string,
		style: PropTypes.object,
		onClick: PropTypes.func
	};

	function SamplePrevArrow(props) {
		const { className, style, onClick } = props;
		return <div className={className} style={{ ...style, display: "block" }} onClick={onClick} />;
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
		adaptativeHeight: true,
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
					initialSlide: 2,
					nextArrow: false,
					prevArrow: false
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					nextArrow: false,
					prevArrow: false
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
										<div className="list-home-projects  card-img-overlay">
											<h5 className="card-text mt-xl-5 mt-lg-1 mt-md-1 mt-sm-0 text-white">
												{project.title}
											</h5>
											<hr />
											<p className="card-text mb-1 text-white mb-3 d-none d-sm-none d-md-none d-lg-none d-xl-block">
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
