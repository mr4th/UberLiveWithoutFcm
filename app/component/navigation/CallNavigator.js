/*import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Forms from "../Forms";
import LoginScreen from "../LoginScreen";
import WelcomeScreen from "../WelcomeScreen";
import Chats from "../Chats";
import { Home, Profile, Messages, Matches, CallHistory } from "../../screens";
import BuyCoins from "../../screens";
import Coins from "../Coins";
import VideoCall from "../VideoCall";
import VideoCall2 from "../VideoCall2";
import UserProfile from "../UserProfile";
import AuthContext, { UserContext } from "../../auth/context";
import CryptoPay from "../CryptoPay";

const Stack = createNativeStackNavigator();

import {
	NotificationListener,
	requestUserPermission,
	GetFCMToken,
} from "../../utils/pushnotification_helper";
import { useNavigation } from "@react-navigation/native";
*/
const CallNavigator = () => {
/*	const { user } = useContext(UserContext);

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="VideoCall2"
				component={VideoCall2}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="VideoCall"
				component={VideoCall}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="Home"
				component={Home}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Profile"
				component={Profile}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Messages"
				component={Messages}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Chats"
				component={Chats}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="Coins"
				component={Coins}
				options={{ headerShown: true }}
			/>

			<Stack.Screen
				name="Match"
				component={Matches}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="UserProfile"
				component={UserProfile}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="CallHistory"
				component={CallHistory}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
	*/
};
export default CallNavigator;
