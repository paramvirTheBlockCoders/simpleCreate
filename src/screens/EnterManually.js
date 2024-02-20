import { StatusBar, ImageBackground } from "react-native";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const EnterManually = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      if (!email.trim()) {
        Alert.alert('Error', 'Please enter id');
        return;
      }
      console.log(email,"id here");
      
      const response = await axios.post('http://204.236.246.166:7777/api/v1/auth/getdetail', {
        id: email
      });
  
      const { data } = response.data;
      const res = data;
 
      // console.log("User logged in", res);
      navigation.navigate('ProductDetail', { productData: res });
    } catch (error) {
      console.error('An error occurred. Please try again later.', error.message);
      if (error.response && error.response.status === 400) {
        Alert.alert('Error', 'An error occurred. Please try again later.');
      } else {
        Alert.alert('Error', 'An error occurred. Please try again later.');
      }
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/bg/bg4.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/images/logo1.png')} />
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter id"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
      
        <TouchableOpacity onPress={handleLogin} style={{ ...styles.loginBtn, backgroundColor: '#fa454d' }}>
          <Text style={styles.loginText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 140,
    width: 280,
    marginBottom: 15,
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
    flexDirection: 'row',
    backgroundColor: "#FFFFFF",
    borderColor: "#fa454d",
    borderWidth: 2,
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
  passwordToggle: {
    position: 'absolute',
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20, // Adjust icon width
    height: 20, // Adjust icon height
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  loginText: {
    color: 'white',
  },
});

export default EnterManually;
