import * as React from "react";
import { StyleSheet, Button, View } from "react-native";

import { Video, AVPlaybackNativeSource, Audio } from "expo-av";
import colors from "../config/colors";
const HomeScreen = () => {
	const [status, setStatus] = React.useState({});
	return (
		<View style={styles.container}>
			<Video
				style={styles.video}
				source={{
					uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
				}}
				useNativeControls
				resizeMode="contain"
				isLooping
				onPlaybackStatusUpdate={(status) => setStatus(() => status)}
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		// backgroundColor: colors.primary,
		// width: "100%",
	},
	video: {
		width: "100%",
		height: 300,
	},
});
