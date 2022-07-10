import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

import Screen from './Screen';
import ListItemDetails from "./ListItemDetails";

export default function ListItems() {
	return (
		<Screen>
			<View style={styles.backgoundHolder}>
			<ImageBackground

				style={styles.img}
				source={require("../assets/projectImages/3.jpg")}
			>
			<View style={styles.overlay}/>
			</ImageBackground>
			</View>
			<ListItemDetails
			image ={require("../assets/projectImages/ken1.jpg")}
			title="Kenny Afolion"
			subtitle="Total; 7 Listing"
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({

    backgoundHolder:{
        padding: 0,

    },

    img:{
        resizeMode:"contain",
        width:"100%",
        height:"70%",
        borderTopLeftRadius:10,
        borderTopRightRadius:20,
        overflow: 'hidden',
        // marginVertical:20,


    },

        overlay:{
            position: "absolute",
            left:0,
            right:0,
            top:0,
            bottom:0,
            backgroundColor:"gray",
            opacity:0.5,
        },

});
