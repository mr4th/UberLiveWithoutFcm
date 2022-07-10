// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage'
import * as SecureStorage from "expo-secure-store";
import { useContext } from "react";
// import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import {...} from "firebase/database";
// import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";
// var BaseUrl = "https://00d8-197-210-53-161.ngrok.io/api"

var BaseUrl = "https://uberlive.website/api";
var BaseUrl2 = BaseUrl.replace("/api", "");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDVShUdfDQjMhrLOGZgv8iipbF29CS6GYQ",
	authDomain: "fir-app-e51bb.firebaseapp.com",
	projectId: "fir-app-e51bb",
	storageBucket: "fir-app-e51bb.appspot.com",
	messagingSenderId: "423411333874",
	appId: "1:423411333874:web:c59906085d43aa95ad6e6b",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
//experimentalAutoDetectLongPolling
// experimentalForceLongPolling

let app;
if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
	firebase.firestore().settings({ experimentalAutoDetectLongPolling: true });
} else {
	app = firebase.app();
}

async function isLoggedIn() {
	try {
		let res = await SecureStorage.getItemAsync("user"); //.then(res=>{
		if (typeof res == null) return false;
		return true;
	} catch (e) {}
}
async function setUserInSecureStorage(user, type = 0) {
	if (!user) {
		return;
	}
	// SecureStorage.clear();
	let authtype = "email";
	if (type == 1) {
		authtype = "google";
	} else if (type == 2) {
		authtype = "facebook";
	}

	let imageUrl;
	let user2 = { ...user };
	if (typeof user.image === "object") {
		imageUrl = { uri: user.image.uri };
	} else {
		imageUrl = { uri: user.image };
	}
	if (imageUrl.uri.indexOf("http") < 0) {
		//reconstruct the image path when neccessary
		// let url = BaseUrl.replace("/api", "")
		// imageUrl = {uri:url+user.image.uri} ?? {uri:url+user.image}
	}
	user2.image = imageUrl;

	save("user", { ...user2, authtype: authtype }); //.then(res=>console.log(res))
}

async function save(key, value) {
	if (!key) {
		return;
	}
	return await SecureStorage.setItemAsync(key, JSON.stringify(value));
}

async function getSaved(key) {
	if (!key) {
		return;
	}

	let result = await SecureStorage.getItemAsync(key);
	if (result) {
		return JSON.parse(result);
	} else {
		return null;
	}
}

const imageurl = (image) => {
	return image.replace(
		"https://uberlive.website/https%3A/image.",
		"https://image."
	);
};

const getAllusers = async (id) => {
	// user = await getSaved("user")

	var tempDoc = await get("myuser")
		.then((response, i) => {
			let temp = response
				.filter((res) => res.id != id)
				// .filter((res) => res.email == "gboluwagaadeyemi@gmail.com")
				.filter((res) => res.email.indexOf("deleted") == -1)
				.map((res, i) => {
					// if(i == 1){aler(res.image)}

					let img = imageurl(res.image);
					return {
						id: res.id,
						key: i + 1,
						ref: i + 1,
						_id: "" + res.id,
						name: res.nickname,
						email: res.email,
						gender: res.gender,
						phone: res.phone,
						image: { uri: img },
						image2: "res.image",
						match: "67",
						description: "qwer",
						isOnline: true,
						message: "qwrr",
					};
					// }
				});
			// var newtemp = temp.filter(res=>{res.id !==user.id})

			return temp;
		})
		.catch((err) => {
			throw err;
		});

	return tempDoc;
};
// getAllusers()
const getFavourite = async (setData = null) => {
	// let data = [];
	getSaved("user")
		.then((u) => {
			get("favourite/" + u.id).then((response, i) => {
				data = response.map((res, i) => {
					// let img = imageurl(res.image)
					return {
						id: res.id,
						name: res.nickname,
						image: { uri: res.images },
						gender: res.gender,
						email: res.email,
						phone: res.phone,
					};
				});
				if (setData) {
					setData(data);
				}
			});
		})
		.catch((err) => {
			throw err;
		});
	// return data;
};

