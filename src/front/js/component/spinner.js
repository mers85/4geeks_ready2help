import React, { useState } from "react";
import { Alert } from "reactstrap";
import "../../styles/spinner.scss";

const Spinner = () => {
	return (
		<div className="lds-spinner py-2">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default Spinner;
