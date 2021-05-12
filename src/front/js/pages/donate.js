import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";

import FixedAlert from "../component/fixedAlert";

// stripe
import { CardElement, Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "../../styles/donate.scss";

const DonateForm = props => {
	let { id } = useParams();
	const { actions, store } = useContext(Context);
	const history = useHistory();
	const [disableButton, setDisableButton] = useState(false);
	const [notificacionPayment, setNotificacionPayment] = useState(false);
	const [detailsProject, setDetailsProject] = useState({});
	const [value, setValue] = useState({
		amount: "",
		person: ""
	});

	const changeHandler = e => {
		setValue({ ...value, [e.target.name]: e.target.value });
		validator.showMessages();
	};

	const [validator] = React.useState(
		new SimpleReactValidator({
			className: "errorMessage"
		})
	);

	function getProjectDetails(id) {
		let responseOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/projects/" + id, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				responseOk = response.ok;
				return response.json();
			})
			.then(responseJson => {
				if (responseOk) {
					setDetailsProject(responseJson.project);
				} else {
					toast.error(responseJson.message);
				}
			})
			.catch(error => {
				toast.error(error.message);
			});
	}

	useEffect(() => {
		getProjectDetails(id);

		let userDetailsId = actions.getUserDetails().id;

		let responsePersonOk = false;
		fetch(process.env.BACKEND_URL + "/api/v1/persons/" + userDetailsId, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			}
		})
			.then(response => {
				responsePersonOk = response.ok;
				return response.json();
			})
			.then(responseJson => {
				if (responsePersonOk) {
					setValue({ ...value, ["person"]: responseJson.person });
				} else {
					toast.error(responseJson.message);
				}
			})
			.catch(error => {
				toast.error(error.message);
			});
	}, []);

	function evaluateAmount(amount) {
		let evaulateReturn = true;
		if (amount <= 0) {
			toast.error("Please, introduce a valid amount to make correctly your donation.");
			evaulateReturn = false;
		}

		return evaulateReturn;
	}

	const SubmitHandler = async e => {
		e.preventDefault();
		setDisableButton(true);
		setNotificacionPayment(true);
		let amount = value.amount.replace(/[^0-9,.]/g, "").replace(/,/g, ".");

		let stripeAmount = amount * 100;

		if (evaluateAmount(amount)) {
			if (!props.stripe || !props.elements) {
				return;
			}

			fetch(process.env.BACKEND_URL + "/api/v1/payment_intents", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					amount: parseFloat(stripeAmount)
				})
			})
				.then(response => {
					return response.json();
				})
				.then(async responseJson => {
					let clientSecret = responseJson.client_secret;
					const result = await props.stripe.confirmCardPayment(clientSecret, {
						payment_method: {
							card: props.elements.getElement(CardElement),
							billing_details: {
								name: value.person.name
							}
						}
					});

					if (result.error) {
						// Show error to your customer (e.g., insufficient funds)
						setDisableButton(false);
						toast.error(result.error.message);
					} else {
						// The payment has been processed!
						if (result.paymentIntent.status === "succeeded") {
							// Show a success message to your customer
							// There's a risk of the customer closing the window before callback
							// execution. Set up a webhook or plugin to listen for the
							// payment_intent.succeeded event that handles any business critical
							// post-payment actions.

							let responseOk = false;
							fetch(process.env.BACKEND_URL + "/api/v1/projects/" + id + "/donation", {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
									Authorization: "Bearer " + actions.getAccessToken()
								},
								body: JSON.stringify({
									amount: parseFloat(amount),
									payment_type: "card",
									stripe_payment_id: result.paymentIntent.id
								})
							})
								.then(response => {
									responseOk = response.ok;
									setDisableButton(false);
									setNotificacionPayment(false);
									if (responseOk) {
										if (response.status === 201) {
										}
									}
									return response.json();
								})
								.then(responseJson => {
									if (responseOk) {
										toast.success(
											"Muchas gracias por tu donación. Te hemos enviado un correo electrónico con los detalles al respecto."
										);
										window.location.reload();
									}
								})
								.catch(error => {
									setDisableButton(false);
									toast.error(error.message);
								});
						}
					}
				})
				.catch(error => {
					toast.error(error.message);
				});
		}
	};

	return (
		<div className="wpo-donation-page-area">
			<div className="container formulario-base py-5 my-5">
				<div className="row">
					<div className="col-lg-8 offset-lg-2">
						<div className="wpo-donate-header">
							<h2>Haz una donación</h2>
							<p className="text-center">
								Estás realizando una donación para{" "}
								<strong>{detailsProject ? detailsProject.title : "No hay titulo"}</strong>
							</p>
						</div>
						<form onSubmit={SubmitHandler}>
							<div className="wpo-donations-amount">
								<h2>Importe de tu Donación</h2>
								<input
									type="number"
									className="form-control"
									value={value.amount}
									name="amount"
									id="amount"
									placeholder="Importe a donar"
									onChange={e => changeHandler(e)}
									onBlur={e => changeHandler(e)}
									// pattern="[0-9]"
									required
								/>
								{validator.message("amount", value.amount, "required:amount")}
							</div>
							<div className="wpo-donations-details">
								<h2>Detalles</h2>
								<div className="row">
									<div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
										<input
											type="text"
											className="form-control"
											defaultValue={value.person.name}
											name="fname"
											id="fname"
											placeholder="First Name"
											readOnly
										/>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
										<input
											type="text"
											className="form-control"
											defaultValue={value.person.lastname}
											name="lname"
											id="lname"
											placeholder="Last Name"
											readOnly
										/>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group clearfix">
										<input
											type="email"
											className="form-control"
											defaultValue={value.person.email}
											name="email"
											id="email"
											placeholder="Email"
											readOnly
										/>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
										<input
											type="text"
											className="form-control"
											defaultValue={value.person.address}
											name="adress"
											id="adress"
											placeholder="Address"
											readOnly
										/>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
										<input
											type="text"
											className="form-control"
											defaultValue={value.person.zipcode}
											name="zipcode"
											id="zipcod"
											placeholder="ZipCode"
											readOnly
										/>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
										<input
											type="text"
											className="form-control"
											defaultValue={value.person.phone}
											name="phone"
											id="phone"
											placeholder="Phone"
											readOnly
										/>
									</div>
								</div>
							</div>
							{notificacionPayment ? (
								<div className="row">
									<div className="col-sm">
										<FixedAlert
											color="info"
											message={"Espere un momento mientras se procesa la operación"}
										/>
									</div>
								</div>
							) : (
								""
							)}

							<div className="wpo-doanation-payment">
								<h2>Introduce los datos de tu tarjeta</h2>
								<CardElement />
							</div>

							<div className="submit-area">
								<button
									type="submit"
									className="btn button-green btn-md btn-block"
									disabled={disableButton || !props.stripe}>
									DONAR
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
DonateForm.propTypes = {
	elements: PropTypes.object,
	stripe: PropTypes.object
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Donate = () => {
	return (
		<Elements stripe={stripePromise}>
			<ElementsConsumer>
				{({ elements, stripe }) => <DonateForm elements={elements} stripe={stripe} />}
			</ElementsConsumer>
		</Elements>
	);
};

export default Donate;
