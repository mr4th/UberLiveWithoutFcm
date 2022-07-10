import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

export default function AppInput({ icon, ...otherProps }) {
	return (
		<View style={styles.better}>
			<MaterialCommunityIcons size={30} color="gray" name={icon} />
			<TextInput style={styles.inputs} {...otherProps} />
		</View>
	);
}

const styles = StyleSheet.create({
	inputs: {
		fontSize: 20,
	},
	better: {
		backgroundColor: colors.lightgray,
		borderRadius: 10,
		paddingVertical: 8,
		marginVertical: 20,
		flexDirection: "row",
	},
});
