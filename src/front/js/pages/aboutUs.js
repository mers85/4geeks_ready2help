import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PageTitle from "../component/pageTitle";

export const AboutUs = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid p-0">
			<div className="d-lg-flex flex-lg-column bd-highlight d-none d-sm-none d-md-none d-xl-block">
				<PageTitle pageTitle="Acerca de Nosotros" myPath="/about_us" />
			</div>
			<div className="container">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-4  mx-auto text-justify mb-2">
						<div className="card-body">
							<h4 className="text-center">Nuestro Objetivo</h4>
							Ready2Help tiene el objetivo de ser un canal de difusión para aquellas organizaciones
							sociales con recursos limitados. Queremos que dispongan de esta herramienta para que puedan
							dar a conocer aquellos proyectos de carácter social que requieren de financiación mediante
							donaciones o con personas voluntarias que quieran aportar su expertiz a dicha causa. Tenemos
							la firme convicción de que en este mundo existe mucha gente con un enorme entusiasmo, mente
							y corazón para colaborar en estos proyectos.
						</div>
					</div>

					<div className="col-sm-12 col-md-12 col-lg-4 mx-auto text-justify mb-2">
						<div className="card-body">
							<h4 className="text-center">Nuestra Misión</h4>
							Ready2Help tiene como misión desarrollar herramientas tecnológicas que faciliten, den
							trazabilidad y fortalezcan la colaboración entre la sociedad civil y el tejido de
							organizaciones sociales. Hemos decidido aprovechar el alcance que proporcionan las
							tecnologías actuales para poder llegar hasta las personas y hacerles conocer un amplio
							abanico de posibilidades donde puedan participar y dejar, mediante su ayuda, un sitio con
							mejores oportunidades.
						</div>
					</div>

					<div className="col-sm-12 col-md-12 col-lg-4 mx-auto text-justify mb-2">
						<div className="card-body">
							<h4 className="text-center">Colabora</h4>
							Desde Ready2Help queremos invitarte a colaborar con los proyectos sociales que se presentan
							en nuestra aplicación. Estamos seguros que con tu colaboración, ya sea monetaria o con tu
							esfuerzo como voluntario, lograremos conseguir las metas de cada uno de estos proyectos.
							Queremos que te sientas orgulloso de participar y de conseguir conjuntamente nuevas
							oportunidades para aquellos que lo necesitan.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
