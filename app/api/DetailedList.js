import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import ListItemDetails from "../component/ListItemDetails";
import listingApi from "./listings";

function Detailedlist() {
	const [listings, setListings] = useState([]);

	useEffect(() => {
		loadListing();
	}, []);
	const loadListing = async () => {
		const response = await listingApi.getListing();
		setListings(response.data);
	};
	return (
		<SafeAreaView>
			<FlatList
				data={listings}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<ListItemDetails
						title={item.title}
						subtitle={item.Description}
						imageUrl={item.images[0].url}
					/>
				)}
			/>
		</SafeAreaView>
	);
}

export default Detailedlist;

const styles = StyleSheet.create({});
