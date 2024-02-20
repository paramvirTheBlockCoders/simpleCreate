import { StatusBar, ImageBackground } from "react-native";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation(); // Get the navigation object using useNavigation hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = await AsyncStorage.getItem('token');
  //     if (token) {
  //       navigation.navigate('Dashboard');
  //     }
  //   };
  //   checkToken();
  // }, []);

  const handleLogin = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        Alert.alert('Error', 'Please enter email and password');
        return;
      }
      console.log(email,password,"req.body");
      const response = await axios.post('http://44.200.180.0:7777/api/v1/auth/loginuser', {
        email: email,
        password: password
      });
  
      const { data } = response.data;
      const token = data;
  
      await AsyncStorage.setItem('token', token);
      console.log("User logged in", token);
      // Navigate to Home screen or do other actions upon successful login
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
  
      if (error.response && error.response.status === 400) {
        Alert.alert('Error', 'Please check email and password');
      } else {
        Alert.alert('Error', 'An error occurred. Please try again later.');
      }
    }
  };
  const handleRegister = async () => {
    try {
      navigation.navigate('Register');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/bg.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/images/logo1.png')} />
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
       
        <TouchableOpacity onPress={handleRegister} style={styles.registerBtn}>
          <Text style={styles.loginText}>REGISTER</Text>
        </TouchableOpacity>
        <Text style={styles.forgot_button}>New User?</Text>
        
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo:{
  height:140,
  width:280,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  registerBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#FF1493",
  },
  loginText: {
    color: 'white',
  },
});
