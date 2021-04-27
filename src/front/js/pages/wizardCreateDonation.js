import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import "../../styles/formularioBase.scss";
import { LogIn } from "./login";
import { Donate } from "./donate";
import { toast } from "react-toastify";
import { Profile } from "./profile";
import { RegisterPerson } from "./registerPerson";

export const WizardCreateDonation = props => {
	let { id } = useParams();
	const history = useHistory();
	const { actions } = useContext(Context);
	let isUserDetails = actions.isUserDetails();

	if (actions.isLogIn()) {
		if (isUserDetails) {
			return <Donate />;
		} else {
			return <RegisterPerson notification={"Please fill out the following form before making a donation."} />;
		}
	} else {
		return <LogIn path={"/projects/" + id + "/donate"} />;
	}
};
