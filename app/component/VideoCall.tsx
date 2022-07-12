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
import aler from "./Moda";
import {
	getSaved,
	getcoin,
	post,
	get,
	get2,
	save,
	firebase,
	customPost,
	setUserInSecureStorage,
	deleteItem,
} from "../../firebase";
import { BackHandler } from "react-native";

const db = firebase.firestore();

import { useNavigation } from "@react-navigation/native";

const VideoCall = ({ navigation, route: { params } }) => {
	const [videoCall, setVideoCall] = useState(false);
	const [pickCall, setPickCall] = useState(false);
	const [channel, setChannel] = useState(null);
	const [agoraToken, setAgoraToken] = useState(undefined);
	const [user, setUser] = useState({});
	const [receiver, setReceiver] = useState({});
	const [intervalValue, setIntervalValue] = useState(undefined);
	let rec = params?.receiver;

	//Set Channels
	useEffect(() => {
		let channelString = "";
		let input = "abcdefghijklmnopqrstuvwxyz";
		var index = 0;
		for (var i = 0; i < 10; i++) {
			index = Math.floor(Math.random() * 24) + 1;
			channelString += input[index];
		}
		setChannel(channelString);
		setVideoCall(true);
	}, []);

	const callEndedNotification = () => {
		//send call notificatino for ending call
		var formData = new FormData();
		formData.append("submitsubmitsubmit", "submitsubmitsubmit");
		formData.append("name", user?.nickname);
		formData.append("email", params?.receiver?.email);
		formData.append("caller", user?.email);
		formData.append("callerid", user?.id);
		formData.append("type", "endcall");
		formData.append("body", "Call Ended");
		formData.append("channel", channel);
		formData.append("agoraToken", agoraToken); // add this in php

		customPost(formData)
			.then((res) => {})
			.catch((err) => {});
	};

	BackHandler.addEventListener("hardwareBackPress", function () {
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
	});

	useEffect(() => {
		if (rec?.id) {
			setReceiver(rec);
		}
		save("missedcall", true);
		save("endcall", false);
	}, []);

	//set user
	useEffect(() => {
		getSaved("user").then((res) => {
			if (res == null) {
				return navigation.navigate("Home");
			}
			getcoin(res?.id)
				.then((coins) => {
					res.coins = coins;

					if (coins < 10) {
						alert("You don't have enough coins to call this user");
						return navigation.navigate("Home");
					}
					setUser(res);
				})
				.catch();
		});
	}, []);

	//send call notification if the person initiates the call
	useEffect(() => {
		(() => {
			if (Object.keys(user).length > 0) {
				if (user.coins < 10) {
					return navigation.navigate("Home");
				}

				console.log(channel, user.email, receiver.email);
				if (channel) {
					//record call in backend
					let history = {
						persons: [receiver?.id],
						sender: {
							_id: user?.id,
							name: user?.nickname,
							email: user?.email,
							avatar: user?.image.uri,
							gender: user?.gender,
							phone: user?.phone,
						},
						createdAt: new Date(),
					};
					db.collection("callhistory").doc(channel).set(history);
					//send call notification incomingcall
					var formData = new FormData();
					formData.append("submitsubmitsubmit", "submitsubmitsubmit");
					formData.append("email", receiver?.email);
					formData.append("name", user?.nickname);
					formData.append("caller", user?.email);
					formData.append("type", "call");
					formData.append("body", "Incoming Call");
					formData.append("channel", channel);
					// formData.append("agoraToken", "agoraToken"); // add this in php

					customPost(formData)
						.then((res) => {})
						.catch((err) => {});
				}
			}
		})();
	}, [channel, user]);

	useEffect(() => {
		//Every call initiated ends in 23 sec except if recieved

		if (channel) {
			setTimeout(() => {
				getSaved("missedcall")
					.then((res) => {
						if (res == true) {
							setVideoCall(false);
							navigation.navigate("Home");
						} else {
							setPickCall(true);
						}
					})
					.catch((err) => {});
			}, 23000);
		}
	}, [channel]);

	useEffect(() => {
		let counter = 1;
		let counter2 = 1;

		let myInterval = setInterval(() => {
			if (!intervalValue) {
				setIntervalValue(myInterval);
			}
			getSaved("missedcall").then((res) => {
				if (res === false) {
					//This setInterval refreshes every 2 seconds but charges once every minute
					if (counter2 % 30 == 1) {
						let newuser = { ...user };
						getSaved("user").then((res) => {
							if (res.coins < 10) {
								alert("Call Ended Because you have Insufficent Coins");
								clearInterval(myInterval);
								save("endcall", true);
								callEndedNotification();
								setVideoCall(false);
								navigation.navigate("Home");
								return;
							}
							get2("chargecall/" + res.id).then((res) => {});
							newuser = { ...res };
							newuser.coins = res?.coins - 10;
							setUser(newuser);

							setUserInSecureStorage(newuser);
						});
					}
					counter2++;
				}
			});

			getSaved("endcall")
				.then((endcall) => {
					counter++;
					if (!pickCall && counter >= 12) {
						clearInterval(myInterval);
					}

					if (endcall == true) {
						clearInterval(myInterval);

						setVideoCall(false);
						navigation.navigate("Home");
					}
				})
				.catch((err) => alert(err));
		}, 2000);
	}, [pickCall]);

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
				if (intervalValue !== undefined) {
					// clearInterval(intervalValue);
				}
				callEndedNotification();
				setVideoCall(false);
				navigation.navigate("Home");
			},
		},
	};
	// }
	//return {channel ? <View></View><AgoraUIKit rtcProps={props.rtcProps} callbacks={props.callbacks} /></View></View>:null}

	return videoCall ? (
		<View>
			<AgoraUIKit rtcProps={props.rtcProps} callbacks={props.callbacks} />
		</View>
	) : null;
};

export default VideoCall;

const styles = StyleSheet.create({});
