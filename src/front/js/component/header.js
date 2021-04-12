import React from "react";
import { Link } from "react-router-dom";

import { HeaderTopbar } from "./headerTopbar";
import { MobileMenu } from "./mobileMenu";
import "../../styles/header.scss";

export const Header = () => {
	return (
		<div className="middle-header header-style-3">
			<HeaderTopbar />
			<div className="container">
				<div className="header-content">
					<div className="row">
						<div className="col-lg-2 col-md-3 col-sm-4 col-4">
							<div className="logo">
								<Link to="/" title="">
									Ready2help
								</Link>
							</div>
						</div>
						<div className="col-lg-9 d-lg-block d-none">
							<nav>
								<ul>
									<li>
										<Link className="active" to="/" title="Home">
											Home
										</Link>
									</li>
									<li>
										<Link to="/" title="Acerca de nosotros">
											Acerca de nosotros
										</Link>
									</li>
									<li>
										<Link to="/" title="Proyectos">
											Proyectos
										</Link>
									</li>
									<li>
										<Link to="/profile" title="Perfil">
											Perfil
										</Link>
									</li>
									<li>
										<Link to="/organizations/:id/create_project" title="proyectos">
											Crear proyecto
										</Link>
									</li>
									<li>
										<Link to="/" title="Contacto">
											Contacto
										</Link>
									</li>
								</ul>
							</nav>
						</div>
						<div className="col-md-2 col-sm-2 col-2">
							<MobileMenu />
						</div>
					</div>
					<div className="clearfix" />
				</div>
			</div>
		</div>
	);
};
