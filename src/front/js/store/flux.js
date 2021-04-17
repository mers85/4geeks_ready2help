const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			accessToken: null,
			projects: null
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
				setStore({ accessToken: null });
				//localStorage.clear();
				localStorage.removeItem("token");
				window.location.href = "/";
			},
			addProjects: newProjects => {
				let oldProjects = getStore().projects;
				let oldProjectsResults = getStore().projects ? getStore().projects : [];
				// newProjects = [...oldProjectsResults, ...newProjects];
				setStore({ projects: newProjects });
			}
		}
	};
};

export default getState;
