import React, { useState, useEffect } from "react";
import {
	ScrollView,
	Text,
	TouchableOpacity,
	ImageBackground,
	View,
	FlatList,
} from "react-native";
import { Icon, Message } from "../components";
import DEMO from "../assets/data/demo";
import styles, { DARK_GRAY } from "../assets/styles";
import {
	firebase,
	firestore,
	get,
	post,
	getSaved,
	BaseUrl,
	save,
} from "../../firebase";
import Preloader from "../component/Preloader";
import Moda from "../component/Moda";

const Messages = ({ navigation }) => {
	const [data, setData] = useState(undefined);
	const [preloader, setPreloader] = useState(true);
	const [ale, setAler] = useState(undefined);
	const [noHistory, setNoHistory] = useState(false);

	function aler(value) {
		setAler(value);
		setTimeout(() => {
			setAler(undefined);
		}, 3000);
	}

	useEffect(() => {
		getSaved("user").then((res) => {
			let id = res?.id;
			setPreloader(true);
			try {
				firebase
					.firestore()
					.collection("callhistory")
					.where("persons", "array-contains", id)
					.orderBy("createdAt", "desc")
					.limit(12)
					.get()
					.then((doc) => {
						let values = [];
						let d = {};
						doc.forEach((re) => {
							if (re.data()) {
								const res = re.data();
								const sender = res.sender;
								if (sender?._id) {
									d = {
										id: sender._id,
										name: sender.name,
										email: sender?.email,
										image: { uri: sender.avatar },
										phone: sender.phone,
										gender: sender.gender,
										createdAt: `${Date(res?.createdAt)}`.split("GMT")[0],
									};
								}
								values.push(d);
								if (values.length > 0) setData(values);
							}
						});

						save("callhistory", 0);
						if (values.length < 1) {
							aler("No Missed Call Found");
							setNoHistory(true);
							setPreloader(false);
							return;
						}
						//setData(values);
						setTimeout(() => {
							setPreloader(false);
						}, 1000);
						// });
					})
					.catch((err) => {
						aler(`${err}`);
						setPreloader(false);
					});
			} catch (err) {
				aler("Please Login Again");
			}
		});
	}, []);

	//call function
	const call = (
		id: any,
		name: any,
		image: any,
		email: any,
		phone: any,
		gender: any
	) => {
		return navigation.navigate("Profile", {
			person: {
				id: id,
				name: name,
				avatar: image,
				email: email,
				phone: phone,
				gender: gender,
			},
		});
	};

	return (
		<>
			<ImageBackground
				source={require("../assets/images/bg.png")}
				style={styles.bg}
			>
				<View style={styles.containerMessages}>
					<View style={styles.top}>
						{noHistory ? (
							<Text style={styles.chatHistoryTitle}>No Call History Found</Text>
						) : (
							<Text style={styles.chatHistoryTitle}>Call History</Text>
						)}
						<TouchableOpacity>
							<Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
						</TouchableOpacity>
					</View>

					<FlatList
						data={data}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() =>
									call(
										item.id,
										item.name,
										item.image,
										item.email,
										item.phone,
										item.gender
									)
								}
							>
								<Message
									image={item.image}
									name={item.name}
									lastMessage={item?.createdAt}
								/>
							</TouchableOpacity>
						)}
					/>
				</View>
			</ImageBackground>
			{ale ? <Moda pops={ale} /> : null}
			{preloader ? <Preloader /> : null}
		</>
	);
};

export default Messages;
