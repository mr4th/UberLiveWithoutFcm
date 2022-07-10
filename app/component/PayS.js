import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useReff } from "react";
import { Paystack } from "react-native-paystack-webview";
const PayS = () => {
	const [amount, setAmount] = useState(25000);
	// const [amount, setAmount] = useState(100000000)

	// const reff = useReff(null);

	//ref={reff}
	return (
		<View>
			<Paystack
				paystackKey="pk_live_a7307260ae68b16468ac7729692d0cd34ec66344"
				amount={amount}
				billingEmail="uberlivep@gmail.com"
				activityIndicatorColor="hotpink"
				onCancel={(e) => {
				}}
				onSuccess={(res) => {
					//status
					if (res.data.transactionRef.status == "success") {
						console.log("res", res.data.transactionRef.reference, "res");
					}
				}}
				autoStart={true}
			/>
		</View>
	);
};

export default PayS;

const styles = StyleSheet.create({});
