import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";
export default function AppButton({
	onPress,
	title,
	color = "primary",
	textColor = "white",
}) {
	return (
		<TouchableOpacity
			style={[styles.myButton, { backgroundColor: colors[color], height: 40 }]}
			onPress={onPress}
		>
			<Text style={(styles.LoginText, { color: colors[textColor] })}>
				{title}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	myButton: {
		backgroundColor: colors.primary,
		width: "90%",
		padding: 3,
		flex: 0.1,
		margin: 10,
		position: "relative",
		top: 40,
		borderRadius: 50,
		elevation: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	LoginText: {
		textAlign: "center",
		color: colors.white,
		fontSize: 15,
		fontWeight: "bold",
		marginTop: -8,
	},
});
