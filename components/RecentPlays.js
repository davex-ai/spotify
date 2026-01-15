import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'

const RecentPlays = ({ item }) => {
  return (
    <Pressable style={{ margin: 10 }}>
      <Image source={{ uri: item?.track?.album.images[0].url }} style={{ width: 130, height: 130, borderRadius: 5 }} />
      <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: 500, color: 'white', marginTop: 10 }}>{item?.track?.name}</Text>
    </Pressable>
  )
}

export default RecentPlays