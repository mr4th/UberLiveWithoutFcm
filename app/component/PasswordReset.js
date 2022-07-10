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
import { get, post, isLoggedIn, setUserInSecureStorage } from "../../firebase";
import authStorage from "../auth/storage";
import AuthContext, { UserContext } from "../auth/context";
import Moda from "../component/Moda";

const validationSchema = yup.object().shape({
	email: yup.string().required().email().label("Email"),
});

export default function PasswordReset({ navigation }) {
	const authContext = useContext(AuthContext);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState("");
	const [preloader, setPreloader] = useState(false);
	const [ale, setAler] = useState(undefined);
	const { user, login } = useContext(UserContext);

	
	function aler(value) {
		setAler(value);
		setTimeout(() => {
			setAler(undefined);
		}, 3000);
	}

	
	//Username and Password Login
	const handleSubmit = (val) => {
		setPreloader(true);
		const email = val.email;

		var formData = new FormData();
		formData.append("username", email);

		post("resetpass/", formData)
			.then((res) => {
				aler(res);
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
					initialValues={{ email: "" }}
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
								<Button
									style={styles.icon}
									color={colors.primary}
									title="Reset Password"
									onPress={handleSubmit}
								/>

								<MaterialCommunityIcons
									style={styles.icon}
									name="login-variant"
									size={24}
									color="black"
								/>
							</View>
						</>
					)}
				</Formik>
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
	pa: {
		width: "80%",
	},
});
