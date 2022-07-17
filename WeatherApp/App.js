import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// everything in react native is component.
// for example, there is no auto scroll down in React in contrast to web.
// So we have to use ScrollView component

export default function App() { 
  return (
    <View style={styles.container}>
        <StatusBar style="auto"/>
        <View style={styles.city}>
            <Text style={styles.cityName}>Seoul</Text>
        </View>
        <ScrollView style={styles.weather}>
            <View style={styles.day}>
                <Text style={styles.temp}>35</Text>
                <Text style={styles.desc}>Sunny</Text>
            </View>
            <View style={styles.day}>
                <Text style={styles.temp}>35</Text>
                <Text style={styles.desc}>Sunny</Text>
            </View>
            <View style={styles.day}>
                <Text style={styles.temp}>35</Text>
                <Text style={styles.desc}>Sunny</Text>
            </View>
            <View style={styles.day}>
                <Text style={styles.temp}>35</Text>
                <Text style={styles.desc}>Sunny</Text>
            </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: "lightgreen"
    },
    city:{
        flex: 1, 
        alignItems: "center",
        justifyContent: "center"
        
    },
    cityName:{
        color:"whitesmoke",
        fontSize: 48,
        fontWeight: "600",
    },
    weather:{
        flex: 3,
        
    },
    day:{
        flex: 1,
        alignItems: "center",
    },
    temp:{
        marginTop: 50,
        fontSize: 158,
    },
    desc:{
        marginTop: -30,
        fontSize: 50,
    }
})