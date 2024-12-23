import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {PostsContext} from '../../contexts/postsContext';
import Post from '../../components/Post';
import PostSkeleton from '../../components/PostSkeleton';
import {Avatar, Button, Surface} from 'react-native-paper';
import {AuthContext} from '../../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation}) {
  const {posts, fetchPosts} = useContext(PostsContext); // Destructure fetchPosts from PostsContext
  const {user, dispatch} = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);


  const onRefresh = async () => {
    setLoading(true); // Start loading spinner
    await fetchPosts(); // Trigger refresh from the context
    setLoading(false); // Stop loading spinner
  };

  return (
    <View style={styles.container}>
      {/* App Title */}
      <Surface style={styles.surface} elevation={4}>
        <Image
          source={require('../../assets/postrix-logo.png')}
          style={{marginTop: -5, width: 160, height: 60}}
        />
        <Button
          icon="logout"
          mode="contained"
          onPress={async () => {
            dispatch({type: 'LOGOUT'});
            await AsyncStorage.removeItem('token');
          }}
          style={{
            marginTop: -50,
            marginStart: 300,
            width: 100,
            height: 40,
            borderRadius: 20,
          }}>
          Logout
        </Button>

        <View style={{flexDirection: 'row'}}>
          <Avatar.Image
            size={43}
            source={{uri: user.profilePic}}
            style={{marginStart: 11, marginTop: 11, marginBottom: 5}}
          />
          <TouchableOpacity
            style={styles.outlinedInput}
            onPress={() => navigation.navigate('PostCreate')}>
            <Text style={styles.inputText}>Post Anything You Want</Text>
          </TouchableOpacity>
        </View>
      </Surface>

      {/* Posts Feed */}
      {posts ? (
        <FlatList
          data={posts}
          keyExtractor={post => post._id.toString()}
          renderItem={({item}) => <Post post={item} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        />
      ) : (
        <PostSkeleton />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Light background for better readability
  },
  surface: {
    elevation: 4,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    padding: 10,
  },
  outlinedInput: {
    borderWidth: 1, // Border for the outline
    borderColor: 'grey', // Primary color for the border
    borderRadius: 30, // Rounded corners
    width: '80%',
    marginTop: 13, // Spacing around the component
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    marginStart: 10,
    height: 40, // Set the height of the input
  },
  inputText: {
    color: '#1a73e8', // Match the border color for consistency
    fontSize: 14, // Readable font size
    color: 'grey',
  },
});
