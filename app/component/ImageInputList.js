import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import ImageInput from "./ImageInput";

const ImageInputList = ({ imageUris = [], onAddImage, onRemoveImage }) => {
	return (
		<View style={styles.container}>
			{imageUris.map((uri) => (
				<View style={styles.image}>
					<ImageInput
						imageUri={uri}
						onChangeImage={() => onRemoveImage(uri)}
						key={uri}
					/>
				</View>
			))}
			<ImageInput onChangeImage={(uri) => onAddImage(uri)} />
		</View>
	);
};

export default ImageInputList;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	image: {
		marginRight: 10,
	},
});
