import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { LinearGradient } from 'expo-linear-gradient'
import { Entypo,  MaterialIcons, AntDesign } from '@expo/vector-icons'
// import {  } from '@expo/vector-icons'
import * as AppAuth from 'expo-app-auth'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
    const navigation = useNavigation()
    useEffect(() => {
        const tokenValidity = async ()  => {
            const accessToken = await AsyncStorage.getItem('token')
            const expDate = await AsyncStorage.getItem('expirationDate')
            console.log("acess token", accessToken);
            console.log("exp date", expDate);

            if (accessToken && expDate) {
                const currTime = Date.now()
                if (currTime < parseInt(expDate)){
                    navigation.replace('Main')
                } else{
                    AsyncStorage.removeItem('token')
                    AsyncStorage.removeItem('expirationDate')
                }
            }              
        }
        tokenValidity()
    },[])
    async function authenticate() {
        const config = {
            issue: "https://accounts.spotify.com",
            clientId: '',
            scopes: [
                "user-read-email",
                "user-library-read",
                "user-read-recently-[layed",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public",
            ],
            redirectUrl: 'exp://localhost:19002/--/spotify-auth-callback'
        }
        const result = await AppAuth.authAsync(config)
        console.log(result);
        if (result.accessToken) {
            const expDate = new Date(result.accessTokenExpirationDate?.getTime())
            AsyncStorage.setItem('token', result.accessToken)
            AsyncStorage.setItem('expirationDate', expDate.toString())
            navigation.navigate("Main")
        }

    }
    return (
        <LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }}>
            <SafeAreaView>
                <View style={{ height: 80 }} />
                <Entypo style={{ textAlign: 'center' }} name="spotify" size={80} color="white" />
                <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center', marginTop: 40 }}> Millions of Songs Free on Spotify! </Text>
                <View style={{ height: 80 }} />
                <Pressable onPress={authenticate} style={{ backgroundColor: '#1ec442', padding: 10, marginLeft: 'auto', marginRight: 'auto', width: 340, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                    <Text>Sign in with Spotify</Text>
                </Pressable>
                <Pressable style={{ borderColor: '#C0C0C0', borderWidth: 0.8, backgroundColor: '#131624', padding: 10, marginLeft: 'auto', marginRight: 'auto', width: 340, borderRadius: 25, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginVertical: 10 }}>
                    <MaterialIcons name='phone-android' size={24} color='white' />
                    <Text style={{ fontWeight: '500', color: 'white', textAlign: 'center', flex: 1 }}>Continue with phone number</Text>
                </Pressable>
                <Pressable style={{ borderColor: '#C0C0C0', borderWidth: 0.8, backgroundColor: '#131624', padding: 10, marginLeft: 'auto', marginRight: 'auto', width: 340, borderRadius: 25, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginVertical: 10 }}>
                    <AntDesign name='google' size={24} color='green' />
                    <Text style={{ fontWeight: '500', color: 'white', textAlign: 'center', flex: 1 }}>Sign in with Google</Text>
                </Pressable>
                <Pressable style={{ borderColor: '#C0C0C0', borderWidth: 0.8, backgroundColor: '#131624', padding: 10, marginLeft: 'auto', marginRight: 'auto', width: 340, borderRadius: 25, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginVertical: 10 }}>
                    <Entypo name='facebook' size={24} color='blue' />
                    <Text style={{ fontWeight: '500', color: 'white', textAlign: 'center', flex: 1 }}>Sign in with Facebook</Text>
                </Pressable>

            </SafeAreaView>
        </LinearGradient>

    )
}

export default Login

const styles = StyleSheet.create({})