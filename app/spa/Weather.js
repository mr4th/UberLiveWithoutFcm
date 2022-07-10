import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppPicker from "../component/AppPicker";
import colors from "../config/colors";
import AppText from "../component/AppText";
export default function Weather() {
	return (
		<>
			<View style={styles.main}>
				<ImageBackground
					source={require("../assets/projectImages/bg.jpg")}
					style={styles.backround}
					blurRadius={0.3}
				>
					<Text style={styles.text}>Where Do You Want To Travel To</Text>
					{/* <View style={styles.child} /> */}
				</ImageBackground>
				<View style={styles.icons}>
					<MaterialCommunityIcons
						style={styles.icon}
						color={colors.secondary}
						name="home"
						size={20}
					/>

					<MaterialCommunityIcons
						name="layers-search-outline"
						size={20}
						color={colors.secondary}
						style={styles.icon}
					/>
				</View>
				<View style={styles.picker}>
					<AppPicker
						colo={styles.stubornPicker}
						placeholder="Select Destination"
					></AppPicker>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	main: {
		flex: 0.2,
	},
	backround: {
		resizeMode: "cover",
		width: "100%",
		height: 300,
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.8)",
	},

	picker: {
		color: colors.secondary,
		paddingHorizontal: 80,
		position: "relative",
		top: -40,
	},
	text: {
		fontSize: 20,
		textAlign: "center",
		marginTop: 30,
		color: colors.secondary,
	},
	icons: {
		paddingVertical: 20,
		flex: 1,
		marginVertical: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 100,
	},
	icon: {
		backgroundColor: colors.white,
		padding: 15,
		borderRadius: 300,
		width: 50,
		height: 50,
	},
	stubornPicker: {
		backgroundColor: colors.secondary,
		height: 70,
		borderRadius: 40,
		alignItems: "center",
	},
});
