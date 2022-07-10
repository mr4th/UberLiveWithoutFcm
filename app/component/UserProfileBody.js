import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	Button,
	TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import React, { useState } from "react";
import colors from "../config/colors";
import { Icon } from "../components";
import AppInputText from "./AppInputText";
const UserProfileBody = () => {
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [image, setImage] = useState("");
	const [nickname, setNickname] = useState("");

	return (
		<View style={styles.body}>
			<View style={styles.item}>
				<View style={styles.iconContent}>
					<Icon
						style={styles.icon}
						name="mail"
						size={25}
						color={colors.white}
					/>
				</View>
				<View>
					{/* <TextInput onChangeText={onChangeText} value={text} /> */}
					<TextInput
						onChangeText={(text) => setEmail(text)}
						value={email}
						placeholder="change Email"
						keyboardType="email-address"
						color={colors.white}
						placeholderTextColor={colors.darkgrey}
						style={styles.input}
					/>
				</View>
				<View style={styles.infoContent}>
					<Text style={styles.info}>Email:</Text>
				</View>
			</View>

			<View style={styles.item}>
				<View style={styles.iconContent}>
					<Icon
						style={styles.icon}
						name="aperture"
						size={25}
						color={colors.white}
					/>
				</View>
				<View>
					<TextInput
						onChangeText={(text) => setNickname(text)}
						value={nickname}
						placeholder="change Nick Name"
						keyboardType="default"
						color={colors.white}
						placeholderTextColor={colors.darkgrey}
						style={styles.input}
					/>
				</View>
				<View style={styles.infoContent}>
					<Text style={styles.info}>Nickname</Text>
				</View>
			</View>

			<View style={styles.item}>
				<View style={styles.iconContent}>
					<Icon
						style={styles.icon}
						name="phone-portrait-sharp"
						size={25}
						color={colors.white}
					/>
				</View>
				<View>
					<TextInput
						onChangeText={(text) => setPhone(text)}
						value={phone}
						placeholder="change Phone "
						keyboardType="numeric"
						color={colors.white}
						maxLength={20}
						placeholderTextColor={colors.darkgrey}
						style={styles.input}
					/>
				</View>
				<View style={styles.infoContent}>
					<Text style={styles.info}>Phone:</Text>
				</View>
			</View>

			<View style={styles.icon1}>
				<Button style={styles.icon1} color={colors.primary} title="Logout" />
				<TouchableHighlight>
					<MaterialCommunityIcons
						//style={styles.icon1}
						name=""
						size={24}
						color="black"
					/>
				</TouchableHighlight>
				<Button
					style={styles.icon1}
					color={colors.secondary}
					title="Delete Account"
				/>
			</View>
		</View>
	);
};

export default UserProfileBody;

const styles = StyleSheet.create({
	body: {
		backgroundColor: "transparent",
		height: 500,
		// alignItems: "flex-start",

		backgroundColor: colors.blackalt,
	},
	item: {
		flexDirection: "row-reverse",
	},

	infoContent: {
		flex: 1,
		alignItems: "flex-start",
		paddingLeft: 15,
		justifyContent: "flex-start",
		width: "10%",
	},
	input: {
		width: "80%",
		flex: 1,
		marginTop: 7,
		marginRight: 60,
	},
	iconContent: {
		// flex: 1,
		alignItems: "center",
		width: "25%",
	},
	icon: {
		width: 30,
		height: 30,
		marginTop: 20,
		zIndex: 0,
	},
	info: {
		fontSize: 12,
		marginTop: 20,
		color: colors.primary,
	},
	icon1: {
		color: colors.white,
		width: "80%",
		paddingVertical: 10,
		marginHorizontal: 30,
		marginVertical: 10,
	},
});
