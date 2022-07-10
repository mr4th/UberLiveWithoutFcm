import React from 'react';
import { TouchableOpacity,StyleSheet } from 'react-native';

import DefaultStyles from '../config/styles';
import AppText from './AppText';

function PickIt({label,onPress}) {
    return (
      <TouchableOpacity onPress={onPress}>
      <AppText>{label}</AppText>
      </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    text:{
    padding:50,
    backgroundColor:"red",
    }
})
export default PickIt;