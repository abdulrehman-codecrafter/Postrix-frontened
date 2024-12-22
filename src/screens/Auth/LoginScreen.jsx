import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useContext, useState } from 'react';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import { AuthContext } from '../../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = { email: "", password: "" }
export default function LoginScreen({ navigation }) {

  const [state, setState] = useState(initialState)
  const {dispatch}=useContext(AuthContext)
  const handleInputChange = (field, value) => {
    setState((preState) => ({ ...preState, [field]: value }))
  }
  const handleLogin = async () => { 
    try{
      const { email, password } = state
      if (email === "" || password === "") {
        return alert("Please fill in all fields")
      }
      const result = await axios.post('https://social-app.up.railway.app/users/login', {
        email,
        password
      })
      if (result.data.data.error) {
        return alert(result.data.error)
      }
      console.log(result)
      const token = result.data.data.token

      if (!token) {
        return alert("Failed to get token");
      }

      console.log(token)
      axios.defaults.headers.common['Authorization'] = token

      await AsyncStorage.setItem('token', token)
      dispatch({type:'SET_USER',payload:result.data.data.user})

    } catch(err){
      console.error(err)
    }
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <Image
              source={require('../../assets/logo1.png')}
              style={{ marginTop: -100, width: 200, height: 200, marginBottom: 10 }}
            />

            <Text style={{ fontSize: 35, color: 'black', fontWeight: '500' }}>Welcome to</Text>
            <Text style={{ fontSize: 35, color: '#3672E9', fontWeight: '700', marginTop: -10, marginBottom: 20 }}>
              Postrix
            </Text>

            <TextInput activeOutlineColor={'#3672E9'}
              onChangeText={(value) => handleInputChange('email', value)}
              mode="outlined"
              style={{ width: 320, backgroundColor: 'white' }}
              label="Email"
              right={<TextInput.Icon icon="email" />}
            />
            <TextInput
              activeOutlineColor={'#3672E9'}
              onChangeText={(value) => handleInputChange('password', value)}
              mode="outlined"
              style={{ width: 320, backgroundColor: 'white', marginTop: 15 }}
              label="Password"
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', letterSpacing: 0.7 }}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
            <Text style={{ color: 'black', fontSize: 16 }}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ color: '#3672E9', fontSize: 16, fontWeight: '600' }}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3672E9',
    borderWidth: 1,
    borderColor: '#3672E9',
    borderStyle: 'solid',
    borderRadius: 10,
    width: 320,
  },
});
