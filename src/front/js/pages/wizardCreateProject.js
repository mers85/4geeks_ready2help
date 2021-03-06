import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import "../../styles/formularioBase.scss";
import { LogIn } from "./login";
import { CreateProject } from "./createProject";
import { toast } from "react-toastify";
import { Profile } from "./profile";
import { RegisterOrganization } from "./registerOrganization";
import { Redirect } from "react-router-dom";

export const WizardCreateProject = props => {
	const history = useHistory();
	const { actions } = useContext(Context);
	let isOrganization = actions.getUser() ? actions.getUser()["roles"].includes("organization") : "";

	if (actions.isLogIn()) {
		if (isOrganization) {
			return <CreateProject wizardId={actions.getUser()["organization_id"]} />;
		} else if (!isOrganization) {
			return <RegisterOrganization notification={"Debes registrarte como organización para crear un proyecto"} />;
		}
	} else {
		return <Redirect to="/login?successpath=/create_project" />;
	}
};
