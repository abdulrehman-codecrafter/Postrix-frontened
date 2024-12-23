
import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Avatar, Divider } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Post({ post }) {
   const [liked, setLiked] = useState(false);

   return (
      <>
         <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
               <Avatar.Image size={50} source={{ uri: post.user.profilePic }} />
               <View style={{ marginStart: 11 }}>
                  <Text style={styles.userName}>{`Abdul-Rahman ${post.user.name}`}</Text>
                  <Text style={{ color: 'grey', fontSize: 13 }}>The coder</Text>
               </View>
            </View>

            {/* Content */}
            <Text style={styles.content}>{post.content}</Text>
            <Image source={{ uri: post.postImgUrl }} style={styles.postImage} />

            {/* Action Row */}
            <Divider style={{ marginVertical: 10 }} />
            <View style={styles.actionRow}>

               {/* Like Button */}
               <View style={styles.actionButton}>
                  {liked ? (
                     <FontAwesome
                        name="thumbs-up"
                        size={22}
                        color="#3672E9"
                        onPress={() => setLiked(!liked)}
                     />
                  ) : (
                     <FontAwesome
                        name="thumbs-o-up"
                        size={22}
                        color="gray"
                        onPress={() => setLiked(!liked)}
                     />
                  )}
                  <Text style={styles.actionText}>Like</Text>
               </View>

               {/* Comment Button */}
               <View style={styles.actionButton}>
                  <Ionicons
                     name="chatbubble-outline"
                     size={22}
                     color="gray"
                     onPress={() => console.log('Comment Pressed')}
                  />
                  <Text style={styles.actionText}>Comment</Text>
               </View>

               {/* Share Button */}
               <View style={styles.actionButton}>
                  <Ionicons
                     name="arrow-redo-outline"
                     size={22}
                     color="gray"
                     onPress={() => console.log('Share Pressed')}
                  />
                  <Text style={styles.actionText}>Share</Text>
               </View>
            </View>
         </View>
         <Divider bold={true} />
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      marginTop: 10,
      paddingVertical: 15,
      paddingHorizontal: 18,
      backgroundColor: '#fff',
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   userName: {
      marginTop: 5,
      color: 'black',
      fontSize: 14,
      fontWeight: '600',
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
   actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 5,
   },
   actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   actionText: {
      marginLeft: 5,
      fontSize: 14,
      color: 'gray',
   },
});
