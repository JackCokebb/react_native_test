import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
// With Dimensions we can get the size of the screen
import { View, Text, StyleSheet, ScrollView,Dimensions } from 'react-native';
import * as Location from "expo-location";



// everything in react native is component.
// for example, there is no auto scroll down in React in contrast to web.
// So we have to use ScrollView component

// get width from inside of the object, change the name of width to SCREEN_WIDTH
const {height, width:SCREEN_WIDTH} = Dimensions.get("window");
//console.log(height, width);
// width:SCREEN_WIDTH -means-> width == SCREEN_WIDTH

//free api key 
const API_KEY = "get your own";


// Scroll view's prop -> 
//  pagingEnabled: we can not freely scroll, instead it allows us to make pages
//  showHorizontalScrollIndicator: if you set this as false -> hide the horizontal scroll bar 
//  indicatorStyle: style of scroll bar only on ios(of cause we have to set the showHorizontalScrollIndicator as true)
export default function App() { 
    const [city, setCity] = useState("Loading...");
    //const [location, setLocation] =useState();
    const [days, setDays] =useState([]);
    const [ok, setOk] =useState(true);
    const getWeather = async()=>{
        //const permission = await Location.requestForegroundPermissionsAsync();
        //inside of permission(object) there is granted-value
        const {granted} = await Location.requestForegroundPermissionsAsync();
        if(!granted){
            setOk(false);
        }

        //const location = await Location.getCurrentPositionAsync({accuracy:5});
        const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
        const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false});
        //setLocation(location);
        setCity(location[0].city);
        console.log(API_KEY);
        const response = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}`);
        const json = await (await response).json();
        console.log(json.daily);
        ..........................#2.8 05:52...................

    }
    useEffect(()=>{
        getWeather();
    },[])
  return (
    <View style={styles.container}>
        <StatusBar style="auto"/>
        <View style={styles.city}>
            <Text style={styles.cityName}>{city}</Text>
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
        color:"black",
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