import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "../components";
import colors from "../config/colors";
import { getcoin } from "../../firebase";
import {
	firebase,
	getAllusers,
	getSaved,
	post,
	addFavourite,
	BaseUrl,
	get,
} from "../../firebase";
import Moda from "./Moda";

export default function ListItemDetails({
	imageUrl,
	price,
	icon,
	coins,
	id,
	setCoin,
	loader,
}) {
	const [newdata, setNewData] = useState(undefined);
	const [newInit, setNewInit] = useState();
	const [present, setPresent] = useState();
	// const stripe = useStripe();
	const [user, setUser] = useState({});
	const [amo, setAmo] = useState(0);
	const [ale, setAler] = useState(undefined);

	function aler(value) {
		setAler(value);
		setTimeout(() => {
			setAler(undefined);
		}, 3000);
	}

	useEffect(() => {
		getSaved("user")
			.then((res) => {
				// aler(res.image.uri)
				setUser(res);
			})
			.catch((err) => aler(err));
	}, []);

	useEffect(() => {
		if (newdata) {
			stripe
				.initPaymentSheet({
					paymentIntentClientSecret: newdata.clientSecret,
					googlePay: true,
					testEnv: true,
					merchantDisplayName: "Uberlive",
					merchantCountryCode: "US",
				})
				.then((initSheet) => {
					if (initSheet.error) {
						loader(false);
						return aler(initSheet.error.message);
					}
					setNewInit(initSheet);
				})
				.catch();
		}
	}, [newdata]);

	useEffect(() => {
		if (newInit) {
			stripe
				.presentPaymentSheet({
					clientSecret: newdata.clientSecret,
				})
				.then((presentSheet) => {
					if (presentSheet.error) {
						loader(false);
						return aler(presentSheet.error.message);
					}

					// setTimeout(()=>{
					getcoin(id)
						.then((res = {}))
						.catch((err) => {});
					loader(false);
					get("mywebhook/" + user.id + "/" + amo + "/")
						.then((res) => {
							setCoin(res);
							getcoin(user.id);
							aler("Payment successfull");
						})
						.catch((err) => {});
					// }, 1000)
				})
				.catch((err) => {
					loader(false);
					aler(err);
				});
		}
	}, [newInit]);

	const donate = async (amount = 1) => {
		setAmo(amount);
		loader(true);
		try {
			var formData = new FormData();
			formData.append("amount", amount);
			formData.append("name", user.nickname);
			formData.append("myuser", user.id);

			let response = await post("create_checkout_session/", formData);

			setNewData(response);
		} catch (err) {
			loader(false);
			aler("Payment failed!");
		}
	};

	return (
		<TouchableOpacity style={styles.container} onPress={() => donate(coins)}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Image style={styles.img} source={imageUrl} />
				<Text style={styles.coins}>{coins}</Text>
			</View>
			<TouchableOpacity style={styles.money}>
				<Icon name="ios-cash-outline" size={30} color="yellow">
					{icon}
				</Icon>
				<Text style={styles.money}>{price}</Text>
			</TouchableOpacity>
			{ale ? <Moda pops={ale} /> : null}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	buy: {
		fontSize: 40,
		fontFamily: "",
		alignSelf: "center",
	},
	coins: {
		color: colors.white,
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
	img: {
		width: 50,
		height: 50,
	},
	money: {
		flexDirection: "row",
		alignItems: "center",
		color: colors.white,
	},
});
