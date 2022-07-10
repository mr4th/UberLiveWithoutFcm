// import "expo-dev-client";
// import messaging from "@react-native-firebase/messaging";
import React, { useState, useEffect, useContext } from "react";
// import AuthNavigator from "./app/component/navigation/AuthNavigator";
import Screen from "./app/component/Screen";
import SplashCallScreen from "./app/component/SplashCallScreen";
import SplashScreen from "./app/component/SplashScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox } from "react-native";
import authStorage from "./app/auth/storage";
import { DeviceEventEmitter, Platform } from "react-native";
import IncomingCall from "react-native-incoming-call-android";

// import { Provider } from "react-redux";
import { UserProvider, UserContext } from "./app/auth/context";
// import {
// 	NotificationListener,
// 	requestUserPermission,
// 	GetFCMToken,
// } from "./app/utils/pushnotification_helper";
import displayNotification from "./app/utils/useNotification";
// import VideoCall from "./app/component/VideoCall";
import {
	customPost,
	save,
	firebase,
	getSaved,
	deleteItem,
	addHistory,
} from "./firebase";
LogBox.ignoreLogs([
	"Setting a timer",
	"AsyncStorage has been extracted from react-native core and will be removed in a future release.",
	"Can't perform a React state update on an unmounted component.",
	"Cannot update a component (`VideoCall`) while rendering a different component (`RtcConfigure`)",
	"Possible Unhandled Promise Rejection (id: 0):",
]);

const App = () => {
	const [call, setCall] = useState(false);

	const restoreToken = async () => {
		const token = await authStorage.getToken();
		if (!token) return;

		return token;
	};

	useEffect(() => {
		getSaved("user")
			.then((user) => {})
			.catch((err) => {});
	}, []);

	useEffect(() => {
		getSaved("caller")
			.then((email) => {
				if (email) {
					setCall(true);
				}
			})
			.catch((err) => {});
	}, []);

	// useEffect(() => {
	// 	// requestUserPermission();
	// 	// NotificationListener();
	// 	// GetFCMToken();
	// }, []);

	useEffect(() => {
		restoreToken();
	}, []);
	// useEffect(() => {
		/*
		messaging().onMessage(async (remoteMessage) => {
			if (remoteMessage?.data?.type == "chat") {
				displayNotification(
					"You Have A Chat",
					"From " + remoteMessage?.data?.name
				);
			} else if (remoteMessage?.data?.type === "call") {
				//to prevent fcm multiple call. Noted: clear after callismissed, call iscut here, or ended in videocall2
				let checkCaller = await getSaved("caller");
				if (checkCaller) {
					// console.log("caller is same");
					if (checkCaller != remoteMessage?.data?.caller) {
						//send notification that user is on another call (body will be am alert)
					}
					return;
				}
				// console.log("caller is different");
				// Call should end when (me) the receiver termiantes the call
				save("endcall", false);
				//To use within this component

				//To know when to close the pop up if the user ends it before i pick

				if (Platform.OS === "android") {
					//Pop up code
					IncomingCall.display(
						"callUUIDv4", // Call UUID v4
						remoteMessage.data.name, // Username
						remoteMessage.data.icon, // Avatar URL
						"Incomming Call", // Info text
						19000 // Timeout for end call after 19s
					);
				}
				save("isMissedCall", true);

				// setIncoming(true);

				setTimeout(() => {
					getSaved("isMissedCall")
						.then((isMissedCall) => {
							if (isMissedCall) {
								deleteItem("isMissedCall");
								addHistory("callhistory");
								displayNotification("Missed Call", remoteMessage.data.body);
							}
						})
						.catch((err) => {});
				}, 20000);
			} else if (remoteMessage?.data?.type === "endcall") {
				// Terminate incoming activity. Should be called when call expired.

				save("endcall", true);
				setTimeout(() => setCall(false), 2500);

				deleteItem("caller");
				deleteItem("channel");
				deleteItem("missedcall");
			}
			if (remoteMessage?.notification?.title === "missedcall") {
				// displayNotification("Missed Call", "From " + remoteMessage.data.name);
			} else if (remoteMessage?.data?.type === "answercall") {
				// Call Received so set missed call to false so that call will not terminate in caller videocall component
				save("missedcall", false);
			}

			// Listen to headless action events

			// deleteItem("endCallListener");
			let endCallListener = DeviceEventEmitter.addListener(
				"endCall",
				(payload) => {
					deleteItem("isMissedCall");
					const db = firebase.firestore();
					// console.log(remoteMessage.data.channel, "channel for firebase");
					if (remoteMessage.data.channel) {
						db.collection("callhistory")
							.doc(remoteMessage.data.channel)
							.delete();
					}
					//send endcall notification
					var formData = new FormData();
					formData.append("submitsubmitsubmit", "submitsubmitsubmit");
					formData.append("name", remoteMessage.data.name);
					formData.append("email", remoteMessage.data.caller);
					formData.append("type", "endcall");
					formData.append("body", "End Call");

					customPost(formData)
						.then((res) => {})
						.catch((err) => {});
					endCallListener.remove();
				}
			);

			let answerCallListener = DeviceEventEmitter.addListener(
				"answerCall",
				async (payload) => {
					deleteItem("isMissedCall");

					//save this so that when I end the call in videocall2, I can send fcm to the caller
					await save("caller", remoteMessage?.data?.caller);

					await save("channel", remoteMessage?.data?.channel);

					// save("agoraToken", remoteMessage?.data?.agoraToken);

					if (payload.isHeadless) {
						// Called from killed state
						IncomingCall.openAppFromHeadlessMode(payload.uuid);
					} else {
						// Called from background state
						IncomingCall.backToForeground();
					}

					var formData = new FormData();
					formData.append("submitsubmitsubmit", "submitsubmitsubmit");
					formData.append("name", remoteMessage.data.name);
					formData.append("email", remoteMessage.data.caller);
					formData.append("type", "answercall");
					formData.append("body", "Answer Call");

					customPost(formData)
						.then((res) => {})
						.catch((err) => {});
					setCall(true);
					answerCallListener.remove();
				}
			);
		});
		*/
	// }, []);

	return (
		<Screen>
			{call ? (
				<SafeAreaProvider>
					<UserProvider>
						{/* <SplashCallScreen></SplashCallScreen> */}
					</UserProvider>
				</SafeAreaProvider>
			) : (
				<SafeAreaProvider>
					<UserProvider>
						<SplashScreen></SplashScreen>
					</UserProvider>
				</SafeAreaProvider>
			)}
			{/* <PushNotificatio /> */}
			{/* <Notify /> */}
		</Screen>
	);
};

export default App;
