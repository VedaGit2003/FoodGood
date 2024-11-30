import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image,ImageBackground} from 'react-native';
import Home from './src/screens/Home.js'; 

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './global.css';
import About from './src/screens/About.js';
import Welcome from './src/screens/Welcome.js';
import RecipeDetails from './src/screens/RecipeDetails.js';
import SearchResult from './src/screens/SearchResult.js';

export default function App() {
  const Stack=createNativeStackNavigator()
  return (
    // <ImageBackground className="flex-1 justify-center items-center bg-primary"
    // source={{ uri: 'https://images.unsplash.com/photo-1728847031685-102957148475?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D' }} 
    // > 
    //   <BlurView
    //     style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}
    //     blurType="light" 
    //     blurAmount={10}
    //   >
    //     <Text className="text-blue-600 text-2xl">PawsPoint</Text>
    //     <Button title="Enter" onPress={() => {}} />
    //     <Home />
    //   </BlurView>
    //   <StatusBar style="auto" />
    // </ImageBackground>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
        <Stack.Screen name='About' component={About}/>
        <Stack.Screen name='Welcome' component={Welcome}  options={{ headerShown: false }}/>
        <Stack.Screen name='RecipeDetails' component={RecipeDetails} options={{headerShown:false}}/>
        <Stack.Screen name='SearchResult' component={SearchResult} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
    
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
