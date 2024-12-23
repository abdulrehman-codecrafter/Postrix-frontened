import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {Avatar, Button, IconButton} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import {AuthContext} from '../../contexts/authContext';

export default function PostCreate() {
  const [image, setImage] = useState(null);
  const [postText, setPostText] = useState('');
  const {user} = useContext(AuthContext);

  const pickImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (res && res[0]) {
        const {uri, type, name, size} = res[0];
        setImage({uri, type, name, size});
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled image picker');
      } else {
        console.error('Document Picker Error:', err);
      }
    }
  };

  const cancelImage = () => {
    setImage(null); // Reset image selection
  };

  const uploadCloudinary = async () => {
    if (!image) {
      console.error('No image selected for upload');
      return;
    }

    try {
      const data = new FormData();
      data.append('file', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
      data.append('upload_preset', 'socialApp');
      data.append('cloud_name', 'deni18m0m');
      data.append('folder', 'socialApp'); // Optional folder name in Cloudinary

      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/deni18m0m/image/upload',
        data,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

      console.log('Upload successful:', res.data.secure_url);
    } catch (err) {
      console.error('Image upload error:', err.response?.data || err.message);
    }
  };

  const handlePost = () => {
    // Handle post submission and upload image to Cloudinary
    uploadCloudinary();
    console.log('Post submitted:', {postText, image});
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 3}}>
          <View style={{padding: 20}}>
            {/* Avatar Section */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Avatar.Image
                source={{uri: user.profilePic}} // Replace with logged-in user's avatar URL
                size={50}
                style={{marginRight: 10}}
              />
              <View>
                <Text style={{fontWeight: '700', fontSize: 16}}>
                  {user.name}
                </Text>
                <Text style={{fontSize: 14, color: 'gray'}}>
                  React Native Developer
                </Text>
              </View>
            </View>

            {/* Post Text Input */}
            <TextInput
              placeholder="What's on your mind?"
              multiline
              mode="outlined"
              value={postText}
              onChangeText={setPostText}
              style={{
                backgroundColor: '#DADADC',
                height: 50,
                borderColor: '#ddd',
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: 25,
                marginBottom: 20,
                color: 'black',
                fontSize: 16,
              }}
              placeholderTextColor="gray"
              selectionColor="black"
            />

            {/* Image Preview Section */}
            {image ? (
              <>
                <View style={{marginBottom: 20, alignItems: 'center'}}>
                  <Image
                    source={{uri: image.uri}}
                    style={{
                      width: '100%',
                      height: 250,
                      borderRadius: 12,
                      marginBottom: 2,
                      resizeMode: 'cover',
                    }}
                  />
                  {/* Cancel Image Button */}
                  <IconButton
                    icon="close-circle"
                    size={30}
                    iconColor="#e93445"
                    onPress={cancelImage}
                    style={{position: 'absolute', top: 10, right: 10}}
                  />
                </View>
                <Text style={{color:'grey',textAlign:'center'}}>{image.name}</Text>
              </>
            ) : (
              <View
                style={{
                  marginBottom: 20,
                  borderWidth: 2,
                  backgroundColor: '#80808036',
                  borderStyle: 'dashed',
                  borderColor: 'grey',
                  alignItems: 'center',
                  width: '90%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  height: 200,
                  borderRadius: 12,
                }}>
                {/* No Image Selected Text */}
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: 'gray',
                    marginBottom: 20,
                  }}>
                  No image selected
                </Text>
                <Button
                  mode="outlined"
                  icon="image-outline"
                  iconColor="grey"
                  onPress={pickImage}>
                  Pick Image
                </Button>
              </View>
            )}
          </View>
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          {/* Submit Button */}
          <Button
            mode="contained"
            icon="send"
            onPress={handlePost}
            style={{
              margin: 20,
              borderRadius: 20,
              paddingVertical: 5,
              backgroundColor: '#2e64e5',
              
              alignSelf: 'center',
              width: '80%',
            }}>
            Post
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
