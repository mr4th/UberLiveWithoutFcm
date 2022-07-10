import React from "react";
import { Button, StyleSheet, Image, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "./app/component/Screen";

const Tweet = ({ navigation }) => {
	return (
		<Screen>
			<Text>Tweet Me..</Text>
			<Button
				title="Check out My Tweet"
				onPress={() => navigation.navigate("TweetDetails")}
			/>

			<Button
				title="Account Screen"
				color="orange"
				onPress={() => navigation.navigate("Account")}
			/>
		</Screen>
	);
};

const TweetDetails = () => {
	return (
		<Screen>
			<Text>Check out my Tweet Detials..</Text>
		</Screen>
	);
};

const Account = () => {
	return (
		<Screen>
			<Text>All Account Details</Text>
		</Screen>
	);
};
const Stack = createNativeStackNavigator();
const StackNavigator = () => (
	<Stack.Navigator initialRouteName="Tweet">
		<Stack.Screen
			name="Tweet"
			component={Tweet}
			options={{
				headerStyle: { backgroundColor: "teal" },
				headerTintColor: "aliceblue",
				headerTitleAlign: "center",
			}}
		/>
		<Stack.Screen
			name="TweetDetails"
			component={TweetDetails}
			options={{
				headerStyle: { backgroundColor: "teal" },
				headerTintColor: "aliceblue",
				headerTitleAlign: "center",
			}}
		/>
		<Stack.Screen
			name="Account"
			component={Account}
			options={{
				headerStyle: { backgroundColor: "teal" },
				headerTintColor: "aliceblue",
				headerTitleAlign: "center",
			}}
		/>
	</Stack.Navigator>
);

// for bottom navigators
const Tab = createBottomTabNavigator();
const TabNavigators = () => {
	return (
		<Tab.Navigator
			tabBarOptions={{
				activeBackgroundColor: "tomato",
				activeTintColor: "white",
				inactiveBackgroundColor: "lightgrey",
				inactiveTintColor: "black",
			}}
		>
			<Tab.Screen
				name="Feed"
				component={Tweet}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons color={color} name="home" size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="TweetDetails"
				component={TweetDetails}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							color={color}
							name="twitter-retweet"
							size={size}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Account"
				component={Account}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons color={color} name="account" size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};
export default function App() {
	return (
		<NavigationContainer>
			{/* <StackNavigator /> */}
			<TabNavigators />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({});
