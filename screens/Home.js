import { StyleSheet, Text, View, ScrollView, FlatList, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient' 
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import ArtistCard from '../components/ArtistCard';
import RecentPlays from '../components/RecentPlays';
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const [userProfile, setUserProfile] = useState()
  const [recentTrack, setRecentTrack] = useState([])
  const [topArtist, setTopArtist] = useState([])
  const navigation = useNavigation()

  const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem('token')
    try {
      const res = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const data = await res.json()
      setUserProfile(data)
      return data
    } catch (err) {
      console.error(err.message);      
    }
  }

  const greet = () => {
    const nowTime = new Date().getHours()
    if (nowTime < 12){
      return 'Good Morning'
    } else if( nowTime < 16 ){
      return 'Good Afternoon'
    } else{
      return 'Good Evening'
    }
  }

  const message = greet()
  useEffect(() => {
    getProfile()
  },[])

  console.log(userProfile);

  const getRecentSongs = async ( ) => {
      const accessToken = await AsyncStorage.getItem('token')
      try {
        const res = await axios({
          method: "GET",
          url: "https://api.spotify.com/v1/me/player/recently-played?limit=6",
          headers: {
          Authorization: `Bearer ${accessToken}`
        }
        })
        const tracks = res.data.items
        setRecentTrack(tracks)
      } catch (err) {
        console.log(err.message);
        
      }  
    }

    useEffect(() => {
    getRecentSongs()
  },[])

  const renderItem = ({item}) => {
    return (
      <Pressable style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', marginHorizontal: 10, marginVertical: 8, backgroundColor: '#202020', borderRadius: 4, elevation: 3}}>
        <Image style={{height: 55, width: 55}} source={{uri: item.track.album.images[0].url}}/>
        <View style={{flex: 1, marginHorizontal: 8, justifyContent: 'center'}}>
        <Text numberOfLines={2} style={{fontSize: 13, fontWeight: 'bold', color: 'white'}}>{item.track.name}</Text>
        </View>
      </Pressable>
    )
  }

  useEffect(() => {
    const getTopItems = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('token')
        if(!accessToken){
          console.log("Access token no present");
          return
        }
        const type = "artists"
        const res = await axios.get(`https://api.spotify.com/v1/me/top/${type}`,{
          headers: {
          Authorization: `Bearer ${accessToken}`
        }
        })
        setTopArtist(res.data.items)
      } catch (error) {
        console.log(err.message);       
      }
      
    }
  getTopItems()
},[])
  
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{width: 40, height: 40, borderRadius: 20, resizeMode: 'cover'}} source={{ uri: userProfile?.images[0].url}}/>
            <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold', color: 'white'}}>{message}</Text>
          </View>
          <MaterialCommunityIcons name="lightning-bolt-outline" size={24} color="white" />
        </View>
        <View style={{marginHorizontal: 12, marginVertical: 5, flexDirection: 'row', alignItems: 'center', gap10}}>
          <Pressable style={{backgroundColor: '#282828', padding: 10, borderRadius: 30}}> <Text style={{fontSize: 15, color: 'white'}}>Music</Text></Pressable>
          <Pressable  style={{backgroundColor: '#282828', padding: 10, borderRadius: 30}}> <Text style={{fontSize: 15, color: 'white'}}>Podcasts & Shows</Text></Pressable>
        </View>
        <View style={{height: 10}}/>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Pressable onPress={() => navigation.navigate("Liked")} style={{marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, marginHorizontal: 10, marginVertical: 8, backgroundColor: '#202020', borderRadius: 4, elevation: 3}}>
            <LinearGradient colors={['#33006F', '#FFFFFF']}>
              <Pressable style={{width: 55, justifyContent: 'center', alignItems: 'center'}}>
                <AntDesign name="heart" size={24} color="white" />
              </Pressable>
            </LinearGradient>
            <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>Liked Songs</Text>
          </Pressable>
          <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, marginHorizontal: 10, marginVertical: 8, backgroundColor: '#202020', borderRadius: 4 ,elevation: 3}}>
            <Image style={{width: 55,height: 55}} source={{ uri: 'https://i.gravater.cc/100'}}/>
            <View style={styles.randomArtist}>
              <Text  style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>Daveora</Text>
            </View>
          </View>
        </View>
        <FlatList data={recentTrack} renderItem={renderItem} numColumns={2} columnWrapperStyle={{justifyContent: 'space-between'}}/>
        <Text style={{color: "white", fontSize: 19, fontWeight: 'bold', marginHorizontal: 10, marginTop: 10}}>Top Artists</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topArtist.map((item, index) =>{
            <ArtistCard item={item} key={index}/>
          })}
        </ScrollView>
        <View style={{height: 20}}/>
          <Text style={{color: "white", fontSize: 19, fontWeight: 'bold', marginHorizontal: 10, marginTop: 10}}>Recently played</Text>
          <FlatList horizontal showsHorizontalScrollIndicator={false} data={recentTrack} renderItem={({item, index}) => {<RecentPlays item={item} key={index}/>}}/>
      </ScrollView>
    </LinearGradient>
  )
}

export default Home

const styles = StyleSheet.create({})