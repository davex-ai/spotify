import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = () => {
  const [userProfile, setUserProfile] = useState()
  const getProfile = async () => {
        const accessToken = await AsyncStorage.getItem('token')
    
  }
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
          {playlists.map((item, index) => {
            <View>
              </View>
          })}
        </View>

      </ScrollView>

    </LinearGradient>
  )
}

export default Profile

const styles = StyleSheet.create({})