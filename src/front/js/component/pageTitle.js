import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PageTitle = props => {
	return (
		<div className="jumbotron page-title jumbotron-fluid">
			<div className="container">
				<div className="row">
					<div className="col-12 mx-auto text-center">
						<div className="py-4 my-4 sombra">
							<p className="text-white display-4">{props.pageTitle}</p>
							<ul className="d-inline-flex">
								<li>
									<Link to="/">Home</Link>
								</li>

								<li>
									<Link to={props.myPath}>
										<span className="text-white mx-2">/</span>
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
