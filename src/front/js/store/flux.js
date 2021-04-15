const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			accessToken: null,
			userRoles: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			saveAccessToken: (accessToken, userRoles) => {
				setStore({ accessToken: accessToken });
				localStorage.setItem("token", accessToken);
				getActions().saveUserRoles(userRoles);
			},
			saveUserRoles: userRoles => {
				setStore({ userRoles: userRoles });
				localStorage.setItem("user_roles", userRoles);
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
				//localStorage.clear();
				localStorage.removeItem("token");
				localStorage.removeItem("user_roles");
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
			getUserRoles: () => {
				return getStore().userRoles;
			}
		}
	};
};

export default getState;
