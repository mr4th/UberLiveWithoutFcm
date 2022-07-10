import React, { useEffect, useState } from "react";
import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
	FlatList,
} from "react-native";
import { CardItem, Icon } from "../components";
import DEMO from "../assets/data/demo";
import styles, { DARK_GRAY } from "../assets/styles";
import {
	get,
	post,
	isLoggedIn,
	setUserInSecureStorage,
	getFavourite,
} from "../../firebase";
import Moda from "../component/Moda";

import Preloader from "../component/Preloader";

const Matches = ({ navigation }) => {
	const [data, setData] = useState(undefined);
	const [preloader, setPreloader] = useState(true);
	const [ale, setAler] = useState(undefined);

	function aler(value) {
		setAler(value);
		setTimeout(() => {
			setAler(undefined);
		}, 3000);
	}

	useEffect(() => {
		setPreloader(true);
		getFavourite(setData)
			.then((d) => {
				setTimeout(() => {
					setPreloader(false);
				}, 1000);
			})
			.catch((err) => {
				aler(err);
				setPreloader(false);
			});
	}, []);

	return (
		<>
			<ImageBackground
				source={require("../assets/images/bg.png")}
				style={styles.bg}
			>
				<View style={styles.containerMatches}>
					<View style={styles.top}>
						<Text style={styles.title}>Favorites</Text>
					</View>

					<FlatList
						numColumns={1}
						data={data}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("Profile", {
										person: {
											id: item.id,
											name: item.name,
											gender: item.gender,
											phone: item.phone,
											avatar: item.image,
											email: item.email,
										},
									})
								}
							>
								<CardItem image={item.image} name={item.name} />
							</TouchableOpacity>
						)}
					/>

					{ale ? <Moda pops={ale} /> : null}
				</View>
			</ImageBackground>
			{preloader ? <Preloader /> : null}
		</>
	);
};

export default Matches;
