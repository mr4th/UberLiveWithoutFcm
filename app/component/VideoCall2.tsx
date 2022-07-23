// import "expo-dev-client";
import {
	PermissionsAndroid,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AgoraUIKit, { PropsInterface } from "agora-rn-uikit";
import Screen from "./Screen";
import { BackHandler, DevSettings } from "react-native";
import {
	getSaved,
	getcoin,
	post,
	deleteItem,
	get,
	save,
	customPost,
	setUserInSecureStorage,
	firebase,
} from "../../firebase";

import { useNavigation } from "@react-navigation/native";
import { ChannelMediaRelayError } from "react-native-agora/src/common/Enums";

const db = firebase.firestore();
const VideoCall2 = ({ navigation, route: { params } }) => {
	const [videoCall, setVideoCall] = useState(false);
	//const [pickCall, setPickCall] = useState(false);
	const [channel, setChannel] = useState(undefined);
	const [agoraToken, setAgoraToken] = useState(undefined);
	const [user, setUser] = useState({});
	const [caller, setCaller] = useState(undefined);
	const [callerid, setCallerId] = useState("");
	const [intervalValue, setIntervalValue] = useState(undefined);

	const callEndedNotification = (val = true) => {
		if (val && channel) {
			//send call notificatino for ending call
			var formData = new FormData();
			formData.append("submitsubmitsubmit", "submitsubmitsubmit");
			formData.append("name", user?.nickname);
			formData.append("email", caller);
			formData.append("caller", user?.email);
			formData.append("type", "endcall");
			formData.append("body", "Call Ended");
			formData.append("channel", channel);
			// formData.append("agoraToken", agoraToken); // add this in php

			customPost(formData)
				.then((res) => {})
				.catch((err) => {});

			//End  Call Sending notfication to myself to end the call

			formData.append("email", user?.email);
			formData.append("type", "changescreen");
			customPost(formData)
				.then((res) => {})
				.catch((err) => {});
		}

		deleteItem("caller");
		// deleteItem("receiver");
		// deleteItem("agoraToken");
		deleteItem("channel");
		deleteItem("missedcall");
		deleteItem("endcall");

		save("reload", "reload");
		navigation.navigate("Home");
	};

	/*BackHandler.addEventListener("hardwareBackPress", function () {
		//callend call function
		callEndedNotification();
		navigation.reset({
			index: 0,
			routes: [
				{
					name: "Home",
				},
			],
		});

		return true;
	});*/

	useEffect(() => {
		save("endcall", false);
		getSaved("caller")
			.then((res) => {
				setCaller(res);
			})
			.catch((err) => {});
	}, []);

	//set user
	useEffect(() => {
		getSaved("user").then((res) => {
			if (res == null) {
				// return navigation.navigate("Home");
			}
			setUser(res);
		});
	}, []);

	//Get agora token
	useEffect(() => {
		if (Object.keys(user).length > 0) {
			//get channel form securestorage
			getSaved("channel")
				.then((res) => {
					if (res) {
						console.log(res, "channels");

						setChannel(res);
						setVideoCall(true);
						//Remove Call from list of missed call in firestore
						db.collection("callhistory").doc(res).delete();
					}
				})
				.catch((err) => {});
		}
	}, [user]);

	useEffect(() => {
		let myInterval = setInterval(() => {
			if (!intervalValue) {
				setIntervalValue(myInterval);
			}
			getSaved("endcall")
				.then((endcall) => {
					if (endcall == true) {
						clearInterval(myInterval);

						//end call and send notification
						callEndedNotification(false);
						setVideoCall(false);
						// setTimeout(() => navigation.navigate("Home"), 700);
					}
				})
				.catch((err) => {});
		}, 2000);
	}, []);

	// if (videoCall) {
	let props: PropsInterface = {
		rtcProps: {
			appId: "4dc7a5a1926c43c0937a78c5dea33ef9",
			channel: channel,
			uid: user?.id,
			//token: agoraToken,
		},
		callbacks: {
			EndCall: () => {
				//post endcall
				callEndedNotification();
				setVideoCall(false);

				if (intervalValue !== undefined) {
					clearInterval(intervalValue);
				}

				// setTimeout(() => navigation.navigate("Home"), 700);
			},
		},
	};
	// }

	return (
		<>
			{videoCall ? (
				<AgoraUIKit rtcProps={props.rtcProps} callbacks={props.callbacks} />
			) : (
				<Text>Loading Video Call...</Text>
			)}
		</>
	);
	//null;
};

export default VideoCall2;

const styles = StyleSheet.create({});
