import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Forms from "../Forms";
import LoginScreen from "../LoginScreen";
import WelcomeScreen from "../WelcomeScreen";
import PasswordReset from "../PasswordReset";
import { Home } from "../../screens";

const Stack = createNativeStackNavigator();
const AuthNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="Welcome"
			component={WelcomeScreen}
			options={{ headerShown: false }}
		/>

		<Stack.Screen
			name="Login"
			component={LoginScreen}
			options={{ headerShown: false }}
		/>

		<Stack.Screen
			name="Register"
			component={Forms}
			options={{ headerShown: false }}
		/>

		<Stack.Screen
			name="PasswordReset"
			component={PasswordReset}
			options={{ headerShown: false }}
		/>

		<Stack.Screen
			name="Home"
			component={Home}
			options={{ headerShown: false }}
		/>
		
	</Stack.Navigator>
);
export default AuthNavigator;
