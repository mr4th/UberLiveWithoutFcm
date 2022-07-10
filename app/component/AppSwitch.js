import React,{useState} from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import Screen from './Screen'

export default function AppSwitch() {
    const [isNew, setIsNew] = useState(false)
    return (
        <Screen>
            <Switch style={styles.switch} value={isNew} onValueChange={(newValue)=>setIsNew(newValue)}/>
        </Screen>
    )
}

const styles = StyleSheet.create({
    switch:{
        // padding: 20,
        // width:50,
        // height:50,
        backgroundColor:"pink"
    }
})
