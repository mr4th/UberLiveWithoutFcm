import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import colors from "../config/colors";
import UserProfileBody from "./UserProfileBody";

const UserProfileHeader = () => {
	return (
		<View style={styles.header}>
			<View style={styles.headerContent}>
				<Image
					style={styles.avatar}
					source={require("../assets/projectImages/six.png")}
				/>

				<Text style={styles.name}>{email} </Text>
				<Text style={styles.userInfo}>{nickname} </Text>
				<Text style={styles.userInfo}>Florida </Text>
				<Text style={styles.userInfo}>{phone} </Text>
			</View>
		</View>
	);
};

export default UserProfileHeader;

const styles = StyleSheet.create({
	header: {
		backgroundColor: colors.primary,
	},
	headerContent: {
		padding: 30,
		alignItems: "center",
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "white",
		marginBottom: 10,
	},
	name: {
		fontSize: 22,
		color: "#000000",
		fontWeight: "600",
	},
	userInfo: {
		fontSize: 16,
		color: "white",
		fontWeight: "600",
	},
});
