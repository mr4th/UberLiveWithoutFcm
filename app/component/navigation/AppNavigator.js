import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import Weather from "../../spa/Weather";
import TrashItem from "../TrashItem";
import ImageInputList from "../ImageInputList";

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
	useEffect(() => {
		registerForPushNotifications();
	}, []);
	const registerForPushNotifications = async () => {
		try {
			const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			if (!permission.granted) return;
			const token = await Notifications.getExpoPushTokenAsync();
		} catch (error) {}
	};
	return (
		<Tab.Navigator>
			<Tab.Screen name="Trash" component={TrashItem} />
			<Tab.Screen name="Weather" component={Weather} />
			<Tab.Screen name="images" component={ImageInputList} />
		</Tab.Navigator>
	);
};

export default AppNavigator;
