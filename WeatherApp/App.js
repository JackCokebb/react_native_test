// StatusBar is the third party package
// StatusBar represents clock, battery, wifi etc on the top of the phone screen
// it is located under the Text component on the code 
// but actually on the phone, it is locate on the top.
// this is proof that some component and react native are just component that communicate with OS but not on screen
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  // everything i gonna make will be with View. No div!
  // every text must be inside of <Text></Text> text component
  return (
    <View style={
      {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }
    }>
      <Text style={styles.myText}>Hello! World!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// styleSheet.create is used to create (style) object.
// this is object of styles
// styleSheet.create supports auto complete
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myText:{
    fontSize: 28,
  },
});

// A same way as above but this way does not support auto complete
const style2 = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
}
