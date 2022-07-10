// @refresh reset
import React, { useRef, useState, useCallback, useEffect } from "react";
import { View, Image, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GiftedChat } from "react-native-gifted-chat";
import { firebase, getSaved, BaseUrl2, get, getcoin } from "../../firebase";
import colors from "../config/colors";
import Preloader from "./Preloader";

export default function Chats({ route: { params } }) {
	const [messages, setMessages] = useState([]);
	const [length, setLength] = useState(0);
	const [receiver, setReceiver] = useState({});
	const [user, setUser] = useState({});
	const [coins, setCoins] = useState(0);
	const [preloader, setPreloader] = useState(true);
	const ws = useRef(null);

	useEffect(() => {
		let rec = {
			_id: params.receiver.id,
			name: params.receiver.name,
			avatar: params.receiver.avatar,
		};
		setReceiver(rec);

		console.log("===", params.receiver, "===rec = ", rec);
		getSaved("user")
			.then((res) => {
				console.log(":::", res);
				if (typeof res == null) return navigation.navigate("Login");
				getcoin(res.id).then((result) => {
					console.log(result, typeof result);
					if (typeof result == "number") {
						//alert(":")
						setCoins(result);
					}
				});
				const values = { _id: res.id, name: res.nickname, image: res.image };
				setUser(values);
				console.log("=====", values, "=====");
			})
			.catch((err) => console.log(err, "usere err"));
	}, []);

	const formatMessage = (res) => {
		const msg = res.map((response, i) => {
			let rname;
			let ravatar;
			let sname;
			let savatar;

			if (response.receiver == receiver.id) {
				rname = receiver.name;
				ravatar = receiver.avatar.uri;
				sname = user.name;
				savatar = user.image;
			} else {
				sname = receiver.name;
				savatar = receiver.avatar.uri;
				rname = user.name;
				ravatar = user.image;
			}

			return {
				_id: i,
				text: response.message,
				createdAt: response.datetime,
				receiver: {
					_id: response.receiver,
					name: rname,
					avatar: ravatar,
				},
				user: {
					_id: response.sender,
					name: sname,
					avatar: savatar,
				},
			};
		});

		return msg;
	};

	useEffect(() => {
		if (Object.keys(user).length > 0) {
			get(`getchat/${user._id}/${receiver._id}/`)
				.then((res) => {
					// console.log(res)
					if (typeof res != "object" || !res) {
						return;
					}
					const msg = formatMessage(res);
					const newlen = res.length;
					setLength(newlen);
					// alert(res.length)
					appendMessages(msg);
					setPreloader(false);
				})
				.catch((err) => alert(err));
			setPreloader(false);
		}
	}, [user]);

	useEffect(() => {
		if (Object.keys(user).length > 0) {
			console.log("initiateSocketConnection");
			// enter your websocket url
			const newBase = BaseUrl2.replace("http://", "").replace("https://", "");
			const url = `wss://e249-197-210-47-124.ngrok.io/ws/chat/${user._id}/${receiver._id}`;
			alert(url);
			ws.current = new WebSocket(url);
			ws.current.onopen = () => {
				// alert("Hi")
				console.log("connection establish open");
				// call the function that picks old chats from db and populate the message state
				ws.current.onclose = () => {
					console.log("connection establish closed");
				};

				return () => {
					//   ws.current.close();
					//don't know if it's a good idea to close the connection here.
				};
			};
		}
	}, [user]);

	//When a new message comes in from the server
	//   useEffect(() => {
	if (ws.current) {
		// alert("yes")
		ws.current.onmessage = (e) => {
			const response = JSON.parse(e.data);
			console.log("onmessage=>", JSON.stringify(response));
			var sentMessages = formatMessage([response]);

			setMessages((previousMessages) =>
				GiftedChat.append(previousMessages, sentMessages)
			);
		};
	}
	//   }, []);

	const appendMessages = useCallback((message = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, message)
		);
	}, []);

	//To send message to socket. It needs to add it to gifted chat
	async function handSend(messages) {
		if (messages.length > 0) {
			let msg = messages.forEach((obj) => (obj.receiver = receiver));
			console.log(msg + "...");
			if (msg) {
				messages = [...messages.forEach((obj) => (obj.receiver = receiver))];
			}
		}
		console.log(
			messages[0].text,
			messages[0].user._id,
			messages[0].receiver._id,
			messages[0].user.name,
			messages[0].user.image.uri
		);
		// return
		const newmessage = {
			message: messages[0].text,
			sender: messages[0].user._id,
			receiver: messages[0].receiver._id,
			name: messages[0].user.name,
			image: messages[0].user.image.uri,
		};
		if (length == 0) {
			if (coins >= 90 || 1 == 1) {
				console.log("newmessage=>", newmessage);
				ws.current.send(JSON.stringify(newmessage));
			} else {
				alert("Insufficient Funds to Initiate Chat with " + receiver.name);
			}
		} else {
			ws.current.send(JSON.stringify(newmessage));
		}
	}
	//
	return (
		<>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<GiftedChat
					messagesContainerStyle={{
						backgroundColor: colors.black,
					}}
					alwaysShowSend={true}
					messages={messages}
					onSend={handSend}
					user={user}
				/>
			</ScrollView>
			{preloader ? <Preloader /> : null}
		</>
	);
}
