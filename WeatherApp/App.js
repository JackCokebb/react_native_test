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



// everything in react native is component.
// for example, there is no auto scroll down in React in contrast to web.
// So we have to use ScrollView component

// get width from inside of the object, change the name of width to SCREEN_WIDTH
const {height, width:SCREEN_WIDTH} = Dimensions.get("window");
//console.log(height, width);
// width:SCREEN_WIDTH -means-> width == SCREEN_WIDTH

//free api key 
const API_KEY = "get your own";

const today = new Date();   

const year = today.getFullYear(); // 년도
const month = today.getMonth() + 1;  // 월
const date = today.getDate();  // 날짜



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
        const response = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
        const json = await (await response).json();
        setDays(json.daily);

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
                <View style={styles.day}>
                    <ActivityIndicator style={{marginTop: 10}} size="large"/>
                </View> : 
                days.map((day, index)=>{
                    theDay = getDate(index);
                    
                    return (
                    <View key={index} style={styles.day}>
                        <Text style={styles.date}>{theDay.getFullYear().toString() + '.' + (theDay.getMonth() + 1).toString() + '.' + theDay.getDate().toString()}</Text>
                        <Text style={styles.temperature}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                        <Text style={styles.desc}>{day.weather[0].main}</Text>
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
        backgroundColor: "lightgreen"
    },
    city:{
        flex: 1, 
        alignItems: "center",
        justifyContent: "center"
        
    },
    cityName:{
        color:"black",
        fontSize: 78,
        fontWeight: "600",
    },
    weather:{
        
    },
    day:{
        width: SCREEN_WIDTH,
        alignItems: "center",
    },
    temperature:{
        marginTop: 50,
        fontSize: 158,
    },
    desc:{
        marginTop: -30,
        fontSize: 50,
    },
    date:{
        fontSize: 50,
        
    }
})