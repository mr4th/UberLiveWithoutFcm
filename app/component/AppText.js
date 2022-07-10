import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../config/colors";
// import DefaultStyles from "../config/styles";
export default function AppText({ children, contain = "primary" }) {
	return (
		<View>
			<Text style={styles.container}>{children}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		fontSize: 15,
		paddingVertical: 0,
		color: colors.primary,
		marginTop: -15,
	},
});
