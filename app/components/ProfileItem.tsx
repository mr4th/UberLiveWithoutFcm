import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "./Icon";
import { ProfileItemT } from "../types";
import styles, { DARK_GRAY, WHITE } from "../assets/styles";
import { getSaved, post, getAllusers, addFavourite } from "../../firebase";
import Preloader from "../component/Preloader";
import Moda from "../component/Moda";

const ProfileItem = ({ id, gender, phone, email, name }: ProfileItemT) => {
	const [user, setUser] = useState(undefined);
	const [data, setData] = useState([]);
	const [favourite, setFavourite] = useState(undefined);
	const [preloader, setPreloader] = useState(false);
	const [ale, setAler] = useState(undefined);

	function aler(value) {
		setAler(`${value}`);
		setTimeout(() => {
			setAler(undefined);
		}, 3000);
	}

	useEffect(() => {
		getSaved("user")
			.then((res) => {
				const values = {
					id: res.id,
					name: res.nickname,
					image: { uri: res.image },
				};
				setUser(values);
				setFavourite(id);
			})
			.catch((err) => {});
	}, []);

	const addFavourite = async (favourite, user) => {
		if (!favourite) {
			return;
		}
		setPreloader(true);
		var formData = new FormData();
		formData.append("person", favourite);
		formData.append("user", user.id);

		post("favourite/", formData)
			.then((res) => {
				setPreloader(false);

				return aler(res);
			})
			.catch((res) => {
				return aler(res);
			});
	};

	return (
		<>
			<View style={styles.containerProfileItem}>
				<TouchableOpacity onPress={() => addFavourite(favourite, user)}>
					<View style={styles.matchesProfileItem}>
						<Text style={styles.matchesTextProfileItem}>
							<Icon name="heart" size={13} color={WHITE} />
						</Text>
					</View>
				</TouchableOpacity>

				<Text style={styles.name}>{name}</Text>

				<Text style={styles.descriptionProfileItem}>{email}</Text>

				<View style={styles.info}>
					<Text style={styles.iconProfile}>
						<Icon name="call" size={12} color={DARK_GRAY} />
					</Text>
					<Text style={styles.infoContent}>{phone}</Text>
				</View>

				<View style={styles.info}>
					<Text style={styles.iconProfile}>
						<Icon name="transgender" size={12} color={DARK_GRAY} />
					</Text>
					<Text style={styles.infoContent}>{gender}</Text>
				</View>
			</View>
			{ale ? <Moda pops={ale} /> : null}
			{preloader ? <Preloader /> : null}
		</>
	);
};

export default ProfileItem;
