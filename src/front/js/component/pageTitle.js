import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/index.scss";

const PageTitle = props => {
	return (
		<div className="jumbotron bg-white page-title jumbotron-fluid">
			<div className="container">
				<div className="row">
					<div className="col-sm-12 col-md-8 col-lg-6 mx-auto text-center ">
						<div className="py-4 my-4  rounded-pill p-3 bg-white-opacity ">
							<h4 className="display-4">{props.pageTitle}</h4>
							<ul className="d-inline-flex">
								<li>
									<Link to="/">Home</Link>
								</li>

								<li>
									<Link to={props.myPath}>
										<span className="text-muted mx-2">/</span>
										<span className="text-green">{props.pageTitle}</span>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageTitle;
PageTitle.propTypes = {
	pageTitle: PropTypes.string,
	myPath: PropTypes.string
};
