import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ListItems from "./ListItems";

const DATA = [
	{
		id: 1,
		title: "Table1",
		description: "data 1",
		image: require("../../assets/projectImages/ken1.jpg"),
	},

	{
		id: 2,
		title: "Table2",
		description: "data 2",
		image: require("../../assets/projectImages/ken1.jpg"),
	},

	{
		id: 3,
		title: "Table3",
		description: "data 3",
		image: require("../../assets/projectImages/ken1.jpg"),
	},
];
const MessageScreen = () => {
	return (
		<FlatList
			data={DATA}
			keyExtractor={(message) => message.id.toString()}
			renderItem={({ item }) => (
				<ListItems
					title={item.title}
					subtitle={item.description}
					image={item.image}
				/>
			)}
		/>
	);
};

export default MessageScreen;

const styles = StyleSheet.create({});
