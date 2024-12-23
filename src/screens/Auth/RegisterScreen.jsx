import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';

const initialState = { name: "", email: "", password: "", confirmPassword: "" }

const regex = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;


export default function RegisterScreen({ navigation }) {
  const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setState((preState) => ({ ...preState, [field]: value }))
  }

  const handleRegister = async () => {

    // Handle Register

    try {
      setIsLoading(true)
      const { name, email, password, confirmPassword } = state
      if (name === "" || email === "" || password === "" || confirmPassword === "") {
        return alert("Please fill in all fields")
      }
      if (!regex.test(email)) {
        return alert("Invalid email")
      }
      if (password !== confirmPassword) {
        return alert("Passwords do not match")
      }
      const result = await axios.post('https://social-app.up.railway.app/users/register', {
        name,
        email,
        password
      })
      if (result.data.error) {
        return alert(result.data.error)
      }
      alert("User registered successfully")
    } catch (err) {
      console.error(err)
    }
    finally {
      setIsLoading(false)
    }

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* TouchableWithoutFeedback wraps the entire screen to detect taps outside of the input fields */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {/* ScrollView allows the screen to be scrollable */}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>


            <Text style={{ fontSize: 35, color: 'black', fontWeight: '500' }}>Create an Account</Text>
            <Text style={{ fontSize: 35, color: '#3672E9', fontWeight: '700', marginTop: -10, marginBottom: 20 }}>
              Postrix
            </Text>

            {/* Name Input */}
            <TextInput
              activeOutlineColor={'#3672E9'}
              onChangeText={(value) => handleInputChange('name', value)}
              value={state.name}
              mode="outlined"
              style={{ width: 320, backgroundColor: 'white' }}
              label="Full Name"
              right={<TextInput.Icon icon="account" />}
            />

            {/* Email Input */}
            <TextInput
              activeOutlineColor={'#3672E9'}
              onChangeText={(value) => handleInputChange('email', value)}
              value={state.email}
              mode="outlined"
              style={{ width: 320, backgroundColor: 'white', marginTop: 15 }}
              label="Email"
              right={<TextInput.Icon icon="email" />}
            />

            {/* Password Input */}
            <TextInput
              activeOutlineColor={'#3672E9'}
              onChangeText={(value) => handleInputChange('password', value)}
              value={state.password}
              mode="outlined"
              style={{ width: 320, backgroundColor: 'white', marginTop: 15 }}
              label="Password"
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
            />

            {/* Confirm Password Input */}
            <TextInput
              activeOutlineColor={'#3672E9'}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              value={state.confirmPassword}
              mode="outlined"
              style={{ width: 320, backgroundColor: 'white', marginTop: 15 }}
              label="Confirm Password"
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
            />

            <View style={styles.button}>
              <Button mode="contained" loading={isLoading} onPress={handleRegister} style={{ width: 320, backgroundColor: '#3672E9' }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '450', letterSpacing: 0.9 }}>Register</Text>
              </Button>
            </View>
          </View>

          <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
            <Text style={{ color: 'black', fontSize: 16 }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: '#3672E9', fontSize: 16, fontWeight: '600' }}>Login</Text>
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
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3672E9',
    borderWidth: 1,
    borderColor: '#3672E9',
    borderStyle: 'solid',
    borderRadius: 10,
  },
});
