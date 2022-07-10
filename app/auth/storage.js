import * as SecureStore from "expo-secure-store";
// const key = "authToken";
const storeToken = async (authToken, key = "authToken") => {
	try {
		await SecureStore.setItemAsync(key, JSON.stringify(authToken));
	} catch (error) {
		alert("error storing " + key, error);
	}
};

const getToken = async (key = "authToken") => {
	try {
		result = await SecureStore.getItemAsync(key);
		if (result) return JSON.parse(result);
		return;
	} catch (error) {
		alert("error Getting the auth token", error);
	}
};

const removeToken = async (key = "authToken") => {
	try {
		return await SecureStore.deleteItemAsync(key);
	} catch (error) {
		alert("error deleting the auth token", error);
	}
};

export default { storeToken, getToken, removeToken };
