import { View, Text } from 'react-native'
import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'

export const PostsContext = createContext()

const initialState = { posts: [] }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'SET_POSTS':
            return { ...state, posts: payload }
        case 'ADD_POST':
            return { ...state, posts: [payload, ...state.posts] }
        case 'DELETE_POST':
            return { ...state, posts: state.posts.filter(post => post.id !== payload) }
        case 'UPDATE_POST':
            return { ...state, posts: state.posts.map(post => post.id === payload.id ? payload : post) }
        default:
            return state
    }
}
export default function PostContextProvider(props) {

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const result = await axios.get("https://social-app.up.railway.app/posts")
                const posts = result.data
                dispatch({ type: 'SET_POSTS', payload: posts.data })
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchPosts()
    }, [])

    return (
        <PostsContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </PostsContext.Provider>
    )
}