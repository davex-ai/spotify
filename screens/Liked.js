import { View, Text, ScrollView, Pressable, TextInput } from 'react-native'
import { Entypo, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const Liked = () => {
  const navigation = useNavigation()
  const [search, setSearch] = useState('')
  return (
    <LinearGradient colors={['#614385', '#516395']} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginTop: 40 }}>
        <Pressable>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Pressable style={{ marginTop: 9, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#42275a', padding: 9, flex: 1, borderRadius: 3, height: 30 }}>
            <AntDesign name="search1" size={20} color="white" />
            <TextInput value={search} onChangeText={(text) => setSearch(search)} placeholder="Search Liked Songs" placeholderTextColor={'white'} />
          </Pressable>
          <Pressable style={{ marginHorizontal: 10, backgroundColor: '#42275a', padding: 10, borderRadius: 3, height: 38 }}>
            <Text> Sort</Text>
          </Pressable>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  )
}

export default Liked