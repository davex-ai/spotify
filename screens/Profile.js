import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import j from "../assets/icon.png";


const Profile = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [playlist, setPlaylist] = useState([])

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
    useEffect(() => {
      getProfile()
    },[])
    
    useEffect(() => {
      const getPlaylist = async () => {
          const accessToken = await AsyncStorage.getItem('token')
          try {
                  const res = await axios.get( 
                     "https://api.spotify.com/v1/me/player/recently-played?limit=6",{
                         headers: {
                         Authorization: `Bearer ${accessToken}`
                       },                      
                     }
                  )
                  setPlaylist(res.data.items)
                } catch (err) {
                  console.log("Error",err.message);
                  
                } 

        }
        getPlaylist()
      },[])
    
  // const
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{padding: 12}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <View>

            <Image style={{ width: 40, height: 40, borderRadius: 20, resizeMode: 'cover' }} source={{ uri: userProfile?.images[0].url }} />
<Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>{userProfile?.display_name}</Text>
<Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>{userProfile?.email}</Text>
            </View>
          </View>
        </View>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginHorizontal: 12}}>Your Playlists</Text>
        <View>
          {playlist.map((item, index) => {
            <View>
              <Image source={{ uri: item?.images[0]?.url || '../assets/icon.png'}} style={{width: 50, height: 50, borderBottomLeftRadius: 4}}/>
              </View>
          })}
        </View>

      </ScrollView>

    </LinearGradient>
  )
}

export default Profile

const styles = StyleSheet.create({})