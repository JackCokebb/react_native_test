import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() { 
  return (
    <View style={styles.container}>
        <StatusBar style="auto"/>
        <View style={styles.city}>
            <Text style={styles.cityName}>Seoul</Text>
        </View>
        <View style={styles.weather}>
            <View style={styles.day}>
                <Text style={styles.temp}>35</Text>
                <Text style={styles.desc}>Sunny</Text>
            </View>
        </View>
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