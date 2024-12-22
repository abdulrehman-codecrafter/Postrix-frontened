import React, { useContext } from 'react'
import MainNavigator from './src/naviagtions/MainNavigator'
import { AuthContext } from './src/contexts/authContext'
import SplashScreen from './src/components/SplashScreen'

export default function App() {
  const { isLoading } = useContext(AuthContext)
  
  return isLoading ? <SplashScreen /> : <MainNavigator />
}