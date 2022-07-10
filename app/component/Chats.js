// @refresh reset
import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
	getSaved,
	getcoin,
	firebase,
	get,
	customPost,
	setUserInSecureStorage,
} from "../../firebase";
import colors from "../config/colors";
import { KeyboardAvoidingView, View, BackHandler } from "react-native";
// import { getDocs, collection, query, where, onSnapshop } from "firebase/firestore";

const db = firebase.firestore();
const chatCollection = db.collection("chats");
import { NavigationActions, useNavigationState } from "react-navigation";

export default function Chats({ route: { params }, navigation }) {
	// const [messages, setMessages] = useState([{
	//_id: 1, text: 'Hello developer',createdAt: new Date(),
	//user: {  _id: 2,  name: 'React Native', avatar: 'https://placeimg.com/140/140/any',  },  }, ]);
	const [messages, setMessages] = useState([]);
	const [length, setLength] = useState(-1);
	const [length2, setLength2] = useState(-1);
	const [receiver, setReceiver] = useState({});
	const [user, setUser] = useState({});
	const [sender_receiver, setsender_receiver] = useState(null);
	const [coins, setCoins] = useState(0);

	useEffect(() => {
		if (length == 0) {
			setLength2(0);
		}

		if (length2 == 0 || length == 0) {
			//alert("Reload");

			BackHandler.addEventListener("hardwareBackPress", function () {
				navigation.reset({
					index: 0,
					routes: [
						{
							name: "Home",
						},
					],
				});

				return true;
			});
		} else if (length > 0 && length2 != 0 && length != -1) {
			//alert("Not Reloading");

			BackHandler.addEventListener("hardwareBackPress", function () {
				navigation.goBack();
				return true;
			});

			// }
		}
	}, [length]);

	const chathistory = (message) => {
		let history = { ...message, persons: [receiver._id, user._id] };
		const len = length2;
		const send = async () => {
			if (len === 0) {
				setLength2(-1);
				//alert("About to charge - " + len);

				//code to charge the first chat
				get("chargechat/" + user._id).then((res) => {});

				getSaved("user").then((res) => {
					let newuser = { ...res };
					newuser.coins = res?.coins - 90;
					setUserInSecureStorage(newuser);
				});
			}
			try {
				db.collection("chathistory").doc(sender_receiver).set(history);
			} catch (e) {}
		};
		return send;
	};

	useEffect(() => {
		let rec = {
			_id: params.receiver.id,
			name: params.receiver.name,
			email: params.receiver.email,
			avatar: params.receiver.avatar.uri,
			gender: params.receiver.gender,
			phone: params.receiver.phone,
		};
		setReceiver(rec);

		getSaved("user")
			.then((res) => {
				if (typeof res == null) return navigation.navigate("Login");

				getcoin(res.id).then((result) => {
					if (typeof result == "number") {
						setCoins(result);
					}
				});
				const values = {
					_id: res.id,
					name: res.nickname,
					image: res.image.uri,
					email: res.email,
				};
				setUser(values);
			})
			.catch((err) => {});
	}, []);

	useEffect(() => {
		if (Object.keys(user).length > 0 && Object.keys(receiver).length > 0) {
			let send_receiv = "_" + user._id + "_" + receiver._id + "_";
			if (user._id > receiver._id) {
				send_receiv = "_" + receiver._id + "_" + user._id + "_";
			}
			console.log(user, "userrrrr");

			setsender_receiver(send_receiv);
		}
	}, [user, receiver]);

	useEffect(() => {
		console.log(sender_receiver, "snder");
		if (sender_receiver) {
			try {
				const unsub = chatCollection
					.where("sender_receiver", "==", sender_receiver)
					.onSnapshot((query) => {
						const messagesFromFirestore = query
							.docChanges()
							.filter(({ type }) => type == "added")
							.map(({ doc }) => {
								const message = doc.data();
								return { ...message, createdAt: message.createdAt.toDate() };
							})
							.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
						appendMessages(messagesFromFirestore);
						setLength(messagesFromFirestore.length);
					});

				return () => unsub();
			} catch (e) {
				alert("Login Again");
			}
		}
	}, [sender_receiver]);

	//passes the chats to GiftedChat
	const appendMessages = useCallback((message = []) => {
		console.log("chat why ");
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, message)
		);
	}, []);

	async function handSend(messages) {
		if (length == -1) {
			// return alert("Your network is bad for this chat. ");
			alert("Your Network Is Bad For This Chat. ");
		}
		let charge;

		//if the user has enough money for the first chat
		if (length === 0 && coins < 90)
			return alert("Insufficient coins to initiate chat with " + receiver.name);

		if (messages.length > 0) {
			let msg = messages.forEach((obj) => {
				obj.receiver = receiver;
				obj.sender_receiver = sender_receiver;
			});

			charge = chathistory(messages[0]);
			if (msg) {
				messages = [
					...messages.forEach((obj) => {
						obj.receiver = receiver;
						obj.sender_receiver = sender_receiver;
					}),
				];
			}

			// formally the if statement ends here. before writes. Just in case you have an error, then end the if statement here.
			const writes = messages.map((m) => {
				try {
					chatCollection.add(m);
				} catch (e) {
					alert("Login Again");
				}
			});
			await Promise.all(writes);

			//send notification to
			var formData = new FormData();
			formData.append("submitsubmitsubmit", "submitsubmitsubmit");
			formData.append("name", user?.name);
			formData.append("email", receiver?.email);
			formData.append("type", "chat");
			formData.append("body", messages[0].text);

			customPost(formData)
				.then((res) => {})
				.catch((err) => {
					// alert("Error With Sending Notification to " + receiver.name);
				});

			//update chat history and charge if first time
			charge()
				.then((res) => {})
				.catch((res) => {});

			// post()
		}
	}
	return (
		<React.Fragment>
			<GiftedChat
				messagesContainerStyle={{
					backgroundColor: colors.cardcolor,
				}}
				alwaysShowSend={true}
				messages={messages}
				onSend={handSend}
				KeyboardSpacer={true}
				isTyping={true}
				user={{
					_id: user._id,
					name: user.name,
					avatar: user.image,
					email: user.email,
				}}
			/>
			<KeyboardAvoidingView
				behavior={Platform.OS === "android" ? "padding" : null}
				keyboardVerticalOffset={50}
			/>
		</React.Fragment>
	);
}
