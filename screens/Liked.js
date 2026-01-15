import { View, Text, ScrollView, Pressable, TextInput, FlatList, Image } from 'react-native'
import { Entypo, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LikedList from '../components/LikedList'
import { Player } from '../contexts/PlayContext'


const Liked = () => {
  const navigation = useNavigation()
  const [search, setSearch] = useState('')
  const [likedsongs, setLikedSongs] = useState([])
  const [currTrack, setCurrTrack] = useContext(Player)

  async function getLikedSongs( ) {
      const accessToken = await AsyncStorage.getItem('token')
      const res = await fetch(
        "https://api.spotify.com/v1/me/tracks?offset=0&limit=50",{
          headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: { limit: 50}
        }
      )
      if (!res.ok) {
        throw new Error("Failed to fetch");  
      }
      const data = await res.json()
      setLikedSongs(data.items)
  }

    useEffect(() => {
      getLikedSongs()
    },[])

    const playTrack = async () => {
      if(likedsongs.length > 0){
        setCurrTrack(likedsongs[0])
      }
      await play(likedsongs[0])
    }
    const play = async () => {

    }

  return (<>
    <LinearGradient colors={['#614385', '#516395']} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginTop: 40 }}>
        <Pressable>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Pressable style={{ marginTop: 9, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#42275a', padding: 9, flex: 1, borderRadius: 3, height: 30 }}>
            <AntDesign name="search1" size={20} color="white" />
            <TextInput style={{fontWeight: 500}} value={search} onChangeText={(text) => setSearch(search)} placeholder="Search Liked Songs" placeholderTextColor={'white'} />
          </Pressable>
          <Pressable style={{ marginHorizontal: 10, backgroundColor: '#42275a', padding: 10, borderRadius: 3, height: 38 }}>
            <Text style={{color: 'white'}}> Sort</Text>
          </Pressable>
        </Pressable>
        <View style={{height: 50}}/>
        <View style={{marginHorizontal: 10}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Liked Songs</Text>
          <Text style={{color: 'white', fontSize: 13, marginTop: 5}}>430 songs</Text>
        </View>
        <Pressable style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10}}>
          <Pressable style={{width: 30, height: 30, borderBlockColor: 15, backgroundColor: '#1D8954', justifyContent: 'center', alignItems: 'center'}}>
            <AntDesign name="arrowdown" size={20} color="white" />
          </Pressable>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <MaterialCommunityIcons name="cross-bolnisi" size={24} color="#1D8954" />
            <Pressable onPress={playTrack} style={{width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D8954'}}>
              <Entypo name="controller-play" size={24} color="white"/>
            </Pressable>
          </View>
        </Pressable>
        <FlatList data={likedsongs} renderItem={({item}) => {<LikedList item={item} />}} showsVeritcalScrollIndicator={false}/>
      </ScrollView>
    </LinearGradient>

    {currTrack &&(
      <Pressable style={{backgroundColor: '#5072A7', width: '90%', marginBottom: 15, position: 'absolute', borderRadius: 6, left: 20, bottom: 10, flexDirection: 'row', gap: 10, alignItems: 'center' ,justifyContent: 'space-between', marginHorizontal: 'auto', padding: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Image style={{width: 40, height: 40}} source={{uri: currTrack?.track?.album?.image[0].url}}/>
          <Text numberOfLines={1} style={{ fontSize: 13, width: 220, color: 'white', fontWeight: 'bold'}}>{currTrack?.track?.name} ·{" "} {currTrack?.track?.artists[0].name}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <AntDesign name="heart" size={24} color="1D8954" />
          <Pressable>
            <AntDesign name="pausecircle" size={24} color="white" />
          </Pressable>

        </View>
      </Pressable>
    )}
    </>
  )
}

export default Liked