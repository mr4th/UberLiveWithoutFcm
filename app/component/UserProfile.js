import {
	StyleSheet,
	TouchableHighlight,
	ScrollView,
	Button,
	View,
	Image,
	Text,
	TouchableOpacity,
	TextInput,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Screen from "./Screen";
import colors from "../config/colors";
import { Icon } from "../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import IconBadge from "react-native-icon-badge";
import {
	getSaved,
	post,
	setUserInSecureStorage,
	filePost,
	get,
	save,
} from "../../firebase";
import Preloader from "../component/Preloader";
import Moda from "../component/Moda";
import AuthContext, { UserContext } from "../auth/context";

const UserProfile = ({ navigation }) => {
	const [id, setId] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [gender, setGender] = useState("");
	const [nickname, setNickname] = useState("");
	const [user, setUser] = useState({});
	const [selectedImage, setSelectedImage] = React.useState(null);
	const [preloader, setPreloader] = useState(false);
	const [imageDetail, setImageDetail] = useState({});
	const [ale, setAler] = useState(undefined);
	const { logout, login } = useContext(UserContext);
	const [callCount, setCallCount] = useState(0);
	const [chatCount, setChatCount] = useState(-1);
	function aler(value) {
		setAler(value);
		setTimeout(() => {
			setAler(undefined);
		}, 3000);
	}

	useEffect(() => {
		//Call History Count

		getSaved("callhistory")
			.then((callHis) => {
				setCallCount(callHis ?? 0);
			})
			.catch((err) => {});

		//Chat History Count
		/*
		getSaved("chathistory").then((chatArray) => {
			let count = 0;
			chatArray
				.forEach((res) => {
					if (res?.seen && res?.seen == false) {
						count++;
					}
				})
				.catch((err) => {});

			setChatCount(count);
		});
		*/
	}, []);

	const createTwoButtonAlert = () =>
		Alert.alert(
			"Delete Prompt",
			"Are you sure you want to delete this account?",
			[
				{
					text: "Cancel",
					onPress: () => {},
					style: "cancel",
				},
				{ text: "OK", onPress: () => deleteaccount() },
			]
		);
	useEffect(() => {
		getSaved("user")
			.then((res) => {
				if (res == null) return navigation.navigate("Login");
				setUser(res);
				setId(res.id);
				setEmail(res.email);
				setPhone(res.phone);
				setSelectedImage({ localUri: res.image.uri });
				setNickname(res.nickname);
				setGender(res.gender);
			})
			.catch((err) => aler(err));
	}, []);

	const update = () => {
		// aler("yes")
		setPreloader(true);
		var formData = new FormData();
		formData.append("nickName", nickname);
		formData.append("phone", phone);

		post("myuser/" + id + "/", formData, null, "PUT")
			.then((res) => {
				if (res.indexOf("Login") > -1) {
					aler(res);
					logout();
				}

				if (res.indexOf("Success") > -1) {
					getSaved("user").then((res) => {
						res.nickname = nickname;
						res.phone = phone;

						setUser(res);
						login(res);
						setUserInSecureStorage(res);
					});

					setPreloader(false);
				}
			})
			.catch((err) => {
				aler(err);
				if (err.indexOf("Login") > -1) {
					logout();
				}
				setPreloader(false);
			});
	};

	let openImagePickerAsync = async () => {
		let permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			aler("Permission to access camera roll is required!");
			return;
		}

		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 0.2,
			base64: true,
		});

		if (pickerResult.cancelled === true) {
			return;
		}
		const uri = pickerResult.uri;
		const name = uri.substring(uri.length - 9, uri.length);
		let type = "image/png";
		if (name.indexOf(".jpg") > -1) {
			type = "image/jpeg";
		}

		const img = { uri: uri, name: name, type: type };
		imageUpdate(img);
		setSelectedImage({ localUri: pickerResult.uri });
	};

	// image picker end

	const imageUpdate = (img) => {
		setPreloader(true);
		var formData2 = new FormData();
		formData2.append("email", email);
		formData2.append("submitsubmitsubmit", "submitsubmitsubmit");
		formData2.append("image", img);
		// aler(img.uri+ " 123")	; return
		filePost("https://image.uberlive.website", formData2)
			.then((res) => {
				if (res.indexOf("upload") > -1) {
					//saving image url to db
					var formData = new FormData();
					formData.append("email", email);
					formData.append("nickName", nickname);
					formData.append("image", res);
					setSelectedImage({ localUri: res });

					getSaved("user").then((response) => {
						response.nickname = nickname;
						response.phone = phone;
						response.image = { uri: res };
						setUser(response);
						login(response);
						setUserInSecureStorage(response);
					});
					setPreloader(false);
					//update in django database what is from php database
					post("myuser/" + id + "/", formData, null, "PUT")
						.then((res2) => {
							if (res2.indexOf("Login") > -1) {
								aler(res2);
								logout();
							}
						})
						.catch((res) => {
							aler(res);
							if (res.indexOf("Login") > -1) {
								logout();
							}

							setPreloader(false);
						});
				}
			})
			.catch((err) => {
				aler(err);
				setPreloader(false);
			});
	};

	const deleteaccount = () => {
		// let conf = confirm("Are you sure You want to Delete Your Account?")
		// if(!conf){return}
		setPreloader(true);
		get("deleteaccount/" + email)
			.then((res) => {
				aler(res);
				setTimeout(() => {
					logout();
					navigation.navigate("Login");
				}, 3000);

				setPreloader(false);
			})
			.catch((err) => {
				aler(err);
				setPreloader(false);
			});
	};

	return (
		<>
			<Screen>
				<ScrollView>
					<View style={styles.header}>
						<View style={styles.headerContent}>
							{selectedImage !== null && (
								<Image
									style={styles.avatar}
									source={{ uri: selectedImage.localUri }}
								/>
							)}
							<TouchableOpacity
								onPress={openImagePickerAsync}
								style={styles.button}
							>
								<Text style={styles.buttonText}>Change Profile Photo</Text>
							</TouchableOpacity>

							<Text style={styles.name}>{email} </Text>
							<Text style={styles.userInfo}>{nickname} </Text>
							<Text style={styles.userInfo}>{phone} </Text>
							<Text style={styles.userInfo}>{gender} </Text>
						</View>
					</View>
					{/* end of header */}
					<View style={styles.body}>
						<View style={styles.item}>
							<View style={styles.iconContent}>
								<Icon
									style={styles.icon}
									name="aperture"
									size={25}
									color={colors.white}
								/>
							</View>
							<View>
								<TextInput
									onChangeText={(text) => setNickname(text)}
									value={nickname}
									placeholder="change Nick Name"
									keyboardType="default"
									color={colors.white}
									placeholderTextColor={colors.darkgrey}
									style={styles.input}
									onBlur={update}
								/>
							</View>
							<View style={styles.infoContent}>
								<Text style={styles.info}>Nickname</Text>
							</View>
						</View>

						<View style={styles.item}>
							<View style={styles.iconContent}>
								<Icon
									style={styles.icon}
									name="phone-portrait-sharp"
									size={25}
									color={colors.white}
								/>
							</View>
							<View>
								<TextInput
									onChangeText={(text) => setPhone(text)}
									value={phone}
									placeholder="change Phone "
									keyboardType="numeric"
									color={colors.white}
									maxLength={20}
									placeholderTextColor={colors.darkgrey}
									style={styles.input1}
									onBlur={update}
								/>
							</View>

							<View style={styles.infoContent}>
								<Text style={styles.info}>Phone:</Text>
							</View>
						</View>
						{/* start of history and favourite items */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-evenly",
							}}
						>
							<TouchableOpacity
								style={styles.fav}
								onPress={() => navigation.navigate("Match")}
							>
								<Icon name="heart" size={40} color={colors.secondary} />
								<Text style={styles.favtxt}>Check Favorites</Text>
							</TouchableOpacity>

							{/* end of favourite */}

							<IconBadge
								MainElement={
									<TouchableOpacity
										style={styles.fav}
										onPress={() => navigation.navigate("CallHistory")}
									>
										<Icon
											name="ios-videocam-sharp"
											size={40}
											color={colors.secondary}
										/>
										<Text style={styles.favtxt}>Missed Calls</Text>
									</TouchableOpacity>
								}
								BadgeElement={
									<Text style={{ color: "#FFFFFF" }}>{callCount}</Text>
								}
								IconBadgeStyle={{
									width: 20,
									height: 20,
									backgroundColor: "#FF00EE",
									position: "absolute",
									top: "35%",
									left: "10%",
								}}
								Hidden={callCount == -1}
							/>

							{/* end of call history */}

							<IconBadge
								MainElement={
									<TouchableOpacity
										style={styles.fav}
										onPress={() => navigation.navigate("Messages")}
									>
										<Icon
											name="chatbubbles"
											size={40}
											color={colors.secondary}
										/>
										<Text style={styles.favtxt}>Chat History</Text>
									</TouchableOpacity>
								}
								BadgeElement={
									<Text style={{ color: "#FFFFFF" }}>{chatCount}</Text>
								}
								IconBadgeStyle={{
									width: 20,
									height: 20,
									backgroundColor: "#FF00EE",
									position: "absolute",
									top: "35%",
									left: "10%",
								}}
								Hidden={chatCount == -1}
							/>
							{/* end of chat history */}
						</View>
						<View style={styles.icon1}>
							<Button
								style={styles.icon1}
								color={colors.primary}
								title="Logout"
								onPress={() => logout()}
							/>
							<TouchableHighlight>
								<MaterialCommunityIcons
									//style={styles.icon1}
									name=""
									size={24}
									color="black"
								/>
							</TouchableHighlight>
							<Button
								style={styles.icon1}
								color={colors.secondary}
								title="Delete Account"
								onPress={() => createTwoButtonAlert()}
							/>
						</View>
						{ale ? <Moda pops={ale} /> : null}
					</View>

					{/* end of body */}
				</ScrollView>
			</Screen>
			{preloader ? <Preloader /> : null}
		</>
	);
};

