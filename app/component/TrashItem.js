import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

export default function TrashItem({ navigation }) {
	return (
		<View style={styles.main}>
			<View style={styles.material}>
				<View>
					<MaterialCommunityIcons name="close" size={35} color="white" />
				</View>
				<View>
					<MaterialCommunityIcons
						name="trash-can-outline"
						size={35}
						color="white"
					/>
				</View>
			</View>
			<Image
				style={styles.container}
				source={require("../assets/projectImages/1.jpg")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		backgroundColor: colors.black,
		flex: 1,
	},
	material: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	container: {
		resizeMode: "cover",
		width: "100%",
		// flex:1,
		height: "90%",
	},
});
