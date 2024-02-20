import { StatusBar, ImageBackground } from "react-native";
import axios from 'axios';
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScanorManorGo = () => {
  const navigation = useNavigation(); 
  const route = useRoute(); // Accessing the route object
  

  const { ArtNo, Message } = route.params; // Extracting ArtNo and Message from route params

  console.log(ArtNo,Message,"scanmango screen");
  
  const handleRegister = async () => {
    try {
      console.log("scan item call");
      Alert.alert('Take Patience', 'We are Working on it');
      // navigation.navigate('Login1');
    } catch (error) {
      console.error('Navigation failed:', error.message);
    }
  };

  const handleRegister1 = async () => {
    try {
      console.log("manually call");
      navigation.navigate('EnterManually');
    } catch (error) {
      console.error('Navigation failed:', error.message);
    }
  };
  const gotocart = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      console.log(Message,ArtNo,value,"manually call");
      const response = await axios.post('http://204.236.246.166:7777/api/v1/auth/check', {
        message: Message,
        artNo:ArtNo,
        quantity:1,
        email:value
      });
     
      console.log("checkout api hit");
      navigation.navigate('CheckoutScreen1');
    } catch (error) {
      console.error('Navigation failed:', error.message);
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/bg/bg3.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/images/logo1.png')} />
        <StatusBar style="auto" />
        <TouchableOpacity onPress={handleRegister} style={styles.registerBtn}>
          <Text style={styles.loginText}>Scan item</Text>
        </TouchableOpacity>
       
        <TouchableOpacity onPress={handleRegister1} style={{ ...styles.registerBtn }}>
          <Text style={styles.loginText}>Enter manually</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={gotocart} style={{ ...styles.registerBtn, backgroundColor: '#fa454d' }}>
          <Text style={styles.loginText}>Go to cart</Text>
        </TouchableOpacity>
        
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo:{
    height: 140,
    width: 280,
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
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "#fa454d",
    borderWidth: 2,
  },
  loginText: {
    color: 'black',
  },
});

export default ScanorManorGo;
