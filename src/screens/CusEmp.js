import { StatusBar, ImageBackground } from "react-native";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const CusEmp = ({ }) => {
  const navigation = useNavigation(); // Get the navigation object using useNavigation hook
 

  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = await AsyncStorage.getItem('token');
  //     if (token) {
  //       navigation.navigate('Dashboard');
  //     }
  //   };
  //   checkToken();
  // }, []);


  const handleRegister = async () => {
    try {
      navigation.navigate('RegorLog');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/bg.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/images/logo1.png')} />
        <StatusBar style="auto" />
        <TouchableOpacity onPress={handleRegister} style={styles.registerBtn}>
          <Text style={styles.loginText}>Are you customer?</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or</Text>
        <TouchableOpacity onPress={handleRegister} style={{ ...styles.registerBtn, backgroundColor: '#fa454d' }}>
  <Text style={styles.loginText}>Are youemployee?</Text>
</TouchableOpacity>
        
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

  registerBtn: {
    width: "80%",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10, // Adjusted marginTop
    backgroundColor: "#FFFFFF",
    borderColor: "#fa454d", // Border color
    borderWidth: 2, // Border width
  },
  loginText: {
    color: 'black',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  orText: {
    marginHorizontal: 10,
    color: 'black', // or whatever color you prefer
  },
});

export default CusEmp;