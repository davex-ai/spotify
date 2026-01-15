import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
// import { LinearGradient } from 'expo-linear-gradient'


const Home = () => {
  const [userProfile, setUserProfile] = useState([])
  const getProfile = async () => {
    const accessToken = AsyncStorage.getItem('token')
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

  
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <Text>Home</Text>
      </ScrollView>
    </LinearGradient>
  )
}

export default Home

const styles = StyleSheet.create({})