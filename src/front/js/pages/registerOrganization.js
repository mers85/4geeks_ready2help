import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const RegisterOrganization = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [zipcode, setZipcode] = useState("");
	const [phone, setPhone] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const { actions, store } = useContext(Context);
	const history = useHistory();

	function registerOrganization() {
		setError("");
		switch (true) {
			case name == "":
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
		fetch(process.env.BACKEND_URL + "/api/v1/register_org", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			},
			body: JSON.stringify({
				email: email,
				name: name,
				address: address,
				zipcode: zipcode,
				phone: phone
			})
		})
			.then(response => {
				responseOk = response.ok;
				if (response.ok) {
					if (response.status === 201) {
						setMessage("Organization registered correctly");
						history.push("/profile");
					}
				}
				return response.json();
			})
			.then(responseJson => {
				console.log(responseJson);
				if (!responseOk) {
					setError(responseJson.message);
				}
			})
			.catch(error => {
				console.log("error", error);
				setError(error.message);
			});
	}

	return (
		<div className="jumbotron">
			{error ? <h3>{error}</h3> : ""}
			{message ? <h3>{message}</h3> : ""}
			<input
				type="name"
				placeholder="Enter name organization"
				onChange={event => {
					setName(event.target.value);
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
				placeholder="Enter Address"
				onChange={event => {
					setAddress(event.target.value);
				}}
			/>
			<input
				type="zipcode"
				placeholder="Enter Zipcode"
				onChange={event => {
					setZipcode(event.target.value);
				}}
			/>
			<input
				type="phone"
				placeholder="Enter Phone"
				onChange={event => {
					setPhone(event.target.value);
				}}
			/>
			<input type="button" value="Guardar" onClick={registerOrganization} />
		</div>
	);
};
