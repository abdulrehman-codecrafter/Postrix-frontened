import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
   FlatList,
} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';
import {AuthContext} from '../../contexts/authContext';
import Post from '../../components/Post';
import axios from 'axios';
import PostSkeleton from '../../components/PostSkeleton';

export default function ProfilePage() {
  const {user} = useContext(AuthContext);

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const result = await axios.get(
          `https://social-app.up.railway.app/users/profile/${user._id}`,
        );
        const {data} = result.data;
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          source={{uri: 'https://via.placeholder.com/100'}} // Placeholder image
          style={styles.avatar}
        />
        <Text style={styles.userName}>Abdul-Rahman</Text>
        <Text style={styles.bio}>The Coder | React Native Enthusiast</Text>
      </View>

      <Divider bold style={styles.divider} />
      {/* <PostSkeleton/> */}
      {/* Posts Section */}
      <Text>Posts</Text>
      {posts ? (
        <FlatList data={posts} renderItem={({item}) => <Post post={item} />} />
      ) : (
        <PostSkeleton />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    backgroundColor: '#e0e0e0',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  bio: {
    fontSize: 14,
    color: 'grey',
    marginTop: 5,
  },
  divider: {
    marginVertical: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  statLabel: {
    fontSize: 14,
    color: 'grey',
  },
  postsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  post: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  postContent: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});
