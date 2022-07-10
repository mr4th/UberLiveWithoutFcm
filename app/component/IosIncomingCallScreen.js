import React, { useState } from "react";
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	Dimensions,
	Platform,
	Image,
	View,
	Text,
	Pressable,
	TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { LinearGradient } from "expo-linear-gradient";
import AppButton from "./AppButton";
//import { useState, useEffect } from "react";

import { customPost, save, getSaved, deleteItem } from "../../firebase";

const windowHeight = Dimensions.get("window").height;
export default function IosIncomingCallScreen(props) {
	let calleremail = null;
	let callername = null;
	//useEffect(() => {
	getSaved("callername")
		.then((name) => {
			callername = name;
		})
		.catch((err) => {});

	getSaved("image")
		.then((img) => {
			image = { uri: img };
		})
		.catch((err) => {});
	// }, []);

	// useEffect(() => {
	getSaved("caller")
		.then((email) => {
			calleremail = email;
		})
		.catch((err) => {});
	// }, []);

	const sendCallNotification = (name, email, type, body) => {
		var formData = new FormData();
		formData.append("submitsubmitsubmit", "submitsubmitsubmit");
		formData.append("name", name);
		formData.append("email", email);
		formData.append("type", type);
		formData.append("body", body);

		customPost(formData)
			.then((res) => {})
			.catch((err) => {});
	};

	const answerCall = () => {
		//send answer call notification
		sendCallNotification(callername, calleremail, "answercall", "Answer Call");

		props.setCallState(true);
	};

	const endCall = () => {
		//send endcall notification
		sendCallNotification(callername, calleremail, "endcall", "End Call");
		props.setCallState(false);
	};

	return (
		<SafeAreaView>
			{/* <StatusBar style="light" /> */}
			<LinearGradient
				style={styles.container}
				colors={[colors.secondary, colors.secondary]}
				height={windowHeight}
			>
				<View style={styles.topsection}>
					<Image style={styles.image} source={{ uri: props.image }} />
					<View style={styles.textsection}>
						<Text style={styles.mainname}>{props.name}</Text>
						<Text style={styles.calling}>Calling...from UberLive</Text>
					</View>
				</View>
				<View style={styles.middlesection}>
					<LottieView
						source={require("../assets/calllottie.json")}
						autoPlay
						loop
					/>
				</View>
				<View style={styles.bottomsection}>
					<TouchableOpacity>
						<View style={styles.btn1}>
							<MaterialIcons
								style={styles.pickcallicon}
								name="call"
								size={44}
								color="white"
								onPress={() => {
									answerCall();
								}}
							/>
						</View>
					</TouchableOpacity>

					<TouchableOpacity>
						<View style={styles.btn2}>
							<MaterialIcons
								style={styles.pickcallicon}
								name="call-end"
								size={44}
								color="white"
								onPress={() => {
									endCall();
								}}
							/>
						</View>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		...Platform.select({
			ios: {
				height: "100%",
				width: "100%",
			},
			android: {
				flex: 1,
				paddingTop: StatusBar.currentHeight,
				position: "absolute",
				left: 0,
				right: 0,
				top: 0,
			},
		}),
	},
	topsection: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		marginLeft: 30,
		marginTop: 50,
	},
	image: {
		width: "30%",
		height: "55%",
		borderRadius: 100,
	},
	textsection: {
		paddingLeft: "5%",
		marginVertical: "5%",
	},
	mainname: {
		fontSize: 20,
		fontWeight: "600",
		color: colors.white,
		paddingVertical: "1%",
	},
	calling: {
		fontSize: 15,
		color: colors.white,
	},
	middlesection: {
		flex: 1,
		// backgroundColor: "white",
	},
	banner: {
		fontSize: 20,
	},
	bottomsection: {
		flex: 1,
		// backgroundColor: colors.secondary,
		justifyContent: "flex-end",
		flexDirection: "row",
		alignItems: "flex-end",
	},
	btn1: {
		backgroundColor: "yellowgreen",
		width: "50%",
		height: "37%",
		borderRadius: 100,
		marginVertical: "35%",
		marginHorizontal: "15%",
		alignItems: "center",
		justifyContent: "center",
	},
	btn2: {
		backgroundColor: colors.primary,
		width: "50%",
		height: "37%",
		borderRadius: 100,
		marginVertical: "35%",
		marginHorizontal: "15%",
		alignItems: "center",
		justifyContent: "center",
	},
	pickcallicon: {
		alignSelf: "center",
	},
});
