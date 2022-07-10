import React, { useContext, useState, useEffect } from "react";
import {
	Image,
	StyleSheet,
	Button,
	TextInput,
	View,
	TouchableHighlight,
	TouchableOpacity,
	Text,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "./Screen";
import AppInput from "./AppInput";
import colors from "../config/colors";
import AppButton from "./AppButton";
import AppText from "./AppText";
import { Home } from "../screens";
import Preloader from "./Preloader";
import {
	get,
	post,
	isLoggedIn,
	setUserInSecureStorage,
	firebase,
} from "../../firebase";
import authStorage from "../auth/storage";
import AuthContext, { UserContext } from "../auth/context";
import Moda from "../component/Moda";
// import { GetFCMToken } from "../utils/pushnotification_helper";

const validationSchema = yup.object().shape({
	email: yup.string().required().email().label("Email"),
	password: yup.string().required().min(4).max(20).label("Password"),
});

export default function LoginScreen({ navigation }) {
	const authContext = useContext(AuthContext);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState("");
	const [preloader, setPreloader] = useState(false);
	const [ale, setAler] = useState(undefined);
	const { user, login } = useContext(UserContext);

	useEffect(() => {
		if (user == null) {
			// return false;
		}
		if (typeof user == "object" && user !== null) {
			 navigation.navigate("Home");
		}
	}, []);

	function aler(value) {
		setAler(value);
		setTimeout(() => {
			setAler(undefined);
		}, 3000);
	}

	const UserToken = async (token) => {
		await authStorage.storeToken(token);
		firebase
			.auth()
			.signInAnonymously()
			.then(() => {
				// Signed in..
			})
			.catch((error) => {
				// console.log(error.message);
				aler("Login Again To Access Chats And Video");
			});
	};
	//Username and Password Login
	const handleSubmit = (val) => {
		const email = val.email;
		const password = val.password;

		if (!email) {
			aler("Please enter email");
			return;
		}
		if (!password) {
			aler("Please enter email");
			return;
		}
		setPreloader(true);
		var formData = new FormData();
		formData.append("username", email);
		formData.append("password", password);

		post("token/", formData)
			.then((res) => {
				if (res?.token) {
					const accessToken = res.token;
					//store auth token and sigin into firebaise anonmously
					UserToken(accessToken);
					console.log(accessToken)

					//create new fcmtoken and send token to store at the database
					// GetFCMToken(email);

					get("getuser/" + email)
						.then((res) => {
							console.log(res)
							setPreloader(false);
							aler("Welcome");

							setTimeout(() => {
								// login(res?.message ?? res);
								navigation.navigate("PasswordReset");
							}, 2000);
						})
						.catch((err) => {
							aler(`${err}`);
							setPreloader(false);
						});
				}
			})
			.catch((err) => {
				aler(`${err}`);
				setPreloader(false);
			});
	};

	return (
		<>
			<Screen>
				<Image
					source={require("../assets/projectImages/logo.png")}
					style={styles.logo}
				/>
				<Formik
					initialValues={{ email: "", password: "" }}
					onSubmit={(values) => handleSubmit(values)}
					validationSchema={validationSchema}
				>
					{({
						handleChange,
						handleSubmit,
						errors,
						setFieldTouched,
						touched,
					}) => (
						<>
							<View style={styles.inputContainer}>
								<TextInput
									// style={styles.input}
									autoCapitalize="none"
									autoCorrect={false}
									icon="email"
									onBlur={() => setFieldTouched("email")}
									onChangeText={handleChange("email")}
									keyboardType="email-address"
									placeholder="Email"
									style={styles.container}
								/>
								<MaterialCommunityIcons
									style={styles.icon}
									name="email-sync"
									size={24}
									color="black"
								/>
							</View>
							{touched && <AppText>{errors.email}</AppText>}
							<View style={styles.inputContainer}>
								<TextInput
									// style={styles.input}
									autoCapitalize="none"
									autoCorrect={false}
									onBlur={() => setFieldTouched("password")}
									underlineColorAndroid="transparent"
									placeholder="Password"
									keyboardType="ascii-capable"
									secureTextEntry
									onChangeText={handleChange("password")}
									style={styles.container}
								/>
								<MaterialCommunityIcons
									style={styles.icon}
									name="security"
									size={24}
									color="black"
									onChangeText={(text) => setPassword(text)}
								/>
							</View>
							{touched && <AppText>{errors.password}</AppText>}

							<View style={styles.inputContainer}>
								<TouchableHighlight
									style={{
										height: 40,
										width: "90%",
										borderRadius: 10,
										backgroundColor: colors.primary,
										marginLeft: 15,
									}}
								>
									<Button
										style={styles.icon}
										color={colors.primary}
										title="Login"
										onPress={handleSubmit}
									/>
								</TouchableHighlight>

								<MaterialCommunityIcons
									style={styles.icon1}
									name="login-variant"
									size={24}
									color="black"
								/>
							</View>
						</>
					)}
				</Formik>
				<TouchableOpacity style={styles.forgetPass}>
					<Button
						onPress={() => navigation.navigate("PasswordReset")}
						title="Forgot Password"
						color={colors.gmailColor}
					/>
				</TouchableOpacity>
			</Screen>
			{ale ? <Moda pops={ale} /> : null}
			{preloader ? <Preloader /> : null}
		</>
	);
}

const styles = StyleSheet.create({
	logo: {
		width: 180,
		height: 180,
		alignSelf: "center",
	},
	coni: {
		width: 100,
	},
	container: {
		width: "90%",
		height: 50,
		backgroundColor: colors.lightgray,
		borderRadius: 100,
		paddingHorizontal: 20,
		alignSelf: "center",
		marginVertical: 20,
	},
	inputContainer: {
		justifyContent: "center",
	},
	input: {
		height: 50,
	},
	icon: {
		position: "absolute",
		right: "10%",
		color: colors.primary,
	},
	icon1: {
		position: "absolute",
		right: "10%",
		color: colors.secondary,
	},
	pa: {
		width: "80%",
	},
	forgetPass: {
		paddingHorizontal: 30,
		marginVertical: 15,
		width: "60%",
		borderRadius: 100,
	},
});
