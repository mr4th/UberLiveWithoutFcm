import React from "react";
import { Button, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export default function Preloader() {
	return (
		<View style={[StyleSheet.absoluteFill, styles.container]}>
			<LottieView
				source={require("../assets/load.json")}
				autoPlay
				loop
				speed={3}
			/>
			{/* source={require("../assets/preloader.json")} 	autoPlay loop />*/}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "rgba(0,0,0,0.3)",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 1,
	},
})