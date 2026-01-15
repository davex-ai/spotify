import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { LinearGradient } from 'expo-linear-gradient'
// import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'




const Home = () => {
  const [userProfile, setUserProfile] = useState()
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
        <View>
          <Pressable style={{marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, marginHorizontal: 10, marginVertical: 8, backgroundColor: '#202020', borderRadius: 4, elevation: 3}}>
            <LinearGradient colors={['#33006F', '#FFFFFF']}>
              <Pressable style={{width: 55, justifyContent: 'center', alignItems: 'center'}}>
                <AntDesign name="heart" size={24} color="white" />
              </Pressable>
            </LinearGradient>
            <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>Liked Songs</Text>
          </Pressable>
          <View></View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default Home

const styles = StyleSheet.create({})