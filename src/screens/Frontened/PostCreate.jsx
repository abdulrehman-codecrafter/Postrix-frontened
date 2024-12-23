// import {View, Text, StyleSheet} from 'react-native';
// import React, {useContext} from 'react';
// import {AuthContext} from '../../contexts/authContext';
// import {Avatar, Button} from 'react-native-paper';

// export default function PostCreate() {
//   const {user} = useContext(AuthContext);
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//           <Avatar.Image size={50} source={{uri: user.profilePic}} />
//           <View style={{marginStart: 11}}>
//             <Text style={styles.userName}>{`Abdul-Rahman ${user.name}`}</Text>
//             <Text style={{color: 'grey', fontSize: 13}}>The coder</Text>
//           </View>
//         </View>
//         <Button
//           icon="post"
//           mode="contained"
//           style={{justifySelf: 'flex-end'}}
//           onPress={() => console.log('Post')}>
//           Post
//         </Button>
//       </View>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     margin: 15,
//   },
//   header: {
//     // marginVertical: 10,
//     //  flex:1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   userName: {
//     marginTop: 5,
//     color: 'black',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });

import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../../contexts/authContext';
import {Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {launchImageLibrary} from 'react-native-image-picker';

export default function PostCreate() {
  const {user} = useContext(AuthContext);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 600,
        maxHeight: 600,
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.error('Image Picker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          setImage(selectedImage.uri);
        }
      },
    );
  };

  const handlePost = () => {
    console.log('Post content:', text);
    console.log('Image URI:', image);
    // Add logic to save the post (e.g., upload to Firestore or backend server)
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* User Information */}
      <View style={styles.header}>
        <Avatar.Image size={60} source={{uri: user.profilePic}} />
        <View style={{marginLeft: 10}}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userDescription}>The coder</Text>
        </View>
      </View>

      {/* Input Area */}
      <View style={{flex: 1}}>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor="grey"
          multiline
          value={text}
          onChangeText={setText}
        />

        {/* Image Preview */}
        {image && <Image source={{uri: image}} style={styles.imagePreview} />}

        {/* Upload Photo Button */}
        <TouchableOpacity style={styles.uploadButton}>
          <Ionicons name="image-outline" size={24} color="#1a73e8" />
          <Text style={styles.uploadButtonText}>Upload Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Post Button */}
      <TouchableOpacity
        style={[styles.postButton, !image && {opacity: 0.6}]}
        onPress={handlePost}
        disabled={!image}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#f4f4f4',
    //  justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userDescription: {
    fontSize: 14,
    color: 'grey',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    height: 300,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  imagePreview: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#ccc',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  uploadButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#1a73e8',
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: '#1a73e8',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
