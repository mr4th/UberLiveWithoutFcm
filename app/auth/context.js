import React from "react";
import authStorage from "../auth/storage";
import { customPost, post, firebase } from "../../firebase";
const AuthContext = React.createContext();

// @function  UserContext
const UserContext = React.createContext();

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
	const [user, setUser] = React.useState(null);

	const login = (userDetails) => {
		if (!userDetails) {
			return;
		}

		let imageUrl;
		let user2 = { ...userDetails };
		if (typeof userDetails.image === "object") {
			imageUrl = { uri: userDetails.image.uri };
		} else {
			imageUrl = { uri: userDetails.image };
		}

		user2.image = imageUrl;

		setUser(user2);
		authStorage.storeToken(user2, "user");
	};

	const logout = () => {
		authStorage.getToken("user").then((res) => {
			if (res?.email) {
				var formData = new FormData();
				formData.append("createcreatecreate", "createcreatecreate");
				formData.append("email", res?.email);
				formData.append("fcmtoken", "0");

				customPost(formData)
					.then((res) => {})
					.catch((res) => {});

				formData.append("createcreatecreate", "createcreatecreate");
				formData.append("email", res?.email);
				formData.append("fcmtoken", "0");

				post("logout/", formData)
					.then((res) => {})
					.catch((res) => {});
			}
			firebase
			.auth()
			.signOut()
			.then(() => {})
			.catch((error) => {	});
		});

		authStorage.removeToken();
		authStorage.removeToken("user");
		authStorage.removeToken("fcmtoken");
		setUser(null);
	};

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserProvider, UserContext };
export default AuthContext;
