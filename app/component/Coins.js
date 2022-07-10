import {
	StyleSheet,
	ScrollView,
	Text,
	FlatList,
	View,
	Image,
	LogBox,
	Button,
	TouchableOpacity,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import Screen from "./Screen";
import ListItemDetails from "./ListItemDetails";
import colors from "../config/colors";
import Preloader from "./Preloader";

import {
	firebase,
	getAllusers,
	getSaved,
	post,
	addFavourite,
	BaseUrl,
} from "../../firebase";
import { BackHandler } from "react-native";

const Coins = () => {
	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", function () {
			navigation.push("Home");
			return true;
		});
	}, []);

	//   end back button
	const [preloader, setPreloader] = useState(false);
	const [coin, setCoin] = useState(0);

	useEffect(() => {
		getSaved("user")
			.then((res) => {
				if (res == null) return navigation.navigate("Login");
				setCoin(res.coins);
			})
			.catch((err) => {});
		// if(!user){navigation.navigate("Login")}
	}, []);

	const coins = [
		{
			id: 1,
			image: require("../assets/projectImages/coins/coin3.png"),
			price: " $2",
			coins: 100,
		},

		{
			id: 2,
			image: require("../assets/projectImages/coins/coin6.png"),
			price: " $5",
			coins: 250,
		},
		{
			id: 3,
			image: require("../assets/projectImages/coins/coin7.png"),
			price: " $10",
			coins: 500,
		},

		{
			id: 4,
			image: require("../assets/projectImages/coins/coin4.png"),
			price: " $50",
			coins: 2500,
		},

		{
			id: 5,
			image: require("../assets/projectImages/coins/coin5.png"),
			price: " $100",
			coins: 5000,
		},
	];
	const loader = (action) => {
		setPreloader(action);
	};
	useEffect(() => {
		LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
	}, []);
	const navigation = useNavigation();

	return (
		<>
			<Screen>
				<ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
					<Text style={styles.buy}>MyCoins</Text>
					<View style={styles.current}>
						<Image
							style={styles.currentCoin}
							source={require("../assets/projectImages/coins/coin1.png")}
						/>
						<Text style={styles.money}> {coin}</Text>
					</View>
					<Text style={styles.mesg} numberOfLines={4}>
						In order to send more messages, video chat with friends and much
						more, Buy more coins belows
					</Text>
					<TouchableOpacity
						style={styles.buy}
						onPress={() => navigation.navigate("Crypto")}
					>
						<Text>Buy With BTC</Text>
					</TouchableOpacity>

					<FlatList
						data={coins}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<ListItemDetails
								imageUrl={item.image}
								coins={item.coins}
								price={item.price}
								icon={item.icon}
								setCoin={setCoin}
								loader={loader}
							/>
						)}
					/>

					<Text style={styles.mesg1} numberOfLines={4}>
						When you select A Gender, each Match Costs 9 coins. When You send a
						message, each new person costs 90 coins
					</Text>
				</ScrollView>
				{preloader ? <Preloader /> : null}
			</Screen>
		</>
	);
};

export default Coins;

const styles = StyleSheet.create({
	buy: {
		fontSize: 20,
		alignSelf: "center",
		fontWeight: "700",
		color: colors.secondary,
	},
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 20,
		elevation: 20,
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: colors.primary,
		width: "80%",
		alignSelf: "center",
		borderRadius: 50,
	},
	current: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 20,
		elevation: 20,
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: colors.yellow,
		width: "50%",
		alignSelf: "center",
		borderRadius: 50,
		justifyContent: "center",
	},
	currentCoin: {
		width: 25,
		height: 25,
	},
	img: {
		width: 50,
		height: 50,
	},

	mesg: {
		paddingHorizontal: 20,
		color: colors.darkgrey,
		textAlign: "center",
	},
	mesg1: {
		paddingHorizontal: 20,
		color: colors.white,
		textAlign: "center",
	},
	money: {
		flexDirection: "row",
		alignItems: "center",
		color: colors.white,
		fontWeight: "bold",
	},
});
