import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Profile from "./screens/Profile";
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
const Tab = createBottomTabNavigator()

function BottomTabs(){
    return (
        <Tab.Navigator> 
            <Tab.Screen name="home" component={Home} options={{tabBarLabel: "Home", headerShown: false, tabBarLabelStyle: { color: "white"}, tabBarIcon: ({focused}) => ( focused ? <Entypo name="home" size={24} color="black" /> : <AntDesign name="home" size={24} color="black" />)}}/>  
            <Tab.Screen name="Profile" component={Profile} options={{tabBarLabel: "Home", headerShown: false, tabBarLabelStyle: { color: "white"}, tabBarIcon: ({focused}) => ( focused ? <Ionicons name="person" size={24} color="black" /> : <Ionicons name="person-outline" size={24} color="black" />)}}/>  
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator()
function Navigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={BottomTabs} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation 