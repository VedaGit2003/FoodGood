import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { HeartIcon } from 'react-native-heroicons/solid';

const SearchResult = (props) => {
    const { meals } = props.route.params; // Extract meals from route params
    const list = Array.isArray(meals) ? meals : []; // Ensure it is an array
    const navigation=useNavigation()

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{ backgroundColor: 'black' }}
        >
            <StatusBar style="light" translucent/>
            <View className="mt-10 pl-3">
                <Text className="text-2xl font-bold text-gray-400">Search Results</Text>
            </View>

{/* Meals... */}
            <View className="mt-2">
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <TouchableOpacity key={item.idMeal || index} className="mb-4 h-36 w-full bg-gray-700 px-5 py-2 rounded-lg"
                        onPress={()=>{navigation.navigate('RecipeDetails',{...item})}}
                        >
                            {/* <Text className="text-white">{item.strMeal}</Text> */}
                            <View className='flex flex-row items-center justify-between'>
                            <Image source={{uri:item.strMealThumb}} height={100} width={100} className='rounded-full'/>
                            <View className='flex space-x-3 items-end'>
                               <Text className='text-2xl text-white font-bold'>
                                
                                {item.strMeal.length>20?item.strMeal.slice(0,20)+'...'
                            :item.strMeal   
                            }
                                </Text>
                               <Text className='text-xl text-gray-400 font-bold'>{item.strCategory}</Text>
                               <Text className='text-xl text-gray-400 font-bold'>{item.strArea}</Text>
                            </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View className="mt-10 pl-3 flex flex-row justify-center">
                        <Text className="text-gray-500 text-2xl">😥 No results found.</Text>
                    </View>
                )}
            </View>
{/* CopyRight */}
            <View className='flex flex-col mt-4'>
            <Text className='text-gray-500 font-bold text-4xl flex justify-center items-center'>Crafted With
              <HeartIcon size={50} color={'red'}></HeartIcon>
            </Text>
            <Text className='text-gray-500 font-bold text-4xl flex justify-center items-center'>by Veda's</Text>
            </View>
        </ScrollView>
    );
};

export default SearchResult;
