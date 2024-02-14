import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base64-js';

const DashboardScreen = ({ }) => {
  const [products, setProducts] = useState([]);
  const [Id, setId] = useState('');
  const navigation = useNavigation();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cart, setCart] = useState([]);


  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    };
    requestCameraPermission();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://44.200.180.0:7777/api/v1/auth/getitembyid', {
        id: Id,
      });
      const fetchedProducts = response.data.data;
      setProducts(fetchedProducts);
      setModalVisible(false);
    } catch (error) {
      console.error('Login failed:', error.message);
      if (error.response && error.response.status === 400) {
        Alert.alert('Error', 'Please check the entered ID');
      } else {
        Alert.alert('Error', 'An error occurred. Please try again later.');
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.post('http://44.200.180.0:7777/api/v1/auth/reactnativetest');
      setProducts(response.data.data.map(product => ({
        ...product,
        value: padBase64String(product.value),
      })));
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const padBase64String = (base64String) => {
    const missingPadding = base64String.length % 4;
    if (missingPadding === 0) {
      return base64String;
    }
    return base64String + '='.repeat(4 - missingPadding);
  };

  const handleAddToCart = async (productId) => {
    try {

      const existingCart = await AsyncStorage.getItem('cart');
      let updatedCart = existingCart ? JSON.parse(existingCart) : [];
  
      if (updatedCart.includes(productId)) {
        Alert.alert('Already in Cart', 'This product is already in your cart.');
      } else {
        updatedCart.push(productId);
  ~
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
  
        console.log('Added product with ID:', productId, 'to cart');
        console.log('Cart value after adding:', updatedCart); // Log cart value here
      }
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
    }
  };

  const handleHomeButtonClick = async () => {
    try {
      const response = await axios.post('http://44.200.180.0:7777/api/v1/auth/reactnativetest');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleCameraButtonClick = () => {
    setIsCameraVisible(prevState => !prevState);
  };
  const handleCheckout =async () => {
    const value =await  AsyncStorage.getItem('cart');
    console.log(value,"value of cart");
    if (!value || value.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Please add items before checkout.');
      return;
    }
    console.log(value,"data to send");
    navigation.navigate('Checkout', { value });
  };

  const handleSearchButtonClick = () => {
    setModalVisible(true);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error removing token:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {isCameraVisible && hasCameraPermission === 'granted' && (
          <Camera style={styles.camera} />
        )}

        {products.map((product, index) => (
          <View key={index} style={styles.productContainer}>
          <Image style={styles.productImage} source={{ uri: product.qrCode }} />
            <Text style={styles.productName}>{"TestItems"}</Text>
            <Text style={styles.productDescription}>{"Lorem Ipsum is simply dummy text of the printing  "}</Text>
            <Text style={styles.productPrice}>Price: ${"5"}</Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(product.id)}
            >
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={handleHomeButtonClick} style={styles.bottomBarButton}>
          <Image source={require('../../assets/images/home.png')} style={{ height: 28, width: 28,top:5 }} />
          <Text style={styles.bottomBarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearchButtonClick} style={styles.bottomBarButton}>
          <Image source={require('../../assets/images/search.png')} style={{ height: 40, width: 30,top:5 }} />
          <Text style={styles.bottomBarText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCameraButtonClick} style={styles.bottomBarButton}>
          <Image source={require('../../assets/images/camera.png')} style={{ height: 40, width: 30,top:4 }} />
          <Text style={styles.bottomBarText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
        <Image source={require('../../assets/images/cart.png')} style={{ height: 30, width: 40,left:8,top:5 }} />
        <Text style={styles.bottomBarText}>Checkout</Text>
      </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.bottomBarButton}>
          <Image source={require('../../assets/images/logout.png')} style={{ height: 30, width: 30,top:5 }} />
          <Text style={styles.bottomBarText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Enter ID"
        onChangeText={(text) => setId(text)}
        value={Id}
        keyboardType="numeric"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#F2F3F4',
    alignItems: 'center',
    paddingVertical: 40,
  },
  productContainer: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#f0dade',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 5,
  },
  addToCartButton: {
    backgroundColor: '#db7f8f',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFC0CB',
  },
  bottomBarButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  bottomBarText: {
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF', // Changed background color
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#FF1493', 
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%', 
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default DashboardScreen;
