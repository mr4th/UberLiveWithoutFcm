import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {useEffect} from 'react';
import {DeviceEventEmitter, Platform} from 'react-native';
// import IncomingCall from 'react-native-incoming-call';

 const CallScreen = async () => {
    // Listen to cancel and answer call events
    useEffect(() => {
      if (Platform.OS === "android") {
        /**
         * App open from killed state (headless mode)
        */
        const payload = null//await IncomingCall.getExtrasFromHeadlessMode();
        if (payload) {
          // Start call action here. You probably want to navigate to some CallRoom screen with the payload.uuid.
        }

        /**
         * App in foreground / background: listen to call events and determine what to do next
        */
        DeviceEventEmitter.addListener("endCall", payload => {
          // End call action here
        });
        DeviceEventEmitter.addListener("answerCall", payload => {
          // Start call action here. You probably want to navigate to some CallRoom screen with the payload.uuid.
        });
      }
    }, []);
  return (
    <View>
      <Text>CallScreen</Text>
    </View>
  )
}

export default CallScreen

const styles = StyleSheet.create({})