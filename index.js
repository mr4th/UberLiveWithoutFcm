import { AppRegistry } from "react-native";
import "expo-dev-client";
import messaging from "@react-native-firebase/messaging";
import { DeviceEventEmitter, DevSettings } from "react-native";
// import IncomingCall from "react-native-incoming-call";
// import RNDrawOverlay from "react-native-draw-overlay";
import "react-native-gesture-handler";
import { useNotification } from "./app/utils/useNotification";
import App from "./App";
//import { UserContext } from "./app/auth/context";
import {
	customPost,
	save,
	getSaved,
	firebase,
	deleteItem,
	addHistory,
} from "./firebase";

import { registerRootComponent } from "expo";
// const { displayNotification } = useNotification();
// Register background handler
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
// 	console.log(remoteMessage);
// 	if (remoteMessage.notification.type == "chat") {
// 		//displayNotification("You Have A Chat", "From " + remoteMessage?.data?.name);
// 	} else if (remoteMessage?.data?.type === "call") {
// 		// Display incoming call activity.

// 		save("isMissedCall", true);
// 		save("caller", remoteMessage?.data?.caller);

// 		save("endcall", false);
// 		save("channel", remoteMessage?.data?.channel);

// 		// TODO: What to do with the module?
// 		RNDrawOverlay.askForDispalayOverOtherAppsPermission()
// 			.then((res) => {
// 				// res will be true if permission was granted
// 				// IncomingCall.display(
// 				// 	"callUUIDv4", // Call UUID v4
// 				// 	remoteMessage.data.name, // Username
// 				// 	remoteMessage.notification.android.smallIcon, // Avatar URL
// 				// 	"Incomming Call", // Info text
// 				// 	19000 // Timeout for end call after 20s
// 				// );

// 				setTimeout(() => {
// 					getSaved("isMissedCall")
// 						.then((isMissedCall) => {
// 							if (isMissedCall) {
// 								deleteItem("isMissedCall");
// 								addHistory("callhistory");
// 								displayNotification("Missed Call", remoteMessage.data.body);
// 							}
// 						})
// 						.catch((err) => {});
// 				}, 20000);
// 			})
// 			.catch((e) => {
// 				// permission was declined
// 			});
// 	}
// 	// }
// 	if (remoteMessage?.notification?.title === "missedcall") {
// 		// displayNotification("Missed Call", "From " + remoteMessage.data.name);
// 	}

// 	// Listen to headless action events
// 	DeviceEventEmitter.addListener("endCall", (payload) => {
// 		const db = firebase.firestore();
// 		db.collection("callhistory").doc(remoteMessage.data.channel).delete();
// 		deleteItem("isMissedCall");
// 		// End call action here
// 		var formData = new FormData();
// 		formData.append("submitsubmitsubmit", "submitsubmitsubmit");
// 		formData.append("name", remoteMessage?.data?.caller);
// 		formData.append("email", remoteMessage?.data?.caller);
// 		formData.append("type", "endcall");
// 		formData.append("body", "Incoming Call");

// 		customPost(formData)
// 			.then((res) => {})
// 			.catch((err) => {});
// 	});
// 	DeviceEventEmitter.addListener("answerCall", async (payload) => {
// 		if (payload.isHeadless) {
// 			// Called from killed state
// 			IncomingCall.openAppFromHeadlessMode(payload.uuid);
// 		} else {
// 			// Called from background state
// 			IncomingCall.backToForeground();
// 		}
// 		//save this so that when I end the call in videocall2, I can send fcm to the caller
// 		deleteItem("isMissedCall");
// 		await save("caller", remoteMessage?.data?.caller);

// 		await save("endcall", false);
// 		await save("channel", remoteMessage?.data?.channel);

// 		// save("agoraToken", remoteMessage?.data?.agoraToken);

// 		var formData = new FormData();
// 		formData.append("submitsubmitsubmit", "submitsubmitsubmit");
// 		formData.append("name", remoteMessage?.data?.caller);
// 		formData.append("email", remoteMessage?.data?.caller);
// 		formData.append("type", "answercall");
// 		formData.append("body", "Incoming Call");

// 		customPost(formData)
// 			.then((res) => {})

// 			.catch((err) => {});
// 		// Immediately reload the React Native Bundle
// 		DevSettings.reload();
// 	});
// });

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
// AppRegistry.registerComponent(appName, () => App);
