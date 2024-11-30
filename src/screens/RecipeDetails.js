import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, Image, StatusBar, TouchableOpacity } from 'react-native'
import { Arrowleft, ChevronLeftIcon, ClockIcon, EyeDropperIcon, FireIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';
import YoutubeIframe from 'react-native-youtube-iframe'
import axios from 'axios'
import Loading from '../shared/Loading';
import CachedImage from '../helper/CachedImage';
import Animated,{AnimatedScrollView} from 'react-native-reanimated';

const RecipeDetails = (props) => {
  // console.log(props.route.params)
  const [favourite, setFavourite] = useState(false)
  const [recipeDetails, setRecipeDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()
  const list = props.route.params;

  useEffect(() => {
    getRecipeDetails(list.idMeal);
  }, [])

  const getRecipeDetails = async (id) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      if (response && response?.data) {
        setRecipeDetails(response?.data?.meals[0])

        setLoading(false)
        // console.log(response?.data?.meals)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getIndexes = (recipeDetals) => {
    if (!recipeDetails) {
      return []
    }
    let index = [];
    for (let i = 0; i <= 20; i++) {
      if (recipeDetails['strIngredient' + i]) {
        index.push(i)
      }
    }
    return index;
  }

  // get youtube video id 
  const getYoutubeVideoId=url=>{
    const regex=/[?&]v=([^&]+)/
    const match=url.match(regex)
    if (match && match[1]){
      return match[1]
    }
    return null
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30, backgroundColor: 'black' }}
    >
           <StatusBar style="light" translucent/>
      {/* //recipe image      */}
      <Image source={{ uri: list.strMealThumb }} style={{ height: 500, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }} className='w-full' 
      // sharedTransitionTag={list.strMeal}
      // SharedTransition={list.strMeal}
      />
      {/* <CachedImage uri= {list.strMealThumb} style={{ height: 500, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }} className='w-full' 
      sharedTransitionTag={list.strMeal}
      // SharedTransition={list.strMeal}
      /> */}

      {/* backbutton and like button  */}
      <View className="pt-14  w-full flex flex-row justify-between items-center absolute">
        <TouchableOpacity className='p-2 ml-2  justify-center bg-white rounded-full'
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={25} color={'black'}></ChevronLeftIcon>
        </TouchableOpacity>
        <TouchableOpacity className='p-2 mr-2  justify-center bg-white rounded-full'
          onPress={() => { setFavourite(!favourite) }}
        >
          <HeartIcon size={25} color={favourite ? 'red' : 'gray'} />
        </TouchableOpacity>
      </View>

      {/* Recipe Details  */}
      {
        loading ?
          <Loading /> :
          <View className='mt-3 px-4 space-y-4 justify-between flex flex-col'>
            <View className='flex flex-col justify-center items-center'>
              <Text className='text-2xl text-white font-bold'>{recipeDetails?.strMeal}</Text>
              <Text className='text-xl text-gray-400 font-semibold'>{recipeDetails?.strArea}</Text>
            </View>
            <View className='flex flex-row justify-between space-x-2 mt-4'>

              <View className='h-32 w-fit flex flex-col items-center justify-between space-y-3 bg-amber-400 rounded-full p-4'>
                <TouchableOpacity className='bg-white p-1 rounded-full font-bold'>
                  <ClockIcon size={30} color={'black'} />
                </TouchableOpacity>
                <View className='flex flex-col items-center'>
                  <Text className='font-bold'>35</Text>
                  <Text>mins</Text>
                </View>
              </View>
              <View className='h-32 w-fit flex flex-col items-center justify-between space-y-3 bg-amber-400 rounded-full p-4'>
                <TouchableOpacity className='bg-white p-1 rounded-full font-bold'>
                  <FireIcon size={30} color={'black'} />
                </TouchableOpacity>
                <View className='flex flex-col items-center'>
                  <Text className='font-bold'>250</Text>
                  <Text>Kcal</Text>
                </View>
              </View>

              <View className='h-32 w-fit flex flex-col items-center justify-between space-y-3 bg-amber-400 rounded-full p-4'>
                <TouchableOpacity className='bg-white p-1 rounded-full font-bold'>
                  <UsersIcon size={30} color={'black'} />
                </TouchableOpacity>
                <View className='flex flex-col items-center'>
                  <Text className='font-bold'>03</Text>
                  <Text>Serve</Text>
                </View>
              </View>

              <View className='h-32 w-fit flex flex-col items-center justify-between space-y-3 bg-amber-400 rounded-full p-4'>
                <TouchableOpacity className='bg-white p-1 rounded-full font-bold'>
                  <Square3Stack3DIcon size={30} color={'black'} />
                </TouchableOpacity>
                <View className='flex flex-col items-center'>
                  <Text className='font-bold'>Easy</Text>
                  {/* <Text>mins</Text> */}
                </View>
              </View>

            </View>

            {/* Ingredient  */}
            <View className='flex flex-col'>
              <View className='mt-2 flex flex-row justify-center items-center'>
                <Text className='text-white font-bold text-2xl'>
                  Ingredients
                </Text>
              </View>
              <View>
                {
                  getIndexes(recipeDetails).map((i) => {
                    return (
                      <View key={i} className='flex flex-row space-x- gap-2 space-y-3 items-center'>
                        <View className='h-4 w-4 rounded-full bg-amber-300'></View>

                        <Text className='text-white text-xl'>{recipeDetails['strMeasure' + i]}</Text>
                        <Text className='text-white font-bold text-xl'>{recipeDetails['strIngredient' + i]}</Text>


                      </View>
                    )
                  })
                }
              </View>
              </View>

              {/* Instructions */}

              <View className='flex flex-col'>
              <View className='mt-2 flex flex-row justify-center items-center'>
                <Text className='text-white font-bold text-2xl'>
                  Instructions
                </Text>
              </View>
                <View>
                  <Text className='text-white font-xl'>
                    {recipeDetails?.strInstructions}
                  </Text>
                </View>
              </View>

              {/* recipe video  */}
            <View>
            <View className='mt-2 flex flex-row justify-center items-center'>
                <Text className='text-white font-bold text-2xl'>
                  Recipe Video
                </Text>
              </View>
              <View>
              <YoutubeIframe
              videoId={getYoutubeVideoId(recipeDetails.strYoutube)}
              height={300}
              >

              </YoutubeIframe>

              </View>

            </View>
            {/* CopyRight */}
            <View className='flex flex-col'>
            <Text className='text-gray-500 font-bold text-4xl flex justify-center items-center'>Crafted With
              <HeartIcon size={50} color={'red'}></HeartIcon>
            </Text>
            <Text className='text-gray-500 font-bold text-4xl flex justify-center items-center'>by Veda's</Text>
            </View>
            
          </View>
      }

    </ScrollView>
  )
}

export default RecipeDetails