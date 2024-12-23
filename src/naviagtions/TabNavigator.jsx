// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../screens/Frontened/HomeScreen';
// import ProfileScreen from '../screens/Frontened/ProfileScreen';
// import SettingsScreen from '../screens/Frontened/SettingsScreen';

// const Tab = createBottomTabNavigator();

// export default function TabNavigator() {
//     return (
//         <Tab.Navigator 
//             screenOptions={{
//                 headerShown: false,
//             }}
//         >
//             <Tab.Screen name="Home" component={HomeScreen} />
//             <Tab.Screen name="Profile" component={ProfileScreen} />
//             <Tab.Screen name="Settings" component={SettingsScreen} />
//         </Tab.Navigator>
//     );
// }

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Frontened/HomeScreen';
import ProfileScreen from '../screens/Frontened/ProfileScreen';
import SettingsScreen from '../screens/Frontened/SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused,color }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    // Return the icon component
                    return <Ionicons name={iconName} size={22} color={color} />;
                },
                tabBarActiveTintColor: '#1a73e8', // Active icon color
                tabBarInactiveTintColor: 'gray', // Inactive icon color
                tabBarStyle: {
                    paddingTop: 4, 
                    width: '100%', 
                    height: 60,   
                    // backgroundColor: '#3672E9', 
                    // borderRadius: 30,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                },
                tabBarLabelStyle: {
                    fontSize: 11, // Font size for the label
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}
