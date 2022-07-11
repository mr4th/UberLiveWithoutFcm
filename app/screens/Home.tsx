import React, { useState, useEffect, useContext } from "react";
import {
	View,
	Text,
	Image,
	ImageBackground,
	ScrollView,
	TouchableOpacity,
	FlatList,
} from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { City, Filters, CardItem } from "../components";
import styles from "../assets/styles";
import DEMO from "../assets/data/demo";
import Screen from "../component/Screen";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Moda from "../component/Moda";
import IconBadge from "react-native-icon-badge";

import {
	getcoin,
	getAllusers,
	getSaved,
	post,
	get,
	addFavourite,
	firebase,
} from "../../firebase";
import { PanGestureHandler } from "react-native-gesture-handler";
import Preloader from "../component/Preloader";
import * as SecureStorage from "expo-secure-store";
import { UserContext } from "../auth/context";
import { useFocusEffect } from "@react-navigation/native";

const Home = ({ navigation }) => {
	const [swiper, setSwiper] = useState<CardStack | null>(null);
	const [index, setIndex] = useState(0);
	const [data, setData] = useState([]);
	const [receiver, setReceiver] = useState({});
	const [person, setPerson] = useState({});
	const [favourite, setFavourite] = useState(undefined);
	const [user, setUser] = useState(undefined);
	const [coins, setCoins] = useState(0);
	const [ale, setAler] = useState(undefined);
	const [preloader, setPreloader] = useState(false);
	const { u, login, logout } = useContext(UserContext);
	const [callCount, setCallCount] = useState(0);

	function aler(value) {
		setAler(value);
		setTimeout(() => {
			setAler(undefined);
		}, 3000);
	}

	useFocusEffect(() => {
		getSaved("callhistory")
			.then((callHis) => {
				setCallCount(callHis ?? 0);
			})
			.catch((err) => {});
	});

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				// var uid = user.uid;
			} else {
				aler("You need to Logout and Login Again!");
			}
		});
	}, []);

	useEffect(() => {
		(async () => {
			try {
				let res = await SecureStorage.getItemAsync("user");
				if (res == null) return navigation.navigate("Login");
				return;
			} catch (e) {
				aler(`${e}`);
			}
		})();
	}, []);

	function aler2(favourite, user) {
		setPreloader(true);
		addFavourite(favourite, user)
			.then((res) => {
				setPreloader(false);
				aler(`${res}`);
			})
			.catch((e) => {
				aler(`${e}`);
				setPreloader(false);
			});
	}

	useEffect(() => {
		( ()=>{const res = getSaved("user")
			.then((res) => {
				if (res == null) {
					return navigation.navigate("Login");
				}
				setCoins(res.coins);
				const values = {
					id: res.id,
					name: res.nickname,
					image: { uri: res.image },
				};
				console.log(res, "testing");
				setUser(values);
				getAllusers(res.id)
					.then((d) => setData(d))
					.catch((err) => {
						setPreloader(false);
						aler(`${err}`);
						if (err.indexOf("Login") > -1) {
							logout();
						}
					});
			})
			.catch((err) => {
				setPreloader(false);
				aler(`${err}`);

				if (err.indexOf("Login") > -1) {
					logout();
				}
			});
	})()
		// });
		// if(!user){navigation.navigate("Login")}
	}, []);

	useEffect(() => {
		if (data.length > 0) {
			setReceiver({
				id: data[0].id,
				name: data[0].name,
				avatar: data[0].image,
				phone: data[0].phone,
				email: data[0].email,
				gender: data[0].gender,
			});

			setFavourite(data[0].id);
		}
	}, [data]);

	useEffect(() => {
		if (data.length > 0) {
			setReceiver({
				id: data[index].id,
				name: data[index].name,
				avatar: data[index].image,
				phone: data[index].phone,
				email: data[index].email,
				gender: data[index].gender,
			});

			setFavourite(data[index].id);
		}
	}, [index]);

	useEffect(() => {
		if (data.length > 0) {
			setPerson({
				id: data[index].id,
				name: data[index].name,
				avatar: data[index].image,
				phone: data[index].phone,
				email: data[index].email,
				gender: data[index].gender,
			});
		}
	}, [receiver]);

	const swapfunc = () => {
		if (data.length > 0) {
			if (index == data.length - 1) {
				setIndex(0);
			} else {
				setIndex(index + 1);
			}
		}
	};

	function video(receiver) {
		if (Object.keys(user).length > 0) {
			setTimeout(() => {
				//if the user has enough money for the call
				if (coins < 90)
					return aler(
						"Sorry, Insufficient coins to initiate call with " + receiver.name
					);

				navigation.navigate("VideoCall", { receiver: receiver });
			}, 100);
		}
	}

	return (
		<>
			<Screen>
				<View style={styles.bg}>
					<View style={styles.containerHome}>
						<View
							style={{
								flexGrow: 1,
								flexDirection: "row",
								justifyContent: "space-around",
								marginVertical: 10,
							}}
						>
							<City coins={{ coins: coins }} />
							<Filters navigation={() => navigation.navigate("Coins")} />
						</View>
						{data.length > 0 ? (
							<CardStack
								loop
								onSwipedLeft={swapfunc}
								onSwipedRight={swapfunc}
								style={{}}
								ref={(newSwiper): void => setSwiper(newSwiper)}
							>
								{data.map((item) => (
									<Card key={item.id}>
										<CardItem
											hasActions
											image={item.image}
											name={item.name}
											description={item.description}
											// matches={item.match}
										/>
									</Card>
								))}
							</CardStack>
						) : (
							<Preloader />
						)}

						{/* check profile */}
						<View style={styles.matchesCardItem}>
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("Profile", { person: person })
								}
							>
								<Text style={styles.matchesTextCardItem}>
									<Icon name="heart" color={colors.white} size={13} />
									Check Profile
								</Text>
							</TouchableOpacity>
						</View>

						{/* end of check profile */}
						<View style={styles.actionsCardItem}>
							<TouchableOpacity
								style={styles.miniButton}
								onPress={() => navigation.navigate("UserProfile")}
							>
								<Icon name="person" color={colors.gmailColor} size={12} />

								<Text style={{ color: colors.gmailColor, fontSize: 12 }}>
									Me
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.circledButton}
								onPress={() => {
									navigation.navigate("Chats", { receiver: receiver });
								}}
							>
								<Icon name="chatbox" color={colors.yellow} size={14} />
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.button}
								onPress={() => video(receiver)}
							>
								<Icon name="videocam" color={colors.facebookColor} size={25} />
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.circledButton}
								onPress={() => aler2(favourite, user)}
							>
								<Icon name="md-heart" color={colors.yellow} size={14} />
							</TouchableOpacity>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-evenly",
								}}
							></View>
							<TouchableOpacity
								style={styles.miniButton}
								onPress={() => navigation.navigate("CallHistory")}
							>
								<Icon name="call" color={colors.gmailColor} size={14} />
								<IconBadge
									BadgeElement={
										<Text style={{ color: "#FFFFFF" }}>{callCount}</Text>
									}
									IconBadgeStyle={{
										width: 20,
										height: 20,
										backgroundColor: "#FF00EE",
										position: "absolute",
										top: "5%",
										left: "0%",
									}}
									Hidden={callCount == -1}
								/>
							</TouchableOpacity>
							{/* end of call history */}
						</View>
					</View>
				</View>
			</Screen>
			{ale ? <Moda pops={ale} /> : null}
			{preloader ? <Preloader /> : null}
		</>
	);
};

export default Home;
