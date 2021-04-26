const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			accessToken: null,
			projects: null,
			userRoles: null,
			userId: null,
			organizationId: null,
			personId: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			saveAccessToken: (accessToken, userRoles, userId, organizationId, personId) => {
				setStore({ accessToken: accessToken });
				localStorage.setItem("token", accessToken);

				setStore({ userRoles: userRoles });
				localStorage.setItem("user_roles", userRoles);

				setStore({ userId: userId });
				localStorage.setItem("user_id", userId);

				setStore({ organizationId: organizationId });
				localStorage.setItem("organization_id", organizationId);

				setStore({ personId: personId });
				localStorage.setItem("person_id", personId);
			},
			getAccessToken: () => {
				let store = getStore();
				if (store.accessToken) {
					return store.accessToken;
				} else {
					return localStorage.getItem("token");
				}
			},
			outAccessToken: () => {
				setStore({ accessToken: null });
				setStore({ userRoles: null });
				setStore({ userId: null });
				setStore({ userOrganizationId: null });
				setStore({ personId: null });
				//localStorage.clear();
				localStorage.removeItem("token");
				localStorage.removeItem("user_roles");
				localStorage.removeItem("user_id");
				localStorage.removeItem("organization_id");
				localStorage.removeItem("person_id");
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
				let store = getStore();
				let roles = store.userRoles;

				let allRoles = [...roles, newRol];
				setStore({ userRoles: allRoles });

				localStorage.removeItem("user_roles");
				localStorage.setItem("user_roles", allRoles);
			},
			getUserRoles: () => {
				let store = getStore();
				if (store.userRoles) {
					return store.userRoles;
				} else {
					return localStorage.getItem("user_roles");
				}
			},
			getUserId: () => {
				let store = getStore();
				if (store.userId) {
					return store.userId;
				} else {
					return localStorage.getItem("user_id");
				}
			},
			addOrganizationId: organizationId => {
				setStore({ organizationId: organizationId });

				localStorage.removeItem("organization_id");
				localStorage.setItem("organization_id", organizationId);
			},
			getOrganizationId: () => {
				let store = getStore();
				if (store.organizationId) {
					return store.organizationId;
				} else {
					return localStorage.getItem("organization_id");
				}
			},
			addPersonId: personId => {
				setStore({ personId: personId });

				localStorage.removeItem("person_id");
				localStorage.setItem("person_id", personId);
			},
			getPersonId: () => {
				let store = getStore();

				if (store.personId) {
					return store.personId;
				} else {
					return JSON.parse(localStorage.getItem("person_id"));
				}
			},
			isPerson: () => {
				let person = getActions().getPersonId();

				if (person) {
					return true;
				} else {
					return false;
				}
			}
		}
	};
};

export default getState;
