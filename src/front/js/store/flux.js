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
				let oldProjects = getStore().projects;
				let oldProjectsResults = getStore().projects ? getStore().projects : [];
				// newProjects = [...oldProjectsResults, ...newProjects];
				setStore({ projects: newProjects });
			},
			isLogIn: () => {
				let token = getActions().getAccessToken();

				if (token) {
					return true;
				} else {
					return false;
				}
			},
			addNewUserRole: newRol => {
				let user = getStore().user;
				let roles = user["roles"];

				let allRoles = [...roles, newRol];

				user["roles"] = allRoles;
				setStore({ user: user });

				localStorage.removeItem("user");
				localStorage.setItem("user", JSON.stringify(user));
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
				let store = getStore();
				if (store.user) {
					return store.user["id"];
				} else {
					let user = JSON.parse(localStorage.getItem("user"));
					return user["id"];
				}
			},
			addOrganizationId: organizationId => {
				let user = getStore().user;
				user["organization_id"] = organizationId;

				setStore({ user: user });

				localStorage.removeItem("user");
				localStorage.setItem("user", JSON.stringify(user));
			},
			addUserDetails: userDetails => {
				let user = getStore().user;
				console.log("store user:", user, typeof user);
				user["details"] = userDetails;
				setStore({ user: user });

				localStorage.removeItem("user");
				localStorage.setItem("user", JSON.stringify(user));
			},
			getUserDetails: () => {
				let store = getStore();
				console.log("store user:", store.user, typeof store.user);
				if (store.user && store.user["details"]) {
					return store.user["details"];
				} else {
					let user = JSON.parse(localStorage.getItem("user"));
					console.log("localstorage user:", user, typeof user);
					return user["details"];
				}
			},
			isUserDetails: () => {
				let userDetails = getActions().getUserDetails();

				if (userDetails && userDetails["id"]) {
					return true;
				} else {
					return false;
				}
			}
		}
	};
};

export default getState;
