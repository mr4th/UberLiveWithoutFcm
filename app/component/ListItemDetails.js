import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "../components";
import colors from "../config/colors";
import { Paystack } from "react-native-paystack-webview";
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
import Moda from "../component/Moda";

export default function ListItemDetails({
	imageUrl,
	price,
	icon,
	coins,
	id,
	setCoin,
	loader,
}) {
	const [user, setUser] = useState({});
	const [amount, setAmount] = useState(0);
	const [ale, setAler] = useState(undefined);
	const [payPrice, setPayPrice] = useState(0);
	function aler(value, duration = 0) {
		setAler(value);

		if (duration == 0) {
			setTimeout(() => {
				setAler(undefined);
			}, 3000);
		}
	}

	useEffect(() => {
		let p = parseInt(price.replace("$", ""));
		let calPrice = Math.ceil((p + p * 0.045) * 100, 2) / 100;
		setPayPrice(calPrice);
	}, []);

	useEffect(() => {
		getSaved("user")
			.then((res) => {
				// aler(res.image.uri)
				setUser(res);
			})
			.catch((err) => aler(err));
	}, []);

	const verify = (reference) => {
		var formData = new FormData();
		formData.append("reference", reference);
		formData.append("user_id", user.id);

		post("verifypayment/", formData)
			.then((res) => {
				aler(res);
				if (res.indexOf("Login") > -1) {
					logout();
				}
				getcoin(user.id).then((res2) => {
					setCoin(res2);
				});
			})
			.catch((err) => {
				aler(err);
			});
	};

	return (
		<>
			{amount < 1 ? (
				<TouchableOpacity
					style={styles.container}
					onPress={() => setAmount(payPrice)}
				>
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
			) : (
				<Paystack
					currency="USD"
					applePay={true}
					paystackKey="pk_live_a7307260ae68b16468ac7729692d0cd34ec66344"
					amount={amount}
					billingEmail="uberlivep@gmail.com"
					activityIndicatorColor="hotpink"
					onCancel={(e) => {
						setAmount(0);
						aler("Payment was Cancelled");
					}}
					onSuccess={(res) => {
						setAmount(0);
						if (res.data.transactionRef.status == "success") {
							aler("Verifying Payment...", 1);
							verify(res.data.transactionRef.reference);
						}
					}}
					autoStart={true}
				/>
			)}
			{/* paystackKey="pk_test_b0e572af9133f61b2abb43067b304ca0b33116d4" */}
		</>
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
