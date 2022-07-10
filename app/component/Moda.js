import React, { useState } from "react";
import {  Modal, StyleSheet, Text, Pressable, View } from "react-native";
// import { Icon } from "../components";r
import colors from "../config/colors";

const Moda = ({ pops }) => {
	const [modalVisible, setModalVisible] = useState(true);
	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>{pops}</Text>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}
						>
							{/* <Icon
								style={styles.textStyle}
								name="close"
								size={24}
								color={colors.secondary}
							/> */}
							<Text style={{ color: "white" }}>Close</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<Pressable
				style={[styles.button, styles.buttonOpen]}
				onPress={() => setModalVisible(true)}
			>
				<Text style={styles.textStyle}></Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		width: "80%",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		// elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "transparent",
	},
	buttonClose: {
		backgroundColor: colors.primary,
	},
	textStyle: {
		color: "white",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
export default Moda;
// export  aler;
