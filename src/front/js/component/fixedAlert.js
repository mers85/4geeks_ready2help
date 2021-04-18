import React, { useState } from "react";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";

const FixedAlert = props => {
	const [visible, setVisible] = useState(true);

	const onDismiss = () => setVisible(false);

	return (
		<Alert color={props.color} isOpen={visible} toggle={onDismiss}>
			{props.message}
		</Alert>
	);
};

export default FixedAlert;
FixedAlert.propTypes = {
	message: PropTypes.string,
	color: PropTypes.string
};
