import React from "react";
import { TouchableOpacity } from "react-native";

import AppText from "./AppText";

function PickItems({ label, onPress }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<AppText>{label}</AppText>
		</TouchableOpacity>
	);
}

export default PickItems;
