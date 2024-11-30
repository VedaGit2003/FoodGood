import React from 'react'
import { View,Text, ScrollView, TouchableOpacity, Image } from 'react-native'
// import { categoriesData } from '../../assets/DummyData'
import Animated, { FadeInDown } from 'react-native-reanimated';

const Categories = ({categories, activeCategories,handleChangeCategory}) => {
  return (
    <Animated.View entering={FadeInDown.duration(700).springify()}>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='space-x-4'
        contentContainerStyle={{paddingHorizontal:5}}
        >
            {
                categories.map((item,index)=>{
                    const isactive=item.strCategory==activeCategories;
                    const activeButton=isactive?'bg-amber-400':'bg-black/10'
                    return(
                        <TouchableOpacity
                        key={index}
                        onPress={()=>handleChangeCategory(item.strCategory)}
                        className='flex items-center space-y-1 m-1'
                        >
                            <View className={'p-3 rounded-full '+activeButton}>
                                <Image source={{uri:item.strCategoryThumb}} style={{width:40,height:40}}
                                className='rounded-full'
                                />
                            </View>
                            <Text className={'font-bold text-xs'}>{item.strCategory}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    </Animated.View>
  )
}

export default Categories