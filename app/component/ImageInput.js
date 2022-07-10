import React, { useEffect } from "react";
import {
	StyleSheet,
	Image,
	View,
	TouchableWithoutFeedback,
	Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";
const ImageInput = ({ imageUri, onChangeImage }) => {
	const requestPermission = async () => {
		const { granted } = await ImagePicker.requestCameraPermissionsAsync();
		if (!granted) alert("permission needed");
	};
	useEffect(() => {
		requestPermission();
	}, []);

	const handlePress = () => {
		if (!imageUri) selectImage();
		else
			Alert.alert("Delete", "Are You Sure You Want To Proceed", [
				{ text: "Yes", onPress: () => onChangeImage(null) },
				{ text: "No" },
			]);
	};

	const selectImage = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 0.5,
			});
			if (!result.cancelled) {
				onChangeImage(result.uri);
			}
		} catch (error) {}
	};
	return (
		<TouchableWithoutFeedback onPress={handlePress}>
			<View style={styles.container}>
				{!imageUri && (
					<View style={styles.icon}>
						<MaterialCommunityIcons
							name="camera"
							size={30}
							color={colors.darkgrey}
						/>
					</View>
				)}
				{imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ImageInput;

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: 100,
		backgroundColor: colors.lightgray,
		borderRadius: 20,
		overflow: "hidden",
	},
	icon: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	image: {
		width: 100,
		height: 100,
	},
});
