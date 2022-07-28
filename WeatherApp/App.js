import { StatusBar } from 'expo-status-bar';
import React from 'react';
// With Dimensions we can get the size of the screen
import { View, Text, StyleSheet, ScrollView,Dimensions } from 'react-native';

// everything in react native is component.
// for example, there is no auto scroll down in React in contrast to web.
// So we have to use ScrollView component

// get width from inside of the object, change the name of width to SCREEN_WIDTH
const {height, width:SCREEN_WIDTH} = Dimensions.get("window");
//console.log(height, width);
// width:SCREEN_WIDTH -means-> width == SCREEN_WIDTH


// Scroll view's prop -> 
//  pagingEnabled: we can not freely scroll, instead it allows us to make pages
//  showHorizontalScrollIndicator: if you set this as false -> hide the horizontal scroll bar 
//  indicatorStyle: style of scroll bar only on ios(of cause we have to set the showHorizontalScrollIndicator as true)
export default function App() { 
  return (
    <View style={styles.container}>
        <StatusBar style="auto"/>
        <View style={styles.city}>
            <Text style={styles.cityName}>Seoul</Text>
        </View>
        <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        indicatorStyle="white"
        contentContainerStyle={styles.weather}
        >
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
        
    },
    day:{
        width: SCREEN_WIDTH,
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