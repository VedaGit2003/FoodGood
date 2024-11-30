import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loading = (props) => {
  return (
    <View>
        <ActivityIndicator {...props}/>
    </View>
  )
}

export default Loading