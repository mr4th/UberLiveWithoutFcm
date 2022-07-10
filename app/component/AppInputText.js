import React, { useState } from "react";
import {
	StyleSheet,
	Platform,
	StatusBar,
	Text,
	TextInput,
	View,
} from "react-native";

import colors from "../config/colors";

import DefaultStyles from "../config/styles";

export default function AppInputText() {
	const [firstName, setFirstName] = useState("");
	return (
		<>
			<Text>{firstName}</Text>
			<TextInput
				maxLength={5}
				keyboardType="numeric"
				secureTextEntry
				style={DefaultStyles.container}
				placeholder="First Name"
				onChangeText={(text) => setFirstName(text)}
			/>
		</>
	);
}

const styles = StyleSheet.create({});
