import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "../../styles/formularioBase.scss";

export const LogOut = () => {
	const { actions } = useContext(Context);
	useEffect(() => {
		actions.outAccessToken();
	}, []);

	return (
		<Grid className="projectWrapper">
			<Grid className="projectForm">
				<h2> Hasta pronto </h2>
			</Grid>
		</Grid>
	);
};
