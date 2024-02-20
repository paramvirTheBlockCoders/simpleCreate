import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Registration = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleRegister = async () => {
    try {
      // Check if passwords match
      if (password !== confirmpassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
  console.log(  email,password,name,address,companyName,"body");
      // Your API call
      const response = await axios.post('http://44.200.180.0:7777/api/v1/auth/registeruser', {
        email,
        password,
        name,
        address,
        companyName
      });

      // Extract token from response
      const { data } = response.data;
      const resData = data;
      console.log(resData,"api hitted");

      // Store token in AsyncStorage
      // await AsyncStorage.setItem('token', token);

      // Navigate to Home screen or do other actions upon successful registration
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Registration failed:', error.message);

      // Handle registration error
      if (error.response && error.response.status === 400) {
        // Show alert for invalid registration data
        Alert.alert('Error', 'Invalid registration data. Please check your input.');
      } else {
        // Show generic error alert for other errors
        Alert.alert('Error', 'An error occurred. Please try again later.');
      }
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/bg.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>Register User</Text>
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
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          onChangeText={(confirmpassword) => setconfirmpassword(confirmpassword)}
        />
      </View>
     <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
      </View>
     <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Address"
          placeholderTextColor="#003f5c"
          onChangeText={(address) => setAddress(address)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Company Name"
          placeholderTextColor="#003f5c"
          onChangeText={(companyName) => setCompanyName(companyName)}
        />
      </View>
      <TouchableOpacity onPress={handleRegister} style={styles.registerBtn}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  registerBtn: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#FF1493",
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Registration;