async function get(url, toke = null, socket = 0) {
	let token = await getSaved("authToken");
	let res = null;
	let finalUrl = BaseUrl + "/" + url;
	let data = null;
	let header = {
		// "Content-Type": "application/json",
		Accept: "application/json",
	};

	if (token) {
		header = {
			// "Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Token ${token}`,
		};
	}
	try {
		res = await fetch(finalUrl, { method: "GET", headers: header });
		data = await res.json();
		if (data) {
			let err = JSON.stringify(data) ?? "";
			if (err.indexOf("Unable to log in") > -1)
				throw "Invalid Username Or Password";
			if (err.indexOf("credentials were not provided.") > -1) {
				throw "Please Login";
			}
			if (err.indexOf("Invalid token") > -1) {
				throw "Please Login";
			}
			return data;
		}
	} catch (err) {
		throw err;
	}
	return data;
}

async function get2(url, toke = null, socket = 0) {
	let token = await getSaved("authToken");
	let res = null;
	let finalUrl = BaseUrl + "/" + url;
	let data = null;
	let header = {
		// "Content-Type": "application/json",
		Accept: "application/json",
	};

	if (token) {
		header = {
			// "Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Token ${token}`,
		};
	}

	try {
		res = await fetch(finalUrl, { method: "GET", headers: header });
		data = await res.text();

		if (data) {
			let err = JSON.stringify(data);
			if (err.indexOf("Unable to log in") > -1)
				throw "Invalid Username Or Password";
			if (err.indexOf("credentials were not provided.") > -1) {
				// logout();
				throw "Please Login";
			}
			if (err.indexOf("Invalid token") > -1) {
				throw "Please Login";
			}
		}
	} catch (err) {
		throw err;
	}

	return data;
	// }
	// throw "Please Login";
}

async function post(url = "posts", formData, aler = null, method = "POST") {
	let res = null;

	let token = await getSaved("authToken");
	let data = null;
	let header = {
		// "Content-Type": "application/json",
		Accept: "application/json",
	};

	if (token) {
		header = {
			// "Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Token ${token}`,
		};
	}

	try {
		res = await fetch(BaseUrl + "/" + url, {
			method: method,
			body: formData,
			mode: "cors",
			cache: "default",
			credentials: "include",
			headers: header,
		});
		let res2 = await res.json();
		let err = JSON.stringify(res2);
		if (err.indexOf("Unable to log in") > -1)
			throw "Invalid Username Or Password";
		if (err.indexOf("credentials were not provided.") > -1) {
			throw "Please Login";
		}
		if (err.indexOf("Invalid token") > -1) {
			throw "Please Login";
		}
		return res2;
	} catch (err) {
		throw err;
	}
}

async function customPost(
	data,
	url = "https://image.uberlive.website/notify.php",
	method = "POST"
) {
	//NO NEED FOR AUTHENTICATION HERE
	let res = null;

	try {
		res = await fetch(url, {
			method: method,
			body: data,
			mode: "cors",
			cache: "default",
			credentials: "include",
		});
		return await res.text();
	} catch (err) {
		throw err;
	}
}

/***/
async function filePost(url = "https://image.uberlive.website", data) {
	//NO NEED FOR AUTHRNTICATION

	try {
		let res = await fetch(url, {
			method: "POST",
			body: data,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return await res.text();
	} catch (err) {
		throw err;
	}
}

async function deleteItem(key = "user") {
	await SecureStorage.deleteItemAsync(key);
}

const addFavourite = async (favourite, user) => {
	if (!favourite) {
		return;
	}

	var formData = new FormData();
	formData.append("person", favourite);
	formData.append("user", user.id);
	try {
		res = await post("favourite/", formData);
	} catch (err) {
		throw err;
	}

	return res;
};

async function getcoin(id = 0) {
	if (id == 0) {
		return;
	}

	try {
		let strcoins = await get("getcoin/" + id);

		if (strcoins) {
			const coins = parseInt(strcoins.coins);
			getSaved("user").then((res) => {
				res.coins = coins;

				setUserInSecureStorage(res);
			});

			return coins;
		}
	} catch (err) {
		throw err;
	}
}

const addHistory = async (type = "callhistory") => {
	await getSaved(type)
		.then((history) => {
			if (!history) history = 0;
			save(type, ++history);
		})
		.catch((err) => {});
};

// const firebase = "";
const firestore = firebase.firestore();
export {
	// db,
	firebase,
	firestore,
	getAllusers,
	app,
	//	logout,
	setUserInSecureStorage,
	isLoggedIn,
	get,
	get2,
	addFavourite,
	getcoin,
	post,
	filePost,
	getSaved,
	save,
	BaseUrl,
	BaseUrl2,
	getFavourite,
	deleteItem,
	customPost,
	addHistory,
};
