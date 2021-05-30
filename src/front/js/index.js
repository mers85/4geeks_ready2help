//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

//include bootstrap npm library into the bundle
import "bootstrap/dist/css/bootstrap.css";

//include your index.scss file into the bundle
import "../styles/index.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(
	<BrowserRouter>
		<Layout />
	</BrowserRouter>,
	document.querySelector("#app")
);
