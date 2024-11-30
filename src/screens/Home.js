import { useNavigation,useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState,useCallback } from 'react'
import { BackHandler, Alert, View, Text, Button, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../shared/Categories'
import axios from 'axios'
import Recipes from '../shared/Recipes'
import { HeartIcon } from 'react-native-heroicons/solid'

const Home = () => {
  const [activeCategories,setActiveCategories]=useState('Beef')
  const [categories,setCategories]=useState([])
  const [meals,setMeals]=useState([])
  const [searchText,setSearchText]=useState('')
  const [searchResult,setSearchResult]=useState()
  const navigation = useNavigation()


  const handleSearch = async () => {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
        if (response && response?.data) {
            const meals = response?.data?.meals; // Extract meals array
            setSearchResult(meals); // Update state
            navigation.navigate('SearchResult', { meals }); // Pass meals as a property
        }
    } catch (error) {
        console.log(error);
    }
};

  // getting categories
  const getData=async()=>{
    try{
       const response=await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      //  console.log(response.data.categories)
      if (response && response.data){
      setCategories(response?.data?.categories)
      }
    }catch(error){
      console.log(error)
    }
  }

  //geting meals
  const getMeal=async(category='Beef')=>{
    try{
      const response=await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      if (response && response.data){
        setMeals(response?.data?.meals)
      }
    
    }catch(error){
      console.log(error)
    }
  }

  //handle change chategories
  const handleChangeCategory=category=>{
    getMeal(category)
    setActiveCategories(category)
    setMeals([])
  }
  
  // Disable the back button only when this screen is in focus
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true; // Prevents default behavior
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove(); // Cleanup when leaving the screen
    }, [])
  );

  useEffect(()=>{
    getData()
    getMeal()
  },[])
  return (
    <View className='h-full w-full bg-blue-100'>
      <ScrollView className='flex flex-1'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: '10%', padding: '5%' }}
      >
        <View className='flex flex-row items-center justify-between'>
          <Image source={require('../../assets/Images/avatar.png')}
            style={{ height: 30, width: 30 }} className='rounded-full' />
          <BellIcon size={30} color="gray" />
        </View>
        <View className='flex pt-3 gap-3'>
          <Text className='text-pretty font-bold text-gray-400'>Hey there,</Text>
          <Text className='text-pretty font-bold text-xl text-gray-400'>
            Here is your favourite receipies...
          </Text>
          <Text className='text-gray-500 font-bold text-2xl tracking-widest'>
            Enjoy food in your
            <Text className='text-amber-500 text-3xl font-extrabold'> Home..</Text>
          </Text>
        </View>
        {/* search bar  */}
        <View className='bg-black/5 mt-5 p-2 flex flex-row justify-between items-center rounded-full'>
          <TextInput placeholder='Search receipe...'
            className='font-bold text-xl mb-1 w-fit'
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity className='bg-amber-400 rounded-full p-3' onPress={handleSearch}>
            <MagnifyingGlassIcon size={30} color={'black'} />
          </TouchableOpacity>
        </View>
      
 
 {/* categories view  */}
        <View className='w-full mt-3'>
          {categories.length>0 &&  <Categories categories={categories} activeCategories={activeCategories} handleChangeCategory={handleChangeCategory} />}
        </View>
{/* Card View  */}
        <Recipes categories={categories} meals={meals} setMeals={setMeals}/>

                    {/* CopyRight */}
                    <View className='flex flex-col mt-6'>
            <Text className='text-gray-700/45 font-bold text-4xl flex justify-center items-center'>Crafted With
              <HeartIcon size={50} color={'red'}></HeartIcon>
            </Text>
            <Text className='text-gray-700/45 font-bold text-4xl flex justify-center items-center'>by Veda's</Text>
            </View>
            

      </ScrollView>

    </View>
  )
}

export default Home