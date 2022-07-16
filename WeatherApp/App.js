
import { View } from 'react-native';

//Remember! component is the way we can configure the OS.
export default function App() { //2.4 01:58!!!!!!!!!!!!!!!!
  return (
    <View style={{flexDirection: "row"}}>
        <View style={{width:100, height:100, backgroundColor: "tomato"}}></View>
        <View style={{width:100, height:100, backgroundColor: "teal"}}></View>
        <View style={{width:100, height:100, backgroundColor: "orange"}}></View>
    </View>
  );
}

