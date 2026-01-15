import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Profile from "./screens/Profile";
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
const Tab = createBottomTabNavigator()

function BottomTabs(){
    return (
        <Tab.Navigator screenOptions={{tabBarStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, shadowOpacity: 4, shadowRadius: 4, elevation: 4, shadowOffset: { width: 0, height: -4}, borderTopWidth: 0 }}}> 
            <Tab.Screen name="home" component={Home} options={{tabBarLabel: "Home", headerShown: false, tabBarLabelStyle: { color: "white"}, tabBarIcon: ({focused}) => ( focused ? <Entypo name="home" size={24} color="white" /> : <AntDesign name="home" size={24} color="white" />)}}/>  
            <Tab.Screen name="Profile" component={Profile} options={{tabBarLabel: "Home", headerShown: false, tabBarLabelStyle: { color: "white"}, tabBarIcon: ({focused}) => ( focused ? <Ionicons name="person" size={24} color="white" /> : <Ionicons name="person-outline" size={24} color="white" />)}}/>  
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator()
function Navigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="Main" component={BottomTabs} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation 