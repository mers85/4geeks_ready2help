const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			accessToken: null,
			userRoles: null,
			userOrganizationId: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			saveAccessToken: (accessToken, userRoles, userOrganization) => {
				setStore({ accessToken: accessToken });
				localStorage.setItem("token", accessToken);

				setStore({ userRoles: userRoles });
				localStorage.setItem("user_roles", userRoles);

				setStore({ userOrganizationId: userOrganization });
				localStorage.setItem("user_organization_id", userOrganization);
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
				localStorage.removeItem("user_organization_id");
				window.location.href = "/";
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
					console.log("flux store", store.userRoles);
				} else {
					return localStorage.getItem("user_roles");
					console.log("localstorage flux", localStorage.getItem("user"));
				}
			},
			getUserOrganizationId: () => {
				let store = getStore();
				if (store.userOrganizationId) {
					return store.userOrganizationId;
					console.log("flux store", store.userOrganizationId);
				} else {
					return localStorage.getItem("user_organization_id");
					console.log("localstorage flux", localStorage.getItem("user_organization_id"));
				}
			}
		}
	};
};

export default getState;
