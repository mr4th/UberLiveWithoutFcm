import React, { useState, useContext, useEffect, useRef } from "react";
import { Animated, Dimensions, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import CallNavigator from "./navigation/CallNavigator";
import { LogBox } from "react-native";
// Logo....
import icon from "../assets/icon.png";
import colors from "../config/colors";

const BGColor = colors.primary;

import authStorage from "../auth/storage";
// import { Provider } from "react-redux";
import AuthContext, { UserContext } from "../auth/context";

LogBox.ignoreLogs(["Setting a timer"]);

export default function SplashCallScreen() {
	console.log("I am in SplashCallScreen");
	// SafeArea Value...
	const edges = useSafeAreaInsets();
	const { login, user } = useContext(UserContext);

	const restoreToken = async () => {
		const token = await authStorage.getToken();
		const use = await authStorage.getToken("user");
		if (!token) return;
		login(use);
		return token;
	};
	useEffect(() => {
		(async () => {
			// if(user != null){
			let r = await restoreToken();
			// }
		})();
	}, []);

	// Animation Values....
	const startAnimation = useRef(new Animated.Value(0)).current;

	// Scalinpickcag Down Both logo and Title...
	const scaleLogo = useRef(new Animated.Value(1)).current;
	const scaleTitle = useRef(new Animated.Value(1)).current;

	// Offset Animation....
	const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
	const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

	// Animating COntent...
	const contentTransition = useRef(
		new Animated.Value(Dimensions.get("window").height)
	).current;

	//fetching user data from storage
	// Animation Done....
	useEffect(() => {
		// Starting Animation after 500ms....
		setTimeout(() => {
			// Parallel Animation...
			Animated.parallel([
				Animated.timing(startAnimation, {
					// For same Height for non safe Area Devices...
					toValue: -Dimensions.get("window").height + (edges.top + 50),
					useNativeDriver: true,
				}),
				Animated.timing(scaleLogo, {
					// Scaling to 0.35
					toValue: 0.3,
					useNativeDriver: true,
				}),
				Animated.timing(scaleTitle, {
					// Scaling to 0.8
					toValue: 0.8,
					useNativeDriver: true,
				}),
				Animated.timing(moveLogo, {
					// Moving to Right Most...
					toValue: {
						x: Dimensions.get("window").width / 2 - 35,
						y: Dimensions.get("window").height / 2 - 5,
					},
					useNativeDriver: true,
				}),
				Animated.timing(moveTitle, {
					// Moving to Right Most...
					toValue: {
						x: 0,
						// Since image size is 100...
						y: Dimensions.get("window").height / 2 - 90,
					},
					useNativeDriver: true,
				}),
				Animated.timing(contentTransition, {
					toValue: 0,
					useNativeDriver: true,
				}),
			]).start();
		}, 500);
	}, []);

	// Going to Move Up like Nav Bar...
	return (
		<View
			style={{
				position: "absolute",
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
			}}
		>
			<Animated.View
				style={{
					flex: 1,
					backgroundColor: BGColor,
					zIndex: 1,
					transform: [{ translateY: startAnimation }],
				}}
			>
				<Animated.View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Animated.Image
						source={icon}
						style={{
							width: 100,
							height: 100,
							marginBottom: 20,
							transform: [
								{ translateX: moveLogo.x },
								{ translateY: moveLogo.y },
								{ scale: scaleLogo },
							],
						}}
					></Animated.Image>

					<Animated.Text
						style={{
							fontSize: 25,
							fontWeight: "bold",
							color: "white",
							transform: [{ translateY: moveTitle.y }, { scale: scaleTitle }],
						}}
					>
						Uberlive
					</Animated.Text>
				</Animated.View>
			</Animated.View>

			<Animated.View
				style={{
					position: "absolute",
					top: 0,
					bottom: 25,
					left: 0,
					right: 0,
					backgroundColor: "rgba(0,0,0,0.04)",
					transform: [{ translateY: contentTransition }],
				}}
			>
				<NavigationContainer>
					<CallNavigator />
				</NavigationContainer>
				{/* </AuthContext.Provider> */}
			</Animated.View>
		</View>
	);
}
