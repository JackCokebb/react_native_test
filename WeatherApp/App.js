import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
// With Dimensions we can get the size of the screen
// ActivityIndicator shows loading circles
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView,Dimensions,
    ActivityIndicator
} from 'react-native';
import * as Location from "expo-location";
import {Fontisto} from "@expo/vector-icons";



// everything in react native is component.
// for example, there is no auto scroll down in React in contrast to web.
// So we have to use ScrollView component

// get width from inside of the object, change the name of width to SCREEN_WIDTH
const {height, width:SCREEN_WIDTH} = Dimensions.get("window");
//console.log(height, width);
// width:SCREEN_WIDTH -means-> width == SCREEN_WIDTH

//free api key 
const API_KEY = "get your own";

const icons = {
    Clear: "day-sunny",
    Clouds: "cloudy",
    Rain: "rain",
    Atmosphere: "cloudy-gusts",
    Snow: "snow",
    Drizzle: "day-rain",
    Thunderstorm: "lightning",
}


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
        //inside of permission(object) there is granted-value -> {granted}  == permission.granted
        const {granted} = await Location.requestForegroundPermissionsAsync();
        if(!granted){
            setOk(false);
        }

        //const location = await Location.getCurrentPositionAsync({accuracy:5});
        const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
        const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false});
        //setLocation(location);
        setCity(location[0].city);
        //console.log(API_KEY);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
        const json = await response.json();
        setDays(json.daily); // json.daily is the list containing daily forecasts

    }
    const getDate = (add)=>{
        const today = new Date();
        const theDay = new Date(today.setDate(today.getDate()+add));
        // const year = theDay.getFullYear(); // 년도
        // const month = theDay.getMonth() + 1;  // 월
        // const date = theDay.getDate();  // 날짜
        return theDay
    }
    useEffect(()=>{
        getWeather();
        
    },[])
    /// '...' operator brings every element from object or array 
    ///ex: a= [5, 6]\ b= [] \ b.push(1,2,...a) => b = [1, 2, 5, 6]
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
                {
                    days.length === 0 ? 
                    <View style={{...styles.day, alignItems:"center"}}>
                        <ActivityIndicator style={{ marginTop: 10 }} size="large" />
                    </View> : 
                    days.map((day, index)=>{
                        theDay = getDate(index);
                        
                        return (
                        <View key={index} style={styles.day}>
                            <View style={{flexDirection: "row", alignItems:"center", justifyContent: "space-between", width: "100%"}}>
                                <Text style={styles.temperature}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                                <Fontisto name={icons[day.weather[0].main]} style={styles.icon} />
                            </View>
                            <Text style={styles.desc}>{day.weather[0].main}</Text>
                            <Text style={styles.date}>{theDay.getFullYear().toString() + '.' + (theDay.getMonth() + 1).toString() + '.' + theDay.getDate().toString()}</Text>
                        </View>)
                        }
                    )
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: "darkseagreen",
        
        
    },
    city:{
        flex: 1.2, 
        alignItems: "center",
        justifyContent: "center",
        
    },
    cityName:{
        fontSize: 58,
        fontWeight: "500",
        color: "white",        
    },
    weather:{
      
    },
    day:{
        width: SCREEN_WIDTH,
        alignItems: "flex-start",
        paddingHorizontal: 20,
        
    },
    temperature:{
        color: "white",
        fontSize: 100,
        fontWeight: "600",
        paddingBottom: 0,
    },
    desc:{
        marginTop: -20,
        fontSize: 30,
        paddingLeft: 10,
        color: "white",
    },
    date:{
        fontSize: 25,
        color: "white",
        paddingLeft: 10,
        marginBottom: -15
    },
    icon:{
        fontSize: 58,
        color: "white",
    },
  
})