export default UserProfile;

const styles = StyleSheet.create({
	header: {
		backgroundColor: colors.primary,
	},
	headerContent: {
		padding: 30,
		alignItems: "center",
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "white",
		marginBottom: 10,
	},
	name: {
		fontSize: 22,
		color: "#000000",
		fontWeight: "600",
	},
	userInfo: {
		fontSize: 16,
		color: "white",
		fontWeight: "600",
	},

	body: {
		backgroundColor: "transparent",
		height: 500,
		// alignItems: "flex-start",

		backgroundColor: colors.blackalt,
	},
	item: {
		flexDirection: "row-reverse",
	},

	infoContent: {
		flex: 1,
		alignItems: "flex-start",
		paddingLeft: 15,
		justifyContent: "flex-start",
		width: "10%",
	},
	input: {
		width: "100%",
		flex: 1,
		marginTop: 7,
		marginRight: 0,
	},
	input1: {
		width: "100%",
		flex: 1,
		marginTop: 7,
		marginRight: 60,
	},
	iconContent: {
		// flex: 1,
		alignItems: "center",
		width: "25%",
	},
	icon: {
		width: 30,
		height: 30,
		marginTop: 20,
		zIndex: 0,
	},
	info: {
		fontSize: 12,
		marginTop: 20,
		color: colors.primary,
	},
	icon1: {
		color: colors.white,
		width: "80%",
		paddingVertical: 10,
		marginHorizontal: 30,
		marginVertical: 10,
	},
	buttonText: {
		backgroundColor: colors.secondary,
		color: colors.white,
		padding: 7,
		borderBottomRightRadius: 10,
		borderTopLeftRadius: 10,
	},
	fav: {
		flex: 0.5,
		flexDirection: "column",
		alignItems: "center",
		marginTop: 60,
		marginBottom: 30,
	},
	favtxt: {
		color: colors.white,
	},
});
