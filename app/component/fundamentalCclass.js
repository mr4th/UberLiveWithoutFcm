// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  StyleSheet, Text, View, Image, SafeAreaView, StatusBar, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, Button,Alert, Platform } from 'react-native';

export default function App() {
  // Handle=()=>{console.log("you jsut click me")}
  return (
    <SafeAreaView style={styles.container}> 

      {/* this is without feedback */}
    <TouchableWithoutFeedback onPress={()=>{console.log("i was pressed");}}>
    <Image style={{width:300,height:200}} source={require("./assets/kit.jpg")}/>
      </TouchableWithoutFeedback>
      <Button title="my button" color="red" onPress={()=>{console.log("button pressed");}}>click me</Button>

    
    {/* this is  with opacity */}
   <TouchableOpacity onPress={()=>{console.log("touch opacity active");}}>
   <Image source={{uri:"https://picsum.photos/200/300",width:300,height:200}}/>
   </TouchableOpacity>

{/* btn 1 without Api */}
 <Button title="my button" color="orange"
  onPress={()=>{alert("my Title","this is just a test",
 [{text:"Yes"},{text:"No"}])}}>click me</Button>

 {/* btn 2 with Alert Api */}
 <Button title="my button" color="teal"
  onPress={()=>{Alert.alert("my Title","this is just a test",
  [{text:"Yes"},{text:"No"}])}}>click me</Button>

{/* btn 3 with prompt using Alert Api */}
<Button title="my button" color="magenta"
  onPress={()=>{Alert.prompt("Title","Message",(text)=>{console.log(text);})}}>click me</Button>


{/* this is with highlight */}
{/* <TouchableHighlight onPress={()=>{console.log("touch highlight active");}}>
   <Image source={{uri:"https://picsum.photos/200/300",width:"300",height:"200"}}/>
   </TouchableHighlight> */}

   <Button title="my button" color="dodgerblue" onPress={()=>{console.log("button pressed");}}>click me</Button>
   <View style={[styles.comp1,comp2]}></View>
    </SafeAreaView>

  );
}
const comp2={backgroundColor:"yellowgreen"}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
    color:"white",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:Platform.OS==="android"? StatusBar.currentHeight:0
  },

  comp1:{
    backgroundColor:"maroon",
    width:300,height:100,
  }
});
