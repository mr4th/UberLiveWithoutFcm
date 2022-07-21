import messaging from "@react-native-firebase/messaging";
import React, { useState, useEffect, useContext } from "react";
import Screen from "./app/component/Screen";
import SplashCallScreen from "./app/component/SplashCallScreen";
import SplashScreen from "./app/component/SplashScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox, View } from "react-native";
import authStorage from "./app/auth/storage";
import { DeviceEventEmitter, Platform } from "react-native";
import { v4 as uuidv4 } from "uuid";

// import { Provider } from "react-redux";
import { UserProvider, UserContext } from "./app/auth/context";
import Notify from "./app/component/Notify";
import {
	NotificationListener,
	requestUserPermission,
	GetFCMToken,
} from "./app/utils/pushnotification_helper";
import displayNotification from "./app/utils/useNotification";
import { customPost, save, getSaved, deleteItem } from "./firebase";
import { IosIncomingCallScreen } from "./app/component/IosIncomingCallScreen";
LogBox.ignoreLogs(["Setting a timer"]);

import RNCallKeep from "react-native-callkeep";

const options = {
	android: {
		alertTitle: "Permissions required",
		alertDescription: "This application needs to access your phone accounts",
		cancelButton: "Cancel",
		okButton: "ok",
		imageName: "phone_account_icon",
		// additionalPermissions: [PermissionsAndroid.PERMISSIONS.example],
		// Required to get audio in background when using Android 11
		foregroundService: {
			channelId: "com.uberlive",
			channelName: "Foreground service for my app",
			notificationTitle: "My app is running on background",
			notificationIcon: "Path to the resource icon of the notification",
		},
	},
};

RNCallKeep.setup(options).then((accepted) => {});

