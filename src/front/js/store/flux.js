const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			accessToken: ""
		},
		actions: {
			// Use getActions to call a function within a fuction
			saveAccessToken: accessToken => {
				setStore({ accessToken: accessToken });
				localStorage.setItem("token", accessToken);
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
				setStore({ accessToken: "" });
				localStorage.setItem("token", "");
			}
		}
	};
};

export default getState;
