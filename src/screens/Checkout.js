import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Refresh from 'react-native-pull-to-refresh';

const CheckoutScreen = ({ cart }) => {
  const [products, setProducts] = useState([]);
  const [checkoutData, setCheckoutData] = useState(null);
  const [cartValue, setCartValue] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartValue = async () => {
      const value = await AsyncStorage.getItem('cart');
      setCartValue(value);
    };

    fetchCartValue();
  }, []);

  useEffect(() => {
    if (cartValue) {
      const fetchCartProducts = async () => {
        try {
          const response = await axios.post('http://44.200.180.0:7777/api/v1/auth/reactnativetest');
          const allProducts = response.data.data;
          const productsInCart = allProducts.filter(product => cartValue.includes(product.id));

          setCartProducts(productsInCart);
        } catch (error) {
          console.error('Error fetching cart products:', error.message);
          Alert.alert('Error', 'An error occurred while fetching cart products. Please try again later.');
        }
      };

      fetchCartProducts();
    } else {
      setCartProducts([]);
    }
  }, [cartValue]);

  const handleCheckout = async () => {
    try {
      console.log(cartValue,"ccdfdf");
      let data = JSON.stringify(cartValue);
      const response = await axios.post('http://44.200.180.0:7777/api/v1/auth/checkout', { data });
      console.log(response,"yes receive res");
      await AsyncStorage.removeItem('cart');

      // Reset the cartProducts state and fetch the cart value again
      setCartProducts([]);
      const fetchCartValue = async () => {
        const value = await AsyncStorage.getItem('cart');
        setCartValue(value);
      };
      fetchCartValue();

    } catch (error) {
      console.error('Error during checkout:', error.message);
      Alert.alert('Error', 'An error occurred during checkout. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Refresh onRefresh={handleCheckout} refreshing={false}>
        <ScrollView contentContainerStyle={styles.content}>
          {cartProducts.map((cartProducts, index) => (
            <View key={index} style={styles.productContainer}>
              <Image style={styles.productImage} source={{ uri: cartProducts.qrCode }} />
              <Text style={styles.productName}>{"TestItems"}</Text>
              <Text style={styles.productDescription}>{"Lorem Ipsum is simply dummy text of the printing  "}</Text>
              <Text style={styles.productPrice}>Price: ${"5"}</Text>
            </View>
          ))}
        </ScrollView>
      </Refresh>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>

      {checkoutData && (
        <View style={styles.checkoutDetails}>
          <Text style={styles.checkoutDetailsText}>Order Total: ${checkoutData.total}</Text>
          <Text style={styles.checkoutDetailsText}>Shipping Address: {checkoutData.address}</Text>
          {/* Add more checkout details here */}
        </View>
      )}
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
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  checkoutButton: {
    backgroundColor: '#db7f8f',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  checkoutDetails: {
    backgroundColor: '#e3c3c9',
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  checkoutDetailsText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CheckoutScreen;