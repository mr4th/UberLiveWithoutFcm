import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import AppPicker from "../component/AppPicker";
import AppButton from "../component/AppButton";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function BestDeal() {
	return (
		<>
			<View style={styles.main}>
				<Text style={styles.deal}>best deal</Text>
				<View style={styles.dealPicker}>
					<AppPicker placeholder="Sorted by lower price" />
				</View>
				<View style={styles.mainSquare}>
					<View style={styles.square}>
						<View style={styles.squareinner1}>
							{/* for text */}
							<View>
								<Text style={styles.big}>El Cairo</Text>
								<Text style={styles.small}>Egypt</Text>
							</View>
							{/* for rating */}
							<View style={{ marginTop: 15, flexDirection: "row" }}>
								<MaterialCommunityIcons name="star" size={20} color="orange" />
								<Text style={styles.rate}>4.5</Text>
							</View>
						</View>
						{/* main icons */}
						<View style={styles.imgsicon}>
							<MaterialCommunityIcons
								name="image-filter-hdr"
								size={50}
								color={colors.grey}
							/>
						</View>

						{/*buttons */}
						<View style={styles.btn}>
							<AppButton
								title="more"
								color="white"
								textColor="secondary"
							></AppButton>

							<AppButton
								title="more"
								color="secondary"
								textColor="white"
							></AppButton>
						</View>
					</View>
				</View>

				{/* 2 */}
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	deal: {
		textTransform: "capitalize",
		fontSize: 30,
		color: colors.black,
		fontWeight: "900",
		fontFamily: "sans-serif",
	},
	dealPicker: {
		width: 200,
		marginTop: -30,
		marginLeft: -17,
	},
	main: {
		paddingHorizontal: 30,
		marginVertical: 60,
		flex: 1,
		position: "absolute",
		top: 250,
	},
	mainSquare: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginHorizontal: -20,
	},
	square: {
		width: 180,
		height: 180,
		borderRadius: 18,
		backgroundColor: colors.lightgray,
		marginHorizontal: 10,
	},

	big: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 15,
	},
	small: {
		fontSize: 15,
		fontWeight: "500",
	},
	squareinner1: {
		flex: 1,
		justifyContent: "space-around",
		flexDirection: "row",
	},
	rate: {
		color: "orange",
		fontWeight: "700",
	},
	imgsicon: {
		position: "absolute",
		top: 60,
		left: 60,
	},
	btn: {
		marginTop: -20,
		width: "100%",
		flex: 1,
		flexWrap: "wrap",
		justifyContent: "space-around",
	},
});
