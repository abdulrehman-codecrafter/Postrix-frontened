import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PostCreate from '../screens/Frontened/PostCreate'
import PostDetails from '../screens/Frontened/PostDetails'
import TabNavigator from './TabNavigator'

export default function AppNavigator() {
    const AppStack= createNativeStackNavigator()
    return (
        
            <AppStack.Navigator>
                <AppStack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
                <AppStack.Screen name="PostCreate" component={PostCreate} />
                <AppStack.Screen name="PostDetails" component={PostDetails} />
            </AppStack.Navigator>
        
    )
}