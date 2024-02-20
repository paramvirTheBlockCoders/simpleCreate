import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CheckoutScreen1 = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  const fetchProducts = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      
      const response = await axios.post('http://204.236.246.166:7777/api/v1/auth/getdata', {
         email
      });
  
      const { data } = response.data;
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const increaseQuantity = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity++;
    setProducts(updatedProducts);
  };

  const decreaseQuantity = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 0) {
      updatedProducts[index].quantity--;
    }
    setProducts(updatedProducts);
  };

  const getTotalPrice = () => {
    return products.reduce((total, product) => {
      return total + parseFloat(product.U_Price_Dollars.slice(1)) * product.quantity;
    }, 0).toFixed(2);
  };

  const sendCheckoutData = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const checkoutData = products.map(product => ({
        email:email,
        ArtNo: product.artno,
        Quantity: product.quantity,
        TotalPrice: (parseFloat(product.U_Price_Dollars.slice(1)) * product.quantity).toFixed(2),
        
      }));

      console.log(checkoutData,"final data");
      const response = await axios.post('http://204.236.246.166:7777/api/v1/auth/updatedata', {
        data:checkoutData
     });
 
     const { data } = response.data;
     console.log(data,"?>?>?>?>?>");
     navigation.navigate('ScanorMan');
     if(data){

     }
    } catch (error) {
      console.error('Error sending checkout data:', error);
    }
  };

  const handleProceed = () => {
    // Send checkout data to the API
    sendCheckoutData();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ImageBackground source={require('../../assets/images/bg/bg6.png')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Checkout</Text>
        {products.map((product, index) => (
          <View key={index} style={styles.product}>
            <View style={styles.productDetails}>
              <Text style={styles.productText}>Art No: {product.artno}</Text>
              <Text style={styles.productText}>Compo: {product.compo}</Text>
              <Text style={styles.productText}>U_Price: {product.U_Price_Dollars}</Text>
              <Text style={styles.productText}>Total Price: ${(parseFloat(product.U_Price_Dollars.slice(1)) * product.quantity).toFixed(2)}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => decreaseQuantity(index)} style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{product.quantity}</Text>
              <TouchableOpacity onPress={() => increaseQuantity(index)} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <Text style={styles.total}>Total: ${getTotalPrice()}</Text>
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    width: '90%',
    minHeight: 100, // Increase the height of each product
  },
  productDetails: {
    flex: 1,
  },
  productText: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  proceedButton: {
    backgroundColor: '#fa454d',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  proceedButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default CheckoutScreen1;
