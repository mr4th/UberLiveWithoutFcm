import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import styles, { DARK_GRAY } from "../assets/styles";
import colors from "../config/colors";

const Filters = ({ navigation }) => (
	<TouchableOpacity style={styles.filters} onPress={navigation}>
		<Text style={styles.filtersText}>
			<Icon name="logo-bitcoin" size={10} color={colors.primary} /> Buy Coins
		</Text>
	</TouchableOpacity>
);

export default Filters;
