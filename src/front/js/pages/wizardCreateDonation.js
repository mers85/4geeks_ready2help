import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import "../../styles/formularioBase.scss";
import { LogIn } from "./login";
import Donate from "./donate";
import { toast } from "react-toastify";
import { Profile } from "./profile";
import { RegisterPerson } from "./registerPerson";

export const WizardCreateDonation = props => {
	let { id } = useParams();
	const history = useHistory();
	const { actions } = useContext(Context);

	if (actions.isLogIn()) {
		if (actions.isUserDetails()) {
			return <Donate />;
		} else {
			return <Redirect to={"/register_pers?successpath=/projects/" + id + "/donate"} />;
		}
	} else {
		return <Redirect to={"/login?successpath=/projects/" + id + "/donate"} />;
	}
};
