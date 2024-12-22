import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Avatar, Divider, Surface } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Post({ post }) {
   const [liked, setLiked] = useState(false);
   return (
      <>
         <View style={styles.container}>
            <View style={styles.header}>
               <Avatar.Image size={50} source={{ uri: post.user.profilePic }} />
               <View style={{ marginStart: 11 }}>
                  <Text
                     style={styles.userName}>{`Abdul-Rahman ${post.user.name}`}</Text>
                  <Text style={{ color: 'grey', fontSize: 13 }}>The coder</Text>
               </View>
            </View>

            <Text style={styles.content}>{post.content}</Text>
            <Image source={{ uri: post.postImgUrl }} style={styles.postImage} />

            <View style={{ flexDirection: 'row', marginTop: 3 }}>
               <View style={styles.surface} icon="heart">
                  {liked ? (
                     <MaterialCommunityIcons
                        name="cards-heart"
                        size={34}
                        color={'red'}
                        onPress={() => setLiked(!liked)}
                     />
                  ) : (
                     <MaterialCommunityIcons
                        name="cards-heart-outline"
                        size={34}
                        color={'black'}
                        onPress={() => setLiked(!liked)}
                     />
                  )}

                  {/* <Text style={{color: 'grey', fontSize: 22, marginTop: 3}}>
              {post.likes.length}
            </Text> */}
               </View>

               <View
                  style={styles.surface}
                  icon="comment"
                  onPress={() => console.log('Pressed')}>
                  <MaterialCommunityIcons
                     name="comment-outline"
                     size={32}
                     color={'black'}
                     style={{ marginTop: 2 }}
                  />
                  {/* <Text style={{color: 'grey', fontSize: 22, marginTop: 3}}>
              {post.comments.length}
            </Text> */}
               </View>
            </View>
         </View>
         <Divider bold={true} />
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      padding: 15,
   },
   header: {
      flexDirection: 'row',
   },
   userName: {
      marginTop: 5,
      color: 'black',
      fontSize: 14,
      fontWeight: 600,
   },
   content: {
      width: '100%',
      color: 'black',
      marginVertical: 10,
      fontSize: 14,
      margin: 0,
   },
   postImage: {
      borderRadius: 7,
      width: '100%',
      height: 400,
   },

   surface: {
      // backgroundColor: '#F7F7F7',
      paddingHorizontal: 20,
      paddingTop: 8,
      width: 86,
      height: 40,
      marginEnd: 15,
      borderRadius: 30,
      flexDirection: 'row',
      gap: 13,
   },
});
