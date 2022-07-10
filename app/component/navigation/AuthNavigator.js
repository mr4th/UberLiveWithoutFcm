/*import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";

import Forms from "../Forms";
import LoginScreen from "../LoginScreen";
import WelcomeScreen from "../WelcomeScreen";
import Chats from "../Chats";
import { Home, Profile, Messages, Matches, CallHistory } from "../../screens";
import BuyCoins from "../../screens";
import Coins from "../Coins";
import VideoCall from "../VideoCall";
import UserProfile from "../UserProfile";
import AuthContext, { UserContext } from "../../auth/context";
import CryptoPay from "../CryptoPay";
import PasswordReset from "../PasswordReset";

import {
	NotificationListener,
	requestUserPermission,
	GetFCMToken,
} from "../../utils/pushnotification_helper";
*/
const AuthNavigator = () => {
/*	const { user } = useContext(UserContext);
	const Drawer = createNativeStackNavigator();
	const navigation = useNavigation();
	const [loading, setLoading] = useState(true);
	// const [initialRoute, setInitialRoute] = useState("Chats");

	useEffect(() => {
		// Assume a message-notification contains a "type" property in the data payload of the screen to open

		messaging().onNotificationOpenedApp((remoteMessage) => {
			console.log(
				"Notification caused app to open from background state:",
				remoteMessage.notification
			);
			if (remoteMessage.data.type === "call")
				navigation.navigate("CallHistory");
			if (remoteMessage.data.type === "chat") navigation.navigate("Messages");
		});

		// Check whether an initial notification is available
		messaging()
			.getInitialNotification()
			.then((remoteMessage) => {
				if (remoteMessage) {
					console.log(
						"Notification caused app to open from quit state:",
						remoteMessage.notification
					);
					// setInitialRoute(remoteMessage.data.type == "chat"); // e.g. "Settings"
				}
				setLoading(false);
			});
	}, []);

	if (loading) {
		return null;
	}
	return (
		<Drawer.Navigator>
			{/* <Stack.Screen
			name="Welcome"
			component={WelcomeScreen}
			options={{ headerShown: false }}
		/> */}
			{/* <Stack.Screen
			name="Login"
			component={LoginScreen}
			options={{ headerShown: false }}
		/> */}
			{/*<Stack.Screen
			name="Register"
			component={Forms}
			options={{ headerShown: false }}
		/> *}
			<Drawer.Screen
				name="Home"
				component={Home}
				options={{ headerShown: false }}
			/>
			<Drawer.Screen
				name="Profile"
				component={Profile}
				options={{ headerShown: false }}
			/>
			<Drawer.Screen
				name="Messages"
				component={Messages}
				options={{ headerShown: false }}
			/>
			<Drawer.Screen
				name="Chats"
				component={Chats}
				options={{ headerShown: false }}
			/>

			<Drawer.Screen
				name="Coins"
				component={Coins}
				options={{ headerShown: false }}
			/>

			

			<Drawer.Screen
				name="VideoCall"
				component={VideoCall}
				options={{ headerShown: false }}
			/>

			<Drawer.Screen
				name="Match"
				component={Matches}
				options={{ headerShown: false }}
			/>
			<Drawer.Screen
				name="UserProfile"
				component={UserProfile}
				options={{ headerShown: false }}
			/>
			<Drawer.Screen
				name="Crypto"
				component={CryptoPay}
				options={{ headerShown: false }}
			/>
			<Drawer.Screen
				name="PasswordReset"
				component={PasswordReset}
				options={{ headerShown: false }}
			/>
			<Drawer.Screen
				name="CallHistory"
				component={CallHistory}
				options={{ headerShown: false }}
			/>
		</Drawer.Navigator>
	);
	*/

	return <View></View>
};
export default AuthNavigator;
