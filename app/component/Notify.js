import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import {
	NotificationListener,
	requestUserPermission,
	GetFCMToken,
} from "../utils/pushnotification_helper";

const Notify = () => {
	useEffect(() => {
		requestUserPermission();
		NotificationListener();
		GetFCMToken();
	}, []);

	return (
		<View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
			<Text>Notify me</Text>
		</View>
	);
};

export default Notify;

const styles = StyleSheet.create({});
