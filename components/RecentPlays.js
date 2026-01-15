import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'

const RecentPlays = ({item}) => {
  return (
    <Pressable>
        <Image source={{uri: item?.track?.album.images[0].uri}} style={{width: 130, height: 130, borderRadius: 5}}/>
        <Text>{item?.track?.name}</Text>
    </Pressable>
  )
}

export default RecentPlays