import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors'
import AppText from './AppText';
export default function CompStyles() {
    return (
        <View style={styles.button}>
          {/* <AppText>Some text goes here..</AppText> */}
            <MaterialCommunityIcons style name="login" size={20} color="white" />
            <Text style={styles.appText}>Login </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        width:"90%",
        height:50,
        backgroundColor:colors.secondary,
        borderRadius:20,
        padding: 10,
        margin: 20,
        flex:0.06,
        flexDirection:"row",
        justifyContent:"center",
        elevation:15,
        alignItems:"center",
         // shadowColor: 'grey',
        // shadowOffset: {width:20,height:20},
        // shadowOpacity: 0.6,
        // shadowRadius: 10,

    },
    appText:{
        textAlign:"center",
        color:colors.white,
        fontSize:20,
        fontWeight:"bold",
        elevation:100,
        // textDecorationLine:"underline line-through",

    },
})
