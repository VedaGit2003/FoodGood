import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image, Text, View } from 'react-native'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const Welcome = () => {
  const ringPadding1=useSharedValue(0);
  const ringPadding2=useSharedValue(0);
  const navigation=useNavigation()

  useEffect(()=>{
    ringPadding1.value=0;
    ringPadding2.value=0
    setTimeout(()=>{ringPadding1.value=withSpring(ringPadding1.value+50)},100);
    setTimeout(()=>{ringPadding2.value=withSpring(ringPadding2.value+25)},300)
    setTimeout(()=>{navigation.navigate('Home')},1000)
  },[])
  
  return (
    <View className='flex-1 h-full justify-center items-center bg-amber-500'>
        <Animated.View className='bg-white/20 rounded-full' style={{padding:ringPadding1}}>
            <Animated.View className='bg-white/20 rounded-full' style={{padding:ringPadding2}}>
               <Image source={require('../../assets/Images/Welcome.png')}
               style={{height:200,width:200}}
               />
            </Animated.View>
        </Animated.View>
        <View className='mt-10 flex flex-col justify-center items-center space-y-3'>
          <Text className='text-4xl text-white font-extrabold'>FoodGood</Text>
          <Text className='text-white font-bold'>Cook It Right, the FoodGood Way.</Text>
        </View>
    </View>
  )
}

export default Welcome