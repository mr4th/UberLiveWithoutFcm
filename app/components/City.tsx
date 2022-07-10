import React, { useState } from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import styles, { DARK_GRAY } from "../assets/styles";
import colors from "../config/colors";
import {
	firebase,
	getAllusers,
	getSaved,
	post,
	addFavourite,
} from "../../firebase";
import { useFocusEffect } from "@react-navigation/native";
const City = ({ coins }) => {
	const [newcoins, setNewcoins] = useState(coins.coins);

	useFocusEffect(() => {
		getSaved("user").then((res) => {
			if (coins.coins != res.coins && res.coins) {
				setNewcoins(res.coins);
			}
		});
	});

	return (
		<TouchableOpacity style={styles.city}>
			<Text style={styles.cityText}>
				<TouchableOpacity style={styles.miniButton}>
					<Image
						source={require("../assets/projectImages/coins/coin1.png")}
						style={{ width: 20, height: 20 }}
					/>
					<Text style={{ color: colors.primary }}>{newcoins}</Text>
				</TouchableOpacity>
			</Text>
		</TouchableOpacity>
	);
};
export default City;
