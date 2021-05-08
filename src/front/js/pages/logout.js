import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";

import { toast } from "react-toastify";

import "../../styles/header.scss";

export const LogOut = () => {
	const { actions } = useContext(Context);

	function handleLogOut() {
		actions.outUserDetails();
		toast.success("Sesión finalizada");
	}

	return (
		<button className="button-login py-2" onClick={handleLogOut}>
			Log Out
		</button>
	);
};
