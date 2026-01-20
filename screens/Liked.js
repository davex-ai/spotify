import { View, Text, ScrollView, Pressable, TextInput, FlatList, Image } from 'react-native'
import { BottomModal, ModalContent } from 'react-native-modals'
import { Entypo, MaterialCommunityIcons, Ionicons, Feather ,AntDesign } from '@expo/vector-icons'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Audio } from 'expo-av'
import { debounce } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LikedList from '../components/LikedList'
import { Player } from '../contexts/PlayContext'
import { ActivityIndicator } from 'react-native/types_generated/index'


const Liked = () => {
  const navigation = useNavigation()
  const [search, setSearch] = useState('')
  const [likedsongs, setLikedSongs] = useState([])
  const [currTrack, setCurrTrack] = useContext(Player)
  const [currSound, setCurrSound] = useState(null)
  const [currTime, setCurrTime] = useState(0)
  const [trackDuration, setTrackDuration] = useState(0)
  const [progress, setProgress] = useState(null)
  const [searchTrack, setSearchTrack] = useState([])
  const [isPlaying, setisPlaying] = useState(false)
  const [modal, setModal] = useState(false)
  const value = useRef(0)

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

    const play = async (nextTrack) => {
      const preview_url = nextTrack?.track?.preview_url
      try {
        if (currSound) {
          await currSound.stopAsync          
        }
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: false
        })
        const {sound, status} = await Audio.Sound.createAsync(
          {
            uri: preview_url
          },
          {
            shouldPlay: true, 
            isLooping: false
          },
          onPlaybackStatusUpdate
        )
        onPlaybackStatusUpdate(status)
        setCurrSound(sound)
        setisPlaying(status.isLoaded)
        await sound.playAsync
      } catch (err) {
        console.log(err.message);        
      }
    }

    const formatTime = async (time) => {
      const mins = Math.floor(time / 60000)
      const secs = Math.floor((time / 60000) / 1000)
      return `${mins}: ${secs < 10 ? "0" :"" }${secs}`
    }

    const handlePlay = async () => {
      if(currSound){
        if(isPlaying){
          await currSound.pauseAsync()
        } else{
          await currSound.playAsync( )
        }
        setisPlaying(!isPlaying)
      }
    }

    const onPlaybackStatusUpdate = async (status) => {
      if (status.isLoaded && status.isPlaying) {
        const progress = status.positionMillis / status.durationMillis
        setProgress(progress)
        setCurrTime(status.positionMillis)
        setTrackDuration(status.durationMillis)
      }
      if(status.didJustFinish === true){
        setCurrSound(null)
        playNextTrack()
      }
    }

    const debouncedSearch = debounce(handleSearch, 800)
    function handleSearch(text){
      const filterTrack = likedsongs.filter((item) => item.track.name.toLowerCase().includes(text.toLowerCase()))

      setSearchTrack(filterTrack)      
    }

    useEffect(() => {
if(likedsongs.length > 0) handleSearch(input)
    },[likedsongs])
    const handleInput = async (text) => {
      setSearch(text)
      debouncedSearch(text)
    }

    const playNextTrack = async ( ) => {
      if(currSound){
        await currSound.stopAsync()
        setCurrSound(null)
      }
      value.current += 1
      if(value.current < likedsongs.length){
        const nextTrack =  likedsongs[value.current]
        setCurrTrack(nextTrack)
        await play(nextTrack)
      }else{
        console.log("end of list");
        
      }
    }
    const playPrevTrack = async ( ) => {
      if(currSound){
        await currSound.stopAsync()
        setCurrSound(null)
      }
      value.current -= 1
      if(value.current < likedsongs.length){
        const nextTrack =  likedsongs[value.current]
        setCurrTrack(nextTrack)
        await play(nextTrack)
      }else{
        console.log("end of list");
        
      }
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
            <TextInput style={{fontWeight: 500, color: 'white'}} value={search} onChangeText={(text) => handleInput(text)} placeholder="Search Liked Songs" placeholderTextColor={'white'} />
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
          <Pressable style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#1D8954', justifyContent: 'center', alignItems: 'center'}}>
            <AntDesign name="arrowdown" size={20} color="white" />
          </Pressable>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <MaterialCommunityIcons name="cross-bolnisi" size={24} color="#1D8954" />
            <Pressable onPress={playTrack} style={{width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D8954'}}>
              <Entypo name="controller-play" size={24} color="white"/>
            </Pressable>
          </View>
        </Pressable>
        {searchTrack.length === 0 ? (
          <ActivityIndicator size="large" color={"gray"} />
        ) : (
          <FlatList data={searchTrack} renderItem={({item}) => {<LikedList item={item} onPress={play} isPlaying={item === currTrack} />}} showsVeritcalScrollIndicator={false}/>
        )}
      </ScrollView>
    </LinearGradient>

    {currTrack &&(
      <Pressable onPress={() => setModal(!modal)} style={{backgroundColor: '#5072A7', width: '90%', marginBottom: 15, position: 'absolute', borderRadius: 6, left: 20, bottom: 10, flexDirection: 'row', gap: 10, alignItems: 'center' ,justifyContent: 'space-between', marginHorizontal: 'auto', padding: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Image style={{width: 40, height: 40}} source={{uri: currTrack?.track?.album?.image[0].url}}/>
          <Text numberOfLines={1} style={{ fontSize: 13, width: 220, color: 'white', fontWeight: 'bold'}}>{currTrack?.track?.name} ·{" "} {currTrack?.track?.artists[0].name}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <AntDesign name="heart" size={24} color="#1D8954" />
          <Pressable>
            <AntDesign name="pausecircle" size={24} color="white" />
          </Pressable>

        </View>
      </Pressable>
    )}
    <BottomModal visible={modal} swipeDirection={['up', 'down']} swipeThreshold={200} onHardwareBackPress={() => setModal(false)}>
        <ModalContent style={{height: '100%', width: '100%', backgroundColor: '#5072A7'}}>
          <View style={{height: '100%', width: '100%', marginTop: 40}}>
          <Pressable style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <AntDesign onPress={() => setModal(!modal)} name="down" size={24} color="white" />
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>{currTrack?.track?.name}</Text>
            <Entypo name="dots-three-vertical" size={24} color='black '/>
          </Pressable>
          <View style={{height: 70}}/>
          <View>
          <Image style={{ width: '100%', height: 330, borderRadius:5}}source={{uri: currTrack?.track?.album?.images[0].url}}/>
          <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{ }}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>{currTrack?.track?.name}</Text>
              <Text style={{color: '#D3D3D3', marginTop: 4 }}>{currTrack?.track?.artists[0].name}</Text>
            </View>
             <AntDesign name="heart" size={24} color="#1D8954" />

          </View>

          <View style={{marginTop: 10}}>
            <View style={{
              width: '100%', marginTop: 10, height: 3, backgroundColor: 'gray', borderRadius: 5 }}>
            {/* <View style={{ height: '100%', backgroundColor: 'white',{ width: `${progress * 100}%`}}}/> */}
            {/* <View style={{{position: 'absolute', top: -5, width: 12, height: 12, borderRadius: 6, backgroundColor: 'white'},{left: `${progress * 100}%`, marginLeft: 6 }}}/> */}
            </View>
            <View style={{marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{color: '#D3D3D3', fontSize: 15}}>{formatTime(currTime)}</Text>
              <Text style={{color: '#D3D3D3', fontSize: 15}}>{formatTime(trackDuration)}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 17}}>
            <Pressable>
              <FontAwesome name="arrows" size={30} color="#03C03C"/>
            </Pressable>
            <Pressable onPress={playPrevTrack}>
              <Ionicons name="play-skip-back" size={30} color="white"/>
            </Pressable>
            <Pressable onPress={handlePlay}>
              {isPlaying ? (
                  <AntDesign name="pausecircle" size={60} color="white" />
                ) : (
                  <Pressable  onPress={handlePlay} style={{width: 60, height: 60, borderRadius: 30, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    <AntDesign name="controller-play" size={24} color="black" />

                  </Pressable>
              )
              }
            </Pressable>
            <Pressable onPress={playNextTrack}>
              <Ionicons name="play-skip-forward" size={30} color="white"/>
            </Pressable>
            <Pressable>
              <Feather name="repeat" size={30} color="#03C03C"/>
            </Pressable>
          </View>
          </View>
          </View>
        </ModalContent>
    </BottomModal>
    </>
  )
}

export default Liked