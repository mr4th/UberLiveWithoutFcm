import React, { useContext, useState, useEffect } from "react";
import {
	Alert,
	Image,
	StyleSheet,
	Button,
	TextInput,
	View,
	TouchableHighlight,
} from "react-native";
import Moda from "../component/Moda";
import { Formik } from "formik";
import * as yup from "yup";
import jwtDecode from "jwt-decode";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "./Screen";
import AppInput from "./AppInput";
import colors from "../config/colors";
import AppButton from "./AppButton";
import AppText from "./AppText";
import { Home } from "../screens";
import Preloader from "./Preloader";
import { get, post, isLoggedIn, setUserInSecureStorage } from "../../firebase";
import * as SecureStorage from "expo-secure-store";

const validationSchema = yup.object().shape({
	email: yup.string().required().email().label("Email"),
	password: yup.string().required().min(4).max(20).label("Password"),
});

export default function LoginScreen({ navigation }) {
	const [loginFailed, setLoginFailed] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [preloader, setPreloader] = useState(false);
	const [user, setUser] = useState(undefined);
	const [ale, setAler] = useState(undefined);

	useEffect(() => {
		(async () => {
			try {
				let res = await SecureStorage.getItemAsync("user");
				if (res == null) return false;
				return navigation.navigate("Home");
			} catch (e) {
				aler(e);
			}
		})();
	}, [user]);

	function aler(value) {
		setAler(value);
		setTimeout(() => {
			setAler(undefined);
		}, 3000);
	}

	//Username and Password Login
	const handleSubmit = (val) => {
		// setPreloader(true);
		const email = val.email;
		const password = val.password;

		var formData = new FormData();
		formData.append("username", email);
		formData.append("password", password);

		post("token/", formData, aler)
			.then((res) => {
				if (res.hasOwnProperty("detail")) {
					aler(res.detail);
					setTimeout(() => {
						aler(undefined);
					}, 4000);
				}
				if (res.hasOwnProperty("access")) {
					aler("Welcome");
					setTimeout(() => {
						aler(undefined);
					}, 2500);
					get("getuser/" + email)
						.then((res) => {
							setUserInSecureStorage(res.message).then((e) =>
								navigation.navigate("Home")
							);
						})
						.catch((err) => {
							aler(err);
							setTimeout(() => {
								aler(undefined);
							}, 4000);
						});
				}

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
									keyboardType="numeric"
									onBlur={() => setFieldTouched("password")}
									underlineColorAndroid="transparent"
									placeholder="Password"
									secureTextEntry
									onChangeText={handleChange("password")}
									style={styles.container}
								/>
								<MaterialCommunityIcons
									style={styles.icon}
									name="security"
									size={24}
									color="black"
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
									style={styles.icon}
									name="login-variant"
									size={24}
									color="black"
								/>
								{ale ? <Moda pops={ale} /> : null}
							</View>
						</>
					)}
				</Formik>
			</Screen>
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
	pa: {
		width: "80%",
	},
});
