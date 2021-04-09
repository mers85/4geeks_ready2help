import React, { useState } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
import { Link } from "react-router-dom";

import "../../styles/mobilemenu.scss";

const menus = [
	{
		id: 1,
		title: "React Boilerplate",
		link: "/"
	},

	{
		id: 2,
		title: "Log In",
		link: "/login"
	},

	{
		id: 3,
		title: "Sign Up",
		link: "/signup"
	},
	{
		id: 4,
		title: "Contact",
		link: "/#"
	}
];

export const MobileMenu = () => {
	const [state, setState] = useState({
		isMenuShow: false,
		isOpen: 0
	});
	const menuHandler = () => {
		setState({
			isMenuShow: !state.isMenuShow
		});
	};

	const setIsOpen = id => () => {
		setState({
			isOpen: id === state.isOpen ? 0 : id
		});
	};

	const { isMenuShow, isOpen } = state;

	return (
		<div>
			<div className={`mobileMenu ${isMenuShow ? "show" : ""}`}>
				{/* <div className="clox" onClick={this.menuHandler}>Close Me</div> */}

				<ul className="responsivemenu">
					{menus.map(item => {
						return (
							<li key={item.id}>
								{item.submenu ? (
									<p onClick={setIsOpen(item.id)}>
										{item.title}
										{item.submenu ? <i className="fa fa-angle-right" aria-hidden="true" /> : ""}
									</p>
								) : (
									<Link to={item.link}>{item.title}</Link>
								)}
								{item.submenu ? (
									<Collapse isOpen={item.id === isOpen}>
										<Card>
											<CardBody>
												<ul>
													{item.submenu.map(submenu => (
														<li key={submenu.id}>
															<Link className="active" to={submenu.link}>
																{submenu.title}
															</Link>
														</li>
													))}
												</ul>
											</CardBody>
										</Card>
									</Collapse>
								) : (
									""
								)}
							</li>
						);
					})}
				</ul>
			</div>

			<div className="showmenu" onClick={menuHandler}>
				<i className="fa fa-bars" aria-hidden="true" />
			</div>
		</div>
	);
};
