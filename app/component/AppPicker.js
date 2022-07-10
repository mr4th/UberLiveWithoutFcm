import React, { useState } from "react";
import {
	Button,
	FlatList,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";
import PickItems from "./PickItems";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function AppPicker({
	icon,
	items,
	onSelectItem,
	placeholder,
	selectedItem,
	colo,
}) {
	const [modalVisible, setmodalVisible] = useState(false);
	return (
		<>
			<TouchableWithoutFeedback onPress={() => setmodalVisible(true)}>
				<View style={(styles.better, colo)}>
					<MaterialCommunityIcons size={30} color="gray" name={icon} />
					<View style={styles.texts}>
						<AppText>{selectedItem ? selectedItem.label : placeholder}</AppText>
						<MaterialCommunityIcons
							size={20}
							style={styles.chev}
							name="chevron-down"
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
			<Modal visible={modalVisible} animationType="slide">
				<Button title="Close" onPress={() => setmodalVisible(false)} />
				<FlatList
					data={items}
					keyExtractor={(item) => item.value.toString()}
					renderItem={({ item }) => (
						<PickItems
							label={item.label}
							onPress={() => {
								setmodalVisible(false);
								onSelectItem(item);
							}}
						/>
					)}
				/>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	better: {
		borderRadius: 10,
		paddingVertical: 5,
		marginVertical: 20,
		flexDirection: "row",
	},
	texts: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		alignSelf: "center",
	},
	chev: {
		marginTop: -15,
	},
});
