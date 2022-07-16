import messaging from "@react-native-firebase/messaging";
import { DeviceEventEmitter, TouchableOpacity } from "react-native";
// import IncomingCall from "react-native-incoming-call-android";
import { useNotification } from "./useNotification";
// import { NavigationRouteContext } from "@react-navigation/native";
// import Messages from "../screens/Messages";
// import React from "react";
import UserProfile from "../component/UserProfile";
// import VideoCall from "../component/VideoCall";
import {
	getSaved,
	getcoin,
	post,
	get,
	save,
	customPost,
	setUserInSecureStorage,
} from "../../firebase";

// import VideoCall from "../component/VideoCall";
// import React from "react";
// import { useNavigation } from "@react-navigation/native";

const {
	displayNotification,
	displayTriggerNotification,
	cancelAllNotifications,
} = useNotification();

export async function requestUserPermission() {
	const authStatus = await messaging().requestPermission();
	const enabled =
		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		authStatus === messaging.AuthorizationStatus.PROVISIONAL;

	if (enabled) {
		console.log("Authorization status:", authStatus);
	}
}
export async function GetFCMToken(email = "0") {
	let fcmtoken = await getSaved("fcmtoken");

	console.log(fcmtoken, "old token");
	if (!fcmtoken) {
		if (email == "0") {
			let res = await getSaved("user");
			email = res?.email;
		}

		if (!email) {
			return;
		}
		try {
			const fcmtoken = await messaging().getToken();
			if (fcmtoken) {
				console.log("new token ", fcmtoken);

				await save("fcmtoken", fcmtoken);

				var formData = new FormData();
				formData.append("createcreatecreate", "createcreatecreate");
				formData.append("fcmtoken", fcmtoken);
				formData.append("email", email);

				//send fcmtoken to server
				customPost(formData)
					.then((res) => {})
					.catch((err) => {});
			} else {
			}
		} catch (e) {
			console.log(e, "error in fcmtoken");
		}
	}
}
export const NotificationListener = () => {
	// Assume a message-notification contains a "type" property in the data payload of the screen to open
	// const navigation = useNavigation();

	messaging().onNotificationOpenedApp((remoteMessage) => {
		if (remoteMessage.data.type == "chat") {
			displayNotification(
				"You Have A Chat",
				"From " + remoteMessage?.data?.name
			);
		} else if (remoteMessage.data.type == "missedcall") {
			displayNotification("Missed Call", remoteMessage.data.body);
		}
		console.log(
			"Notification caused app to open from background state:",
			remoteMessage.notification
		);
	});

	/*
	// Check whether an initial notification is available
	messaging()
		.getInitialNotification()
		.then((remoteMessage) => {
			if (remoteMessage) {
				if (remoteMessage.data.type == "chat") {
					displayNotification(
						"You Have A Chat",
						"From " + remoteMessage?.data?.name
					);
				} else if (remoteMessage.data.type == "missedcall") {
					displayNotification("Missed Call", remoteMessage.data.body);
				}
				console.log(
					"Notification caused app to open from quit state:",
					remoteMessage.notification
				);
			}
		});
		*/
	/*
	messaging().onMessage(async (remoteMessage) => {
		if (remoteMessage.data.type == "chat") {
			displayNotification(
				"You Have A Chat",
				"From " + remoteMessage?.data?.name
			);
		} else if (remoteMessage.data.type == "missedcall") {
			displayNotification("Missed Call", remoteMessage.data.body);
		}

		if (remoteMessage.data.type === "call") {
			// Display incoming call activity.
			/*
			console.log("incoming call.......");
			IncomingCall.display(
				"callUUIDv4", // Call UUID v4
				"Quocs", // Username
				"https://avatars3.githubusercontent.com/u/16166195", // Avatar URL
				"Incomming Call", // Info text
				20000 // Timeout for end call after 20s
			);
			* /
		} else if (remoteMessage.data.type === "pickcall") {
			// 	// Terminate incoming activity. Should be called when call expired.
			save("missedcall", { missedcall: false });
		} else if (remoteMessage.data.type === "endcall") {
			// 	// Terminate incoming activity. Should be called when call expired.
			save("missedcall", { missedcall: false });
		}

		// Listen to headless action events
		DeviceEventEmitter.addListener("endCall", (payload) => {
			// End call action here
			console.log("EndCall");
		});

		DeviceEventEmitter.addListener("answerCall", (payload) => {
			console.log("answerCall", payload);
			if (payload.isHeadless) {
				// Called from killed state
				console.log("answerCall - Called from killed state", payload);
				IncomingCall.openAppFromHeadlessMode(payload.uuid);
			} else {
				// Called from background state
				console.log("answerCallCalled from background state - ", payload);

				IncomingCall.backToForeground();
			}

			//send a notification of the call been picked
			//customPost()
			console.log("message on foreground state ....", remoteMessage);
		});

	});
*/
};
