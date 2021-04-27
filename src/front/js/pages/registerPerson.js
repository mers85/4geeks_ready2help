import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import FixedAlert from "../component/fixedAlert";

export const RegisterPerson = props => {
	const [name, setName] = useState("");
	const [lastname, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [zipcode, setZipcode] = useState("");
	const [phone, setPhone] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const { actions, store } = useContext(Context);
	const history = useHistory();

	let search = window.location.search;
	// let params = new URLSearchParams(search);
	// let token = params.get("token");
	console.log(typeof search, search);

	function myPath() {
		console.log("se espera true", search.includes("/donate"));
		if (window.location.search.includes("/donate")) {
			history.push(search);
		} else {
			history.push("/profile");
		}
	}

	function registerPerson() {
		setError("");
		switch (true) {
			case name == "":
				setError("Name field must be informed.");
				return;
			case lastname == "":
				setError("Name field must be informed.");
				return;
			case email == "":
				setError("Email field must be informed.");
				return;
			case address == "":
				setError("Address field must be informed.");
				return;
			case zipcode == "":
				setError("Zipcode field must be informed.");
				return;
			case phone == "":
				setError("Phone field must be informed.");
				return;
			default:
				break;
		}
		let responseOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/register_pers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			},
			body: JSON.stringify({
				name: name,
				lastname: lastname,
				email: email,
				address: address,
				zipcode: zipcode,
				phone: phone
			})
		})
			.then(response => {
				responseOk = response.ok;
				if (response.ok) {
					if (response.status === 201) {
						setMessage("Person registered correctly");
						myPath();
					}
				}
				return response.json();
			})
			.then(responseJson => {
				if (!responseOk) {
					setError(responseJson.message);
				} else {
					console.log("responseJson.person.id", responseJson.person.id);
					actions.addUserDetails(responseJson.person);
				}
			})
			.catch(error => {
				console.log("error", error);
				setError(error.message);
			});
	}

	if (props.notification) {
		console.log(props.notification);
	}

	return (
		<div className="jumbotron">
			<div className="col-8 mx-auto">
				{props.notification ? <FixedAlert color="info" message={props.notification} /> : ""}
			</div>
			{error ? <h3>{error}</h3> : ""}
			{message ? <h3>{message}</h3> : ""}
			<input
				type="name"
				placeholder="Enter name"
				onChange={event => {
					setName(event.target.value);
				}}
			/>
			<input
				type="lastname"
				placeholder="Enter lastname"
				onChange={event => {
					setLastName(event.target.value);
				}}
			/>
			<input
				type="email"
				placeholder="Enter email"
				onChange={event => {
					setEmail(event.target.value);
				}}
			/>
			<input
				type="address"
				placeholder="Enter address"
				onChange={event => {
					setAddress(event.target.value);
				}}
			/>
			<input
				type="zipcode"
				placeholder="Enter zipcode"
				onChange={event => {
					setZipcode(event.target.value);
				}}
			/>
			<input
				type="phone"
				placeholder="Enter phone"
				onChange={event => {
					setPhone(event.target.value);
				}}
			/>
			<input type="button" value="Guardar" onClick={registerPerson} />
		</div>
	);
};
RegisterPerson.propTypes = {
	notification: PropTypes.string
};
