import React, { useState } from "react";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";

import "../../styles/circleProgressBar.scss";

const CircleProgress = props => {
	return (
		<div className="circle-progress">
			<div className="container">
				<div className="row">
					<div className="col-sm-3 col-md-2">
						<div className="progress-volunteer" data-percentage="80">
							<span className="progress-volunteer-left">
								<span className="progress-volunteer-bar"></span>
							</span>
							<span className="progress-volunteer-right">
								<span className="progress-volunteer-bar"></span>
							</span>
							<div className="progress-volunteer-value text-muted">
								<div>
									20%
									<br />
									<span>completed</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CircleProgress;
CircleProgress.propTypes = {};
