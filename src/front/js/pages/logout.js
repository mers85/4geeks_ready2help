import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";

import { toast } from "react-toastify";

export const LogOut = () => {
	const { actions } = useContext(Context);

	function handleLogOut() {
		actions.outUserDetails();
		toast.success("Sesión finalizada");
	}

	return (
		<Link className="nav-link" onClick={handleLogOut}>
			Log Out
		</Link>
	);
};
