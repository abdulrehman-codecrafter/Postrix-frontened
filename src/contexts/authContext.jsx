import { View, Text } from 'react-native'
import React, { createContext, useEffect, useReducer, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const AuthContext = createContext()

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'SET_USER':
            return {
                ...state,
                user: payload
            }
        default:
            return state
    }
}

const initialState = {
    user: "",
}

export default function AuthContextProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const fetchUser = async()=>{
            try{
                const token = await AsyncStorage.getItem('token')
                console.log(token)
                if(token){
                    const result = await axios.get('https://social-app.up.railway.app/users/me',{
                        headers:{
                            Authorization: token
                        }
                    })
                    if(result.data.error){
                        return alert(result.data.error)
                    }
                    console.log(result.data.data)
                    axios.defaults.headers.common['Authorization'] = token
                    dispatch({type:'SET_USER',payload:result.data.data})
                }
            }catch(err){
                console.error(err)
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchUser()
    },[])

    return (
        <AuthContext.Provider value={{ ...state, dispatch, isLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}