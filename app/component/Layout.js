import React from "react";
import {
  ImageBackground,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import colors from '../config/colors';

export default function App() {
  return (
    //  <Layout/>
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/lady1.jpg")}
        style={styles.background}
      ></ImageBackground>
      <View style={styles.vie}>
        <View style={styles.vie2}>
          <Image
            source={require("../assets/cat.jpg")}
            style={styles.imgs}
          ></Image>
          <Text>hi there</Text>
        </View>

        <View style={styles.vie2}>
          <Image
            source={require("../assets/cat.jpg")}
            style={styles.imgs}
          ></Image>
          <Text>hi there</Text>
        </View>

        <View style={styles.vie2}>
          <Image
            source={require("../assets/lady2.jpg")}
            style={styles.imgs}
          ></Image>
          <Text>hi there</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.secondary,
  },

  background: {
    flex: 0.5,
  },
  vie: {
    flex: 1,
    justifyContent: "space-around",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 50,
    textAlign: "center",
  },
  vie2: {
    flex:1,
    alignItems:"center"
  },

  imgs: {
    width: "90%",
    height: 100,
  },
});
