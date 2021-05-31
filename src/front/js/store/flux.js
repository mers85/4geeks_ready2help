const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			accessToken: null,
			projects: null,
			user: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			saveUserDetails: (accessToken, user) => {
				setStore({ accessToken: accessToken });
				localStorage.setItem("token", accessToken);

				setStore({ user: user });

				localStorage.setItem("user", JSON.stringify(user));
			},
			getAccessToken: () => {
				let store = getStore();
				if (store.accessToken) {
					return store.accessToken;
				} else {
					return localStorage.getItem("token");
				}
			},
			outUserDetails: () => {
				setStore({ accessToken: null });
				setStore({ user: null });
				//localStorage.clear();
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				window.location.href = "/";
			},
			addProjects: newProjects => {
				setStore({ projects: newProjects });
				localStorage.setItem("projects", JSON.stringify(newProjects));
			},
			isLogIn: () => {
				let token = getActions().getAccessToken();

				if (token) {
					return true;
				} else {
					return false;
				}
			},
			getUser: () => {
				let store = getStore();
				if (store.user) {
					return store.user;
				} else {
					return JSON.parse(localStorage.getItem("user"));
				}
			},
			getUserId: () => {
				let user = getActions().getUser();
				if (user) {
					return user["id"];
				}
			},
			addNewUserRole: newRol => {
				let user = getActions().getUser();
				let roles = user["roles"];

				let allRoles = [...roles, newRol];

				user["roles"] = allRoles;
				setStore({ user: user });

				localStorage.removeItem("user");
				localStorage.setItem("user", JSON.stringify(user));
			},
			addOrganizationId: organizationId => {
				let user = getActions().getUser();
				user["organization_id"] = organizationId;

				setStore({ user: user });

				localStorage.removeItem("user");
				localStorage.setItem("user", JSON.stringify(user));
			},
			addUserDetails: userDetails => {
				let user = getActions().getUser();

				user["details"] = userDetails;
				setStore({ user: user });

				localStorage.removeItem("user");
				localStorage.setItem("user", JSON.stringify(user));
			},
			getUserDetails: () => {
				let user = getActions().getUser();
				if (user) {
					return user["details"];
				}
			},
			isUserDetails: () => {
				let userDetails = getActions().getUserDetails();

				if (userDetails) {
					return true;
				} else {
					return false;
				}
			},
			EditProjectTotalDonated: (idProject, amount) => {
				let projects = getActions().getProjects();

				let project = {};
				for (let i = 0; i < projects.length; i++) {
					if (projects[i].id == idProject) {
						project = projects[i];
						break;
					}
				}

				if (projects && project.money_needed > 0) {
					let total = project.total_donated + parseInt(amount);
					project.total_donated = total;
				}

				setStore({ projects: null });
				localStorage.removeItem("projects");

				setStore({ projects: projects });
				localStorage.setItem("projects", JSON.stringify(projects));
			},
			getProjects: () => {
				let store = getStore();
				if (store.projects) {
					return store.projects;
				} else {
					return JSON.parse(localStorage.getItem("projects"));
				}
			},
			getProject: idProject => {
				let projects = getActions().getProjects();
				let id = idProject;

				if (projects) {
					let project = {};
					for (let i = 0; i < projects.length; i++) {
						if (projects[i].id == id) {
							project = projects[i];
							break;
						}
					}
					return project;
				} else {
					let projectsLocalStorage = JSON.parse(localStorage.getItem("projects"));
					let projectLocalStorage = {};

					for (let i = 0; i < projectsLocalStorage.length; i++) {
						if (projectsLocalStorage[i].id == id) {
							projectLocalStorage = projectsLocalStorage[i];
							break;
						}
					}
					if (projectsLocalStorage && projectLocalStorage) {
						return projectLocalStorage;
					}
				}
			}
		}
	};
};

export default getState;
