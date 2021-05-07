import React, { Component } from "react";

import "../../styles/footer.scss";

export const Footer = () => (
	<footer className="footer mt-auto small-footer navbar navbar-expand-lg navbar-dark py-3 ">
		<div className="col-12 text-center font-italic">
			<p>
				Made by
				<a className="mx-2" href="https://github.com/omarsomx">
					Omarsomx
				</a>
				<span>
					<i className="fab fa-d-and-d text-white fa-2x"></i>
				</span>
				<a className="mx-2" href="https://github.com/mers85">
					Mers
				</a>
			</p>
		</div>
	</footer>
);