const App = () => {
	// const [user, setUser] = useState();
	const [call, setCall] = useState(false);
	const [user, setUser] = useState(undefined);
	const [incoming, setIncoming] = useState(true);
	const [RNLinked, setRNLinked] = useState(false);
	//const [ caller, setCaller ] = useState(undefined);

	useEffect(() => {
		if (__DEV__ && typeof global.crypto !== "object") {
			global.crypto = {
				getRandomValues: (array) =>
					array.map(() => Math.floor(Math.random() * 256)),
			};
		}

		const uniqueString = uuidv4();
		// console.log("uniqueString", uniqueString);
		// RNCallKeep.displayIncomingCall(
		// 	uniqueString,
		// 	"remoteMessage?.data?.name",
		// 	(localizedCallerName = "remoteMessage?.data?.name"),
		// 	(handleType = "number"),
		// 	(hasVideo = true)
		// );
	}, []);

	const linkUpFCMToRNCallKeep = () => {
		messaging().onMessage(async (remoteMessage) => {
			console.log(
				"!!!Message handled in the App foreground!!!!!",
				remoteMessage
			);

			let caller = "";
			let incoming = "";
			if (remoteMessage?.data?.type == "chat") {
				displayNotification(
					remoteMessage.notification.title,
					remoteMessage.notification.body
				);
			} else if (remoteMessage?.data?.type === "call") {
				console.log("I'm here in call!");
				// To use within this component
				caller = remoteMessage?.data?.caller;

				//To know when to close the pop up if the user ends it before i pick
				incoming = 1;

				const uniqueString = uuidv4();

				RNCallKeep.displayIncomingCall(
					uniqueString,
					remoteMessage?.data?.name,
					(localizedCallerName = remoteMessage?.data?.name),
					(handleType = "number"),
					(hasVideo = true)
				);
				save("missedcall", true);
				save("isMissedCall", true);

				setTimeout(() => {
					getSaved("isMissedCall")
						.then((isMissedCall) => {
							if (isMissedCall) {
								console.log("We're supposed to stop the call!");
								addHistory("callhistory");
								RNCallKeep.endCall(uniqueString);

								displayNotification("Missed Call", remoteMessage.data.body);
							}
						})
						.catch((err) => {});
				}, 20000);
			} else if (remoteMessage?.data?.type === "endcall") {
				// Terminate incoming activity. Should be called when call expired.
				if (incoming == 1) {
					//Close pop up when call has not been answered by me
					RNCallKeep.endCall(uniqueString);
					incoming = 0;
					alert(
						"Ending call because the caller ended the call before I picked"
					);
				}
				save("endcall", true);
				setTimeout(() => setCall(false), 2500);

				deleteItem("caller");
				deleteItem("receiver");
				deleteItem("agoraToken");
				deleteItem("channel");
				deleteItem("missedcall");
			}
			if (remoteMessage?.data?.type === "changescreen") {
				console.log("About to Change to SplashScreen");
				//Reciever ended Call and needs to leave  allscreen
				setCall(false);
			} else if (remoteMessage?.data?.type === "answercall") {
				// Call Received so set missed call to false so that call will not terminate in caller videocall component
				save("missedcall", false);
			}

			RNCallKeep.addEventListener("endCall", ({ callUUID }) => {
				RNCallKeep.endCall(callUUID);
				sendCallNotification(
					remoteMessage?.data?.name,
					remoteMessage?.data?.caller,
					"endcall",
					"End Call"
				);

				//delete Missed Call From Firebase
				if (remoteMessage.data.channel) {
					try {
						const db = firebase.firestore();
						db.collection("callhistory")
							.doc(remoteMessage.data.channel)
							.delete();
					} catch (err) {}
				}

				deleteItem("isMissedCall");
				RNCallKeep.removeEventListener("endCall");
			});

			RNCallKeep.addEventListener("answerCall", ({ callUUID }) => {
				// Call should end when (me) the receiver termiantes the call
				save("endcall", false);
				save("isMissedCall", false);
				//save this so that when I end the call in videocall2, I can send fcm to the caller
				save("caller", remoteMessage?.data?.caller);

				save("channel", remoteMessage?.data?.channel);

				// save("agoraToken", remoteMessage?.data?.agc, oraToken);
				console.log("...App navigate to call2 now..." + call);

				//delete Missed Call From Firebase
				if (remoteMessage.data.channel) {
					try {
						const db = firebase.firestore();
						db.collection("callhistory")
							.doc(remoteMessage.data.channel)
							.delete();
					} catch (err) {}
				}
				RNCallKeep.endCall(callUUID);
				sendCallNotification(
					remoteMessage?.data?.name,
					remoteMessage?.data?.caller,
					"answercall",
					"Answer Call"
				);

				deleteItem("isMissedCall");
				RNCallKeep.removeEventListener("answerCall");
				console.log("asdfdkflgjdfl;");
				setCall(true);
			});
		});
	};
	//End of Linking FCM to RNCallKeep

	const addHistory = async (type = "callhistory") => {
		await getSaved(type)
			.then((history) => {
				// console.log(type, history);
				if (!history) history = 0;
				//console.log("His", history);
				save(type, ++history);
			})
			.catch((err) => {});
	};

	if (!RNLinked) {
		linkUpFCMToRNCallKeep();
		setRNLinked(true);
	}

	const sendCallNotification = (name, caller, type, body) => {
		var formData = new FormData();
		formData.append("submitsubmitsubmit", "submitsubmitsubmit");
		formData.append("name", name);
		formData.append("email", caller);
		formData.append("type", type);
		formData.append("body", body);

		customPost(formData)
			.then((res) => {
				// console.log("fcmtoken ", res);
			})
			.catch((err) => {
				alert("Error With Token");
			});
	};

	const restoreToken = async () => {
		const token = await authStorage.getToken();
		if (!token) return;

		return token;
	};

	useEffect(() => {
		getSaved("user")
			.then((user) => {
				setUser(user);
			})
			.catch((err) => {});
	}, []);

	useEffect(() => {
		requestUserPermission();
		// console.log("App -> navigation", navigation);
		NotificationListener();
		GetFCMToken();
	}, []);

	useEffect(() => {
		// console.log(IncomingCall);
		restoreToken();
	}, []);

	// useEffect(() => {
	//   alert(call);
	// }, [call]),

	const fun1 = (option) => {
		setCall(option);
		setIncoming(false);
	};

	return (
		<Screen>
			{call ? (
				<SafeAreaProvider>
					<UserProvider>
						<SplashCallScreen></SplashCallScreen>
					</UserProvider>
				</SafeAreaProvider>
			) : (
				<SafeAreaProvider>
					<UserProvider>
						<SplashScreen></SplashScreen>
					</UserProvider>
				</SafeAreaProvider>
			)}

			{/* {incoming ? <IosIncomingCallScreen setCallState={fun1} /> : null} */}
		</Screen>
	);
	// return (
	//   <View>
	//     {RNCallKeep.displayIncomingCall(
	//       "7a520873-f12b-4e22-9242-0be2482b0508",
	//       "email",
	//       (localizedCallerName = ""),
	//       (handleType = "number"),
	//       (hasVideo = false)
	//     )}
	//   </View>
	// );
};

export default App;
