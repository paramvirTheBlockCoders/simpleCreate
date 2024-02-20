import { StatusBar, ImageBackground } from "react-native";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const ProductDetail = () => {
  const navigation = useNavigation(); // Get the navigation object using useNavigation hook
  const route = useRoute(); // Get the route object using useRoute hook
  const { productData } = route.params;



  const handleRegister = async () => {
    try {
      navigation.navigate('ArticleDetail', { productData: productData.data,alldata:productData,ArtNo:productData.data[0].ArtNo });
    } catch (error) {
      console.error('Navigation failed:', error.message);
    }
  };

  const handleRegister1 = async () => {
    try {

      let dd = productData.data1
  
      if(dd.length > 0){
        navigation.navigate('Exhibit', { productData: productData.data1,alldata:productData,ArtNo:productData.data[0].ArtNo })

      }else{
        Alert.alert('Not found', 'The Exhibit Data of This Product not Found');
      }
      
    } catch (error) {
      console.error('Navigation failed:', error.message);
    }
  };

  const handleRegister2 = async () => {
    try {
      let dd = productData.data2
      console.log(dd.length,":><<>");
      if(dd.length > 0){
        navigation.navigate('SittingDetail', { productData: productData.data2,alldata:productData,ArtNo:productData.data[0].ArtNo })

       }else{
        Alert.alert('Not found', 'The SittingDetail Data of This Product not Found');
      }
    } catch (error) {
      console.error('Navigation failed:', error.message);
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/bg/bg6.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/images/logo1.png')} />
        <StatusBar style="auto" />
        <TouchableOpacity onPress={handleRegister} style={styles.registerBtn}>
          <Text style={styles.loginText}>Article Detail</Text>
          <Text style={styles.arrow}> ></Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegister1} style={styles.registerBtn}>
          <Text style={styles.loginText}>Exhibit Location</Text>
          <Text style={styles.arrow}> ></Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegister2} style={styles.registerBtn}>
          <Text style={styles.loginText}>Sitting Samples</Text>
          <Text style={styles.arrow}> ></Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  loginText: {
    color: 'black',
    textAlign: 'left',
  },
  arrow: {
    color: 'black',
    textAlign: 'right',
  },
});

export default ProductDetail;
