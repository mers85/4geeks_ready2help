const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			accessToken: null,
			projects: null,
			userRoles: null,
			organizationId: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			saveAccessToken: (accessToken, userRoles, organizationId) => {
				setStore({ accessToken: accessToken });
				localStorage.setItem("token", accessToken);

				setStore({ userRoles: userRoles });
				localStorage.setItem("user_roles", userRoles);

				setStore({ organizationId: organizationId });
				localStorage.setItem("organization_id", organizationId);
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
				setStore({ userOrganizationId: null });
				//localStorage.clear();
				localStorage.removeItem("token");
				localStorage.removeItem("user_roles");
				localStorage.removeItem("organization_id");
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
			}
		}
	};
};

export default getState;
