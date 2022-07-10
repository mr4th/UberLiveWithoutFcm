import React from "react";
import { SafeAreaView, StyleSheet, StatusBar, Dimensions } from "react-native";
import colors from "../config/colors";
import { LinearGradient } from "expo-linear-gradient";
export default function Screen({ children }) {
	const windowHeight = Dimensions.get("window").height;
	return (
		<SafeAreaView>
			<StatusBar style="light" />
			<LinearGradient
				style={styles.container}
				colors={["transparent", colors.secondary]}
				height={windowHeight}
			>
				{children}
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,

		// backgroundColor: colors.secondary,
	},
});
