import React, { useState, useEffect } from "react";
import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	Button,
	View,
	TouchableHighlight,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as yup from "yup";
// import DefaultStyles from "../config/colors";
import AppButton from "./AppButton";
import AppText from "./AppText";
import Home from "../screens/Home";
import Preloader from "./Preloader";
import { isLoggedIn, get, post, filePost } from "../../firebase";
import Moda from "../component/Moda";

export default function Forms({ navigation }) {
	const [nickName, setNickName] = useState("");
	const [gender, setGender] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [media, setMedia] = useState("");
	const [image, setImage] = useState(null);
	const [preloader, setPreloader] = useState(false);
	const [user, setUser] = useState(undefined);
	const [imageDetail, setImageDetail] = useState(undefined);
	const [ale, setAler] = useState(undefined);

	function aler(value) {
		setAler(`${value}`);
		setTimeout(() => {
			setAler(undefined);
		}, 3000);
	}

	useEffect(() => {
		if (isLoggedIn) {
			// navigation.navigate("Home");
		}
	}, [user]);

	const validationSchema = yup.object().shape({
		email: yup.string().required().email().label("Email"),
		password: yup.string().required().min(4).max(20).label("Password"),
		nickName: yup.string().required().min(4).max(20).label("Nickname"),
		phone: yup.number().required().label("Phone"),
	});

	const pickImage = async () => {
		let permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			aler("Permission to access camera roll is required!");
			return;
		}
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 0.5,
		});

		if (!result.cancelled) {
			setImage(result.uri);
			// name: 'image.jpg', type: 'image/jpeg'
			const uri = result.uri;
			const name = uri.substring(uri.length - 9, uri.length);
			let type = "image/png";
			if (name.indexOf(".jpg") > -1) {
				type = "image/jpeg";
			}

			const img = { uri: uri, name: name, type: type };
			setImageDetail(img);
		}
	};

	const uploadImage = async () => {
		const res = await fetch(image);
		const blob = await res.blob();
		return blob;
	};

	const handleSubmit = (val) => {
		setPreloader(true);
		const email = val.email;
		const password = val.password;
		const nickName = val.nickName;
		const mygender = val.gender ? val.gender : gender;
		const phone = val.phone;
		uploadImage()
			.then((img) => {
				var formData2 = new FormData();
				formData2.append("email", email);
				formData2.append("submitsubmitsubmit", "submitsubmitsubmit");
				formData2.append("image", imageDetail);
				// https://uberlive.website/
				filePost("https://image.uberlive.website", formData2)
					.then((res) => {
						// aler(res, "**image url*");
						// return;
						if (res.indexOf("upload")) {
							//saving image url to db				var formData = new FormData();
							var formData = new FormData();
							formData.append("username", email);
							formData.append("email", email);
							formData.append("password", password);
							formData.append("nickName", nickName);
							formData.append("gender", gender);
							formData.append("phone", phone);

							formData.append("image", res);

							post("user/", formData)
								.then((res) => {
									setPreloader(false);
									aler(res);
									if (res.indexOf("uccess") > -1)
										setTimeout(() => {
											navigation.navigate("Login");
										}, 3000);
								})
								.catch((res) => {
									setPreloader(false);
									aler(res);
								});
						}
					})
					.catch((err) => {
						setPreloader(false);
					});
			})
			.catch((err) => {
				aler(err);
				setPreloader(false);
			});
	};

	return (
		<>
			<ScrollView style={{ backgroundColor: colors.black }}>
				<ImageBackground
					style={styles.img}
					source={require("../assets/projectImages/seven.png")}
					resizeMode="cover"
					blurRadius={0}
				>
					<Image
						style={styles.logo}
						source={require("../assets/projectImages/logo.png")}
					/>
				</ImageBackground>

				<Text style={styles.mainText}>Create Account</Text>
				<Formik
					initialValues={{
						email: "",
						password: "",
						nickName: "",
						gender: "",
						phone: "",
						image: "",
					}}
					onSubmit={(values) => handleSubmit(values)}
					validationSchema={validationSchema}
				>
					{({ handleChange, handleSubmit, errors }) => (
						<>
							<TextInput
								maxLength={50}
								style={styles.container}
								placeholder="NickName"
								onChangeText={handleChange("nickName")}
							/>
							<AppText>{errors.nickName}</AppText>

							<View
								style={{
									borderRadius: 100,
									borderWidth: 1,
									borderColor: "#bdc3c7",
									overflow: "hidden",
									width: "90%",
									marginHorizontal: 15,
									padding: 0,
									backgroundColor: colors.white,
									height: 50,
									justifyContent: "center",
								}}
							>
								<Picker
									style={{ color: colors.grey }}
									selectedValue={gender}
									onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
									//onChangeText={handleChange("gender")}
									placeholder="Gender"
								>
									<Picker.Item label="Gender" value="0" />
									<Picker.Item label="Male" value="Male" />
									<Picker.Item label="Female" value="Female" />
								</Picker>
							</View>
							<AppText>{errors.gender}</AppText>
							<TextInput
								maxLength={12}
								keyboardType="numeric"
								style={styles.container}
								placeholder="Phone Number"
								onChangeText={handleChange("phone")}
							/>
							<AppText>{errors.phone}</AppText>
							<TextInput
								maxLength={20}
								keyboardType="email-address"
								style={styles.container}
								placeholder="Email"
								onChangeText={handleChange("email")}
							/>
							<AppText>{errors.email}</AppText>
							<TextInput
								maxLength={50}
								secureTextEntry
								style={styles.container}
								placeholder="Password"
								onChangeText={handleChange("password")}
							/>
							<AppText>{errors.password}</AppText>
							<View
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 200,
								}}
							>
								<View style={styles.inputContainer}>
									<TouchableHighlight
										style={{
											height: 40,
											borderRadius: 10,
											backgroundColor: colors.primary,
											marginLeft: 0,
										}}
									>
										<Button
											// style={styles.input}
											color={colors.secondary}
											title="Upload image"
											onPress={pickImage}
										/>
									</TouchableHighlight>
									<MaterialCommunityIcons
										name="camera-control"
										size={24}
										color="black"
										style={styles.icon}
									/>
								</View>

								{image && (
									<Image
										source={{ uri: image }}
										style={{
											width: 200,
											height: 200,
											borderRadius: 200,
											marginTop: 10,
										}}
									/>
								)}
							</View>
							<AppButton title="Register" onPress={handleSubmit} />
							<AppButton title="" color="transparent" onPress={() => {}} />
						</>
					)}
				</Formik>
				<Text>{`\n`}</Text>
				<Text style={{ marginVertical: 30 }}>{`\n`}</Text>
			</ScrollView>
			{ale ? <Moda pops={ale} /> : null}
			{preloader ? <Preloader /> : null}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "90%",
		height: 50,
		backgroundColor: colors.lightgray,
		borderRadius: 100,
		paddingHorizontal: 20,
		alignSelf: "center",
		marginVertical: 20,
	},
	img: {
		width: "100%",
		height: 300,
		borderRadius: 100,
	},
	logo: {
		width: 200,
		height: 200,
		marginHorizontal: 100,
		marginVertical: -50,
	},
	mainText: {
		fontSize: 30,
		alignSelf: "center",
		marginVertical: 30,
		color: colors.primary,
	},
	inputContainer: {
		justifyContent: "center",
		width: "80%",
	},
	input: {
		height: 50,
	},
	icon: {
		position: "absolute",
		right: "10%",
		color: colors.primary,
	},
});
