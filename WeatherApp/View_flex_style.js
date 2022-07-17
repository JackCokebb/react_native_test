
import { View } from 'react-native';

// Remember! component is the way we can configure the OS.
// container View is already flex container by default.
// and by default all the Flex direction is Column in contrast to web.

// normally width and height will not be fixed, because it's not reactive.
// flex: 1 is proportion which means if there is 3 views witgh same flex: 1,
// they are gonna distribute their size equally 1:1:1
// if flex: 2 inside of the parent, that means 2 times of parent flex proportion
// View proportion is meaningful only when there is sibling View
export default function App() { 
  return (
    <View style={{flex: 1, flexDirection: "row"}}>
        <View style={{flex: 1, backgroundColor: "tomato"}}></View>
        <View style={{flex: 2, backgroundColor: "teal"}}></View>
        <View style={{flex: 1, backgroundColor: "orange"}}></View>
    </View>
  );
}

// 07:33!!!!!