import {  Text, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { PostsContext } from '../../contexts/postsContext'
import Post from '../../components/Post'
import { Divider } from 'react-native-paper'

export default function HomeScreen() {
    const { posts} = useContext(PostsContext)
    
    return (
        <>
        <Text style={{color:"black",fontSize:30,fontWeight:900,marginBottom:50}}>Face Book</Text>
        <Divider />
        <FlatList
            data={posts}
            keyExtractor={post => post._id.toString()}
            renderItem={({ item }) => <Post post={item} />}
        />
        </>
    )
}
