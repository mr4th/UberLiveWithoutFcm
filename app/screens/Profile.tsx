import React from "react";
import {
	ScrollView,
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
	Image,
} from "react-native";
import { Icon, ProfileItem } from "../components";
import DEMO from "../assets/data/demo";
import styles, { WHITE } from "../assets/styles";

const Profile = ({ navigation, route: { params } }) => {
	// const { image, info1, info2, info3, info4, location, match, name } = DEMO[7];
	const { id, name, gender, phone, avatar, email } = params.person;
	console.log(params.person);
	return (
		<ImageBackground
			source={require("../assets/images/bg.png")}
			style={styles.bg}
		>
			<ScrollView style={styles.containerProfile}>
				<ImageBackground source={avatar} style={styles.photo}>
					<View style={styles.top}>
						<TouchableOpacity>
							<Icon
								name="chevron-back"
								size={20}
								color={WHITE}
								style={styles.topIconLeft}
							/>
						</TouchableOpacity>

						<TouchableOpacity>
							<Icon
								name="ellipsis-vertical"
								size={20}
								color={WHITE}
								style={styles.topIconRight}
							/>
						</TouchableOpacity>
					</View>
				</ImageBackground>

				<ProfileItem
					id={id}
					name={name}
					email={email}
					phone={phone}
					gender={gender}
				/>

				<View style={styles.actionsProfile}>
					<TouchableOpacity
						style={styles.roundedButton}
						onPress={() =>
							navigation.navigate("Chats", {
								receiver: {
									id: id,
									name: name,
									avatar: avatar,
									email: email,
									phone: phone,
									gender: gender,
								},
							})
						}
					>
						<Icon name="chatbubble" size={20} color={WHITE} />
						<Text style={styles.textButton}>Start chatting</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.circledButton}
						onPress={() =>
							navigation.navigate("VideoCall", {
								receiver: {
									id: id,
									name: name,
									avatar: avatar,
									email: email,
									phone: phone,
									gender: gender,
								},
							})
						}
					>
						<Icon name="videocam" size={20} color={WHITE} />
					</TouchableOpacity>
				</View>
			</ScrollView>
		</ImageBackground>
	);
};

export default Profile;
