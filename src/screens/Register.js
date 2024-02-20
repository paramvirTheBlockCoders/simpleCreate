import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground,Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Registration = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");

  const handleRegister = async () => {
    try {
      // Perform validation checks here

      // Example validation: Check if any field is empty
      if (!name.trim() || !email.trim() || !mobileNumber.trim() || !createPassword.trim() || !confirmPassword.trim() || !address.trim()) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      // Example validation: Check if passwords match
      if (createPassword !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      // Proceed with registration
      const response = await axios.post('http://44.200.180.0:7777/api/v1/auth/registeruser', {
        name: name,
        email: email,
        mobileNumber: mobileNumber,
        password: createPassword,
        companyName: companyName,
        address: address
      });

      // Handle response accordingly
      console.log("Registration successful");
      const { data } = response.data;
      const resData = data;
      console.log(resData,"Register api hitted");
      navigation.navigate('ScanorMan');
    } catch (error) {
      console.error('Registration failed:', error.message);
      Alert.alert('Error', 'Registration failed. Please try again later.');
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/bg/bg3.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>Registration yourself to appname</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Mobile Number"
          placeholderTextColor="#003f5c"
          onChangeText={(mobileNumber) => setMobileNumber(mobileNumber)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Create Password"
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setCreatePassword(password)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setConfirmPassword(password)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Company Name"
          placeholderTextColor="#003f5c"
          onChangeText={(company) => setCompanyName(company)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Address"
          placeholderTextColor="#003f5c"
          onChangeText={(address) => setAddress(address)}
          multiline={true}
          numberOfLines={4}
        />
        <TouchableOpacity onPress={handleRegister} style={styles.registerBtn}>
          <Text style={styles.registerText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  TextInput: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
    fontSize: 16,
    paddingHorizontal: 10,
    width: '80%',
  },
  registerBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: '#fa454d',
  },
  registerText: {
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default Registration;
