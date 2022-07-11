import React, { useState, useEffect, useContext } from "react";
import {
	Image,
	ImageBackground,
	StyleSheet,
	ScrollView,
	View,
	Pressable,
	Button,
	TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SecureStorage from "expo-secure-store";
import AppButton from "./AppButton";
// import { authentication } from "../../firebase-config";
import colors from "../config/colors";

// import * as Facebook from "expo-facebook";
// import * as Google from "expo-google-app-auth";
// import * as Expo from "expo-google-sign-in";
import Screen from "./Screen";
import Preloader from "./Preloader";
import Moda from "../component/Moda";
import AuthContext, { UserContext } from "../auth/context";
import { isLoggedIn, onSignIn } from "../../firebase";

import auth from "@react-native-firebase/auth";

export default function WelcomeScreen({ navigation }) {
	const [preloader, setPreloader] = useState(false);
	const [loggedIn, setloggedIn] = useState(false);
	const [userInfo, setuserInfo] = useState([]);
	// const [user, setUser] = useState(undefined);
	const [ale, setAler] = useState(undefined);
	const [password, setPassword] = useState("");
	const authContext = useContext(AuthContext);
	const { user } = useContext(UserContext);

	function aler(value) {
		setAler($`value`);
		setTimeout(() => {
			setAler(undefined);
		}, 3000);
	}


	//gmail cliednId -> 500267890715-k3vh4d02vtu9m879blkl11m4jv90nj4q.apps.googleusercontent.com
	// const loginWithGoogle = async () => {
	// 	setPreloader(true);
	// 	try {
	// 		const result = await Google.logInAsync({
	// 			//   behavior:"web",
	// 			androidClientId:
	// 				"500267890715-vp1495h19m8njedt4a9dqr8qi1elt77e.apps.googleusercontent.com",
	// 			iosClientId:
	// 				"500267890715-k3vh4d02vtu9m879blkl11m4jv90nj4q.apps.googleusercontent.com",
	// 			scopes: ["profile", "email"],
	// 		});

	// 		setPreloader(false);
	// 		if (result.type === "success") {
	// 			try {
	// 			} catch (e) {
	// 				setPreloader(false);
	// 				// aler("Google signInSilentlyAsync Error:", e)
	// 			}

	// 			aler("Welcome " + result.user.email);
	// 			//save user to DB if user is not existing
	// 		} else {
	// 			aler("cancelled");
	// 		}
	// 	} catch (e) {
	// 		setPreloader(false);
	// 		aler(e);
	// 	}
	// };

	// sign in with facebook 2
	// const SignInWithFacebook = () => {
	// 	const provider = new FacebookAuthProvider();
	// 	singInWithPopup(authentication, provider)
	// 		.then((re) => {
	// 		})
	// 		.catch((err) => {
	// 		});
	// };

	return (
		<Screen>
			<ScrollView contentContainerStyle={{ flexGrow: 1, marginVertical: 20 }}>
				<View style={styles.logoContainer}>
					<Image
						style={styles.logo}
						source={require("../assets/projectImages/logo.png")}
					/>
				</View>
				<View style={styles.logoContainer}>
					<Image
						style={styles.background}
						source={require("../assets/projectImages/one.png")}
					/>
				</View>

				<View style={{ marginTop: -50 }}>
					<Pressable>
						<AppButton
							color="primary"
							title="Login"
							onPress={() => navigation.navigate("Login")}
						></AppButton>
						<AppButton
							title="Register"
							color="secondary"
							onPress={() => {
								navigation.navigate("Register");
							}}
						></AppButton>

						{/* <AppButton
							title="Login With Gmail"
							color="gmailColor"
							onPress={loginWithGoogle}
						></AppButton>
					 */}
						{/* <AppButton onPress={SignInWithFacebook}>
							signIn with Facebook
						</AppButton> */}
						{/* <AppButton
							title="Login With Facebook"
							color="facebookColor"
							onPress={loginWithFacebook}
						></AppButton> */}
						{/* <TouchableOpacity onPress={signIn}>
							<GoogleSigninButton
								style={{ width: "90%", height: 48, marginTop: 50, left: 10 }}
								size={GoogleSigninButton.Size.Wide}
								color={GoogleSigninButton.Color.Dark}
								onPress={signIn}
							/>
						</TouchableOpacity> */}
						<AppButton
							title=""
							color="transparent"
							onPress={() => {}}
						></AppButton>
						<AppButton
							title=""
							color="transparent"
							onPress={() => {}}
						></AppButton>
					</Pressable>
					{ale ? <Moda pops={ale} /> : null}
				</View>
			</ScrollView>
			{preloader ? <Preloader /> : null}
		</Screen>
	);
}

const styles = StyleSheet.create({
	background: {
		resizeMode: "contain",
		flex: 1,
		width: "80%",
	},
	logoContainer: {
		width: "100%",
		marginTop: -100,
		height: 20,
		alignItems: "center",
		flexDirection: "column",
		flex: 1,
	},
	logo: {
		width: "40%",
		resizeMode: "contain",
	},
});
