import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import colors from "../../config/colors";
export default function ListItemDetails({ title, subtitle, image }) {
	console.log(title);
	return (
		<View style={styles.listDetails}>
			<Image style={styles.myimg} source={image} />

			<View style={styles.allText}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.subtitle}>{subtitle}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	listDetails: {
		flex: 1,
		marginVertical: -130,
		padding: 30,
		flexDirection: "row",
	},

	myimg: {
		width: "30%",
		height: "30%",
		borderRadius: 100,
	},

	allText: {
		position: "relative",
		left: 20,
	},

	title: {
		fontSize: 30,
		fontWeight: "bold",
	},

	title: {
		fontSize: 30,
		fontWeight: "bold",
		opacity: 0.8,
		color: colors.darkgrey,
	},

	subtitle: {
		fontSize: 20,
		color: colors.grey,
		opacity: 0.8,
	},
});
