import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'
import { AuthContext } from '../contexts/authContext'


export default function MainNavigator() {
    const {user}=useContext(AuthContext)
    return (
        <NavigationContainer>
            {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

