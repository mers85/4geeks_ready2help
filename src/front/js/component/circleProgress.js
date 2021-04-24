import React, { useState } from "react";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";

import "../../styles/circleProgressBar.scss";

export const CircleProgress = props => {
	let projectStats = props.volunteers_stats;

	return (
		<div className="circle-progress">
			<div className="container">
				<div className="row">
					<div className="col-sm-3 col-md-2">
						<div className="progress-volunteer" data-percentage={projectStats.project_volunteers_percent}>
							<span className="progress-volunteer-left">
								<span className="progress-volunteer-bar"></span>
							</span>
							<span className="progress-volunteer-right">
								<span className="progress-volunteer-bar"></span>
							</span>
							<div className="progress-volunteer-value text-muted">
								<div>
									{projectStats.total_project_volunteers + "/" + projectStats.total_volunteers_needed}
									<br />
									<span>Voluntarios</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

CircleProgress.propTypes = {
	volunteers_stats: PropTypes.object
};
