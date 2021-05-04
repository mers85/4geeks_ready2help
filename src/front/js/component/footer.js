import React, { Component } from "react";

import "../../styles/footer.scss";

export const Footer = () => (
	// <footer className="footer mt-auto py-3 text-center">
	// 	<p>
	// 		Made with <i className="fa fa-heart text-danger" /> by{" "}
	// 		<a href="http://www.4geeksacademy.com">4Geeks Academy</a>
	// 	</p>
	// </footer>
	<footer className="footer mt-auto small-footer navbar navbar-expand-lg navbar-dark py-3 ">
		<div className="col-12 text-center">
			<p>
				Made by
				<a className="mx-2" href="https://github.com/omarsomx">
					Omarsomx
				</a>
				{"&"}
				<a className="mx-2" href="https://github.com/mers85">
					Mers
				</a>
			</p>
		</div>
	</footer>
);
