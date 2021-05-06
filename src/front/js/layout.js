import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { SignUp } from "./pages/signup";
import { LogIn } from "./pages/login";
import { CreateProject } from "./pages/createProject";
import { WizardCreateProject } from "./pages/wizardCreateProject";
import { WizardCreateDonation } from "./pages/wizardCreateDonation";
import { Contact } from "./pages/contact";
import { LogOut } from "./pages/logout";
import injectContext from "./store/appContext";

import { Header } from "./component/header";
import { Footer } from "./component/footer";
import { Profile } from "./pages/profile";
import { RegisterOrganization } from "./pages/registerOrganization";
import { RegisterPerson } from "./pages/registerPerson";
import { RequestResetPass } from "./pages/requestResetPass";
import { ResetPass } from "./pages/resetPass";
import { Projects } from "./pages/projects";
import { ShowProject } from "./pages/ShowProject";
import { Donate } from "./pages/donate";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";
	let location = useLocation();

	useEffect(() => {
		console.log(location.pathname);
	}, [location]);

	return (
		<div className="d-flex flex-column h-100">
			<ScrollToTop>
				{location.pathname !== "/login" &&
				location.pathname !== "/signup" &&
				location.pathname !== "/request_reset_pass" &&
				location.pathname !== "/reset_pass" ? (
					<Header />
				) : null}
				<ToastContainer />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/demo">
						<Demo />
					</Route>
					<Route exact path="/signup">
						<SignUp />
					</Route>

					<Route exact path="/login">
						<LogIn />
					</Route>
					<Route exact path="/profile">
						<Profile />
					</Route>
					<Route exact path="/register_org">
						<RegisterOrganization />
					</Route>
					<Route exact path="/register_pers">
						<RegisterPerson />
					</Route>
					<Route exact path="/organizations/:id/create_project">
						<CreateProject />
					</Route>
					<Route exact path="/create_project">
						<WizardCreateProject />
					</Route>
					<Route exact path="/projects">
						<Projects />
					</Route>
					<Route exact path="/projects/:id">
						<ShowProject />
					</Route>
					<Route exact path="/request_reset_pass">
						<RequestResetPass />
					</Route>
					<Route exact path="/reset_pass">
						<ResetPass />
					</Route>
					<Route exact path="/projects/:id/donate">
						<WizardCreateDonation />
					</Route>
					<Route exact path="/contact">
						<Contact />
					</Route>
					<Route exact path="/logout">
						<LogOut />
					</Route>
					<Route exact path="/single/:theid">
						<Single />
					</Route>
					<Route>
						<h1>Not found!</h1>
					</Route>
				</Switch>
				<Footer />
			</ScrollToTop>
		</div>
	);
};

export default injectContext(Layout);
