import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import MasonryList from '@react-native-seoul/masonry-list';
import { recipeData } from '../../assets/DummyData';
import Animated,{ FadeInDown } from 'react-native-reanimated';
import Loading from './Loading';
import CachedImage from '../helper/CachedImage';
import { useNavigation } from '@react-navigation/native';
import { SharedTransition } from 'react-native-reanimated';

const Recipes = ({categories,meals,setMeals}) => {
    const navigation=useNavigation()
    return (
        <View>
            <Text className='text-2xl font-bold m-2'>Recipes</Text>
            <View>{
                categories.length==0 || meals.length==0?
                <Loading size='large' className='mt-20' />
                :
                <MasonryList
                data={meals}
                keyExtractor={(item)=> item.idMeal}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item,i }) => <CardItem item={item} index={i} navigation={navigation}/>}
               // refreshing={isLoadingNext}
                //onRefresh={() => refetch({ first: ITEM_CNT })}
                onEndReachedThreshold={0.1}
                //onEndReached={() => loadNext(ITEM_CNT)}
            />
                }

            </View>
        </View>
    )
}

const CardItem=({item,index,navigation})=>{
    const isEven=index%2==0
return(
    <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
  <Pressable
  style={{width:'100%',paddingLeft:isEven?0:5,paddingRight:isEven?5:0}}
  className='flex justify-center mb-4 space-y-4'
  onPress={()=>{navigation.navigate('RecipeDetails',{...item})}}
  >
    {/* <Image source={{uri:item.strMealThumb}}
    style={{ height: index%3==0?130:200, width: '100%',borderRadius:35}}
    className='bg-black'
    /> */}

<CachedImage
  uri={item.strMealThumb}
  style={{
    height: index % 3 === 0 ? 130 : 200,
    width: '100%',
    borderRadius: 35,
    
  }}
  // sharedTransitionTag={item.strMeal}
  // SharedTransition={item.strMeal}
/>

    <Text className='text-neutral-600 font-bold'>{item.strMeal.length>20?item.strMeal.slice(0,20)+'...':item.strMeal}</Text>

  </Pressable>
    </Animated.View>
)
}

export default Recipes