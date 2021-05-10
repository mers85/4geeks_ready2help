import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";

import rigoImageUrl from "../../img/rigo-baby.jpg";
import PageTitle from "../component/pageTitle";

import "../../styles/formularioBase2.scss";

export const AboutUs = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid p-0">
			<div className="d-lg-flex flex-lg-column bd-highlight d-none d-sm-none d-md-none d-xl-block">
				<PageTitle pageTitle="Sobre nosotros" myPath="/about_us" />
			</div>
			<div className="container">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-4  mx-auto text-justify mb-2">
						<div className="card-body">
							<h4 className="text-center">Nuestro Objetivo</h4>
							is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
							industrys standard dummy text ever since the , when an unknown printer took a galley of type
							and scrambled it to make a type specimen book. is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the
							, when an unknown printer took a galley of type and scrambled it to make a type specimen
							book. is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
							the industrys standard dummy text ever since the , when an unknown printer took a galley of
							type and scrambled it to make a type specimen book.
						</div>
					</div>

					<div className="col-sm-12 col-md-12 col-lg-4 mx-auto text-justify mb-2">
						<div className="card-body">
							<h4 className="text-center">Nuestra Misión</h4>
							is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
							industrys standard dummy text ever since the , when an unknown printer took a galley of type
							and scrambled it to make a type specimen book. is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the
							, when an unknown printer took a galley of type and scrambled it to make a type specimen
							book. is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
							the industrys standard dummy text ever since the , when an unknown printer took a galley of
							type and scrambled it to make a type specimen book.
						</div>
					</div>

					<div className="col-sm-12 col-md-12 col-lg-4 mx-auto text-justify mb-2">
						<div className="card-body">
							<h4 className="text-center">Colabora</h4>
							is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
							industrys standard dummy text ever since the , when an unknown printer took a galley of type
							and scrambled it to make a type specimen book. is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the
							, when an unknown printer took a galley of type and scrambled it to make a type specimen
							book. is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
							the industrys standard dummy text ever since the , when an unknown printer took a galley of
							type and scrambled it to make a type specimen book.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
