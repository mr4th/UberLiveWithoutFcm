import React from "react";
import {
	Button,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	View,
} from "react-native";
import { useNotification } from "../utils/useNotification";
const PushNotificatio = () => {
	const {
		displayNotification,
		displayTriggerNotification,
		cancelAllNotifications,
	} = useNotification();

	const handleDisplayNotification = async () => {
		// Display notification
		// displayNotification("incoming Call", "from UberLive");
	};

	const handleCreateTriggerNotification = () => {
		// Display notification in 3 seconds
		displayTriggerNotification(
			// "incoming Call",
			// "from UberLive",
			Date.now() + 3000
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="light-content" />
			<View style={[styles.container, styles.center]}>
				<Button
					title="Display Notification"
					onPress={handleDisplayNotification}
				/>
				<Button
					title="Create Trigger Notification"
					onPress={handleCreateTriggerNotification}
				/>
				<Button
					title="Cancel All Notifications"
					onPress={cancelAllNotifications}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	center: {
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		flex: 1,
	},
});

export default PushNotificatio;
