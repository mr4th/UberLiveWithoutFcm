import React from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { CardItemT } from "../types";

import styles, { WHITE } from "../assets/styles";
import colors from "../config/colors";

const CardItem = (
	{
		description,
		hasActions,
		hasVariant,
		image,
		isOnline,
		matches,
		name,
	}: CardItemT,
	navigation: any
) => {
	// Custom styling
	const fullWidth = Dimensions.get("window").width;
	
	const imageStyle = [
		{
			borderRadius: 8,
			width: hasVariant ? fullWidth / 2 - 3 : fullWidth - 80,
			height: hasVariant ? 170 : 350,
			margin: hasVariant ? 0 : 20,
		},
	];

	const nameStyle = [
		{
			paddingTop: hasVariant ? 0 : -20,
			paddingBottom: hasVariant ? 2 : -15,
			color: "#363636",
			fontSize: hasVariant ? 15 : 30,
		},
	];

	return (
		<View style={styles.containerCardItem}>
			{/* IMAGE */}
			<Image source={image} style={imageStyle} />

			{/* MATCHES */}

			{/* NAME */}
			<Text style={nameStyle}>{name}</Text>

			{/* DESCRIPTION */}
			{description && <Text style={styles.descriptionCardItem}>online</Text>}

			{/* STATUS */}
			{!description && (
				<View style={styles.status}>
					{/* <View style={isOnline ? styles.online : styles.offline} />
					<Text style={styles.statusText}>
						{isOnline ? "Online" : "Offline"}
					</Text> */}
				</View>
			)}

			{/* ACTIONS */}
		</View>
	);
};

export default CardItem;
