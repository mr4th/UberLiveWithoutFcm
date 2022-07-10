import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

import ActivityIndicator from "./ActivityIndicator";
import ListItemDetails from "../component/ListItemDetails";
import listingApi from "../api/listings";
function Detailedlist() {
	const [listing, setListing] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadListing();
	}, []);
	const loadListing = async () => {
		setLoading(true);
		const response = await listingApi.getListing();
		setListing(response.data);
		setLoading(false);
	};
	return (
		<SafeAreaView>
			<ActivityIndicator visible={loading} size={40} />
			<FlatList
				data={listing}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<ListItemDetails
						title={item.title}
						subtitle={item.price}
						imageUrl={item.images[0].url}
					/>
				)}
			/>
		</SafeAreaView>
	);
}

export default Detailedlist;

const styles = StyleSheet.create({});
