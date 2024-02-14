import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const DashboardScreen = () => {
  const [products, setProducts] = useState([]);
  const [Id, setId] = useState('');
  const navigation = useNavigation();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  useEffect(() => {
    fetchData();
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

 const handleLogin = async () => {
  try {
    console.log(Id, "ID");
    const response = await axios.post('http://44.200.180.0:7777/api/v1/auth/getitembyid', {
      id: Id,
    });

    const fetchedProducts = response.data.data;
   
    setProducts(fetchedProducts);
    setModalVisible(false); // Close the modal after fetching data
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
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
const handleHomeButtonClick= async () => {
  try {
    console.log("hit home");
    const response = await axios.post('http://44.200.180.0:7777/api/v1/auth/reactnativetest');
    setProducts(response.data.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};
  const handleCameraButtonClick = () => {
    console.log("camra hit");
    setIsCameraVisible(prevState => !prevState); // Toggle the previous state
  };

  const handleSearchButtonClick = () => {
    setModalVisible(true);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Remove the token from AsyncStorage
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error removing token:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {isCameraVisible && hasCameraPermission && (
          <Camera style={styles.camera} />
        )}

        {products.map((product, index) => (
          <View key={index} style={styles.productContainer}>
            <Image style={styles.qrCode} source={{ uri: product.qrCode }} />
            <Text style={styles.productValue}>{product.value}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
      <TouchableOpacity onPress={handleHomeButtonClick} style={styles.bottomBarButton}>
          <Image source={require('../../assets/images/home.png')} style={{ height: 30, width: 28 }} />
          <Text style={styles.bottomBarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearchButtonClick} style={styles.bottomBarButton}>
          <Image source={require('../../assets/images/search.png')} style={{ height: 40, width: 30 }} />
          <Text style={styles.bottomBarText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCameraButtonClick} style={styles.bottomBarButton}>
          <Image source={require('../../assets/images/camera.png')} style={{ height: 40, width: 30 }} />
          <Text style={styles.bottomBarText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.bottomBarButton}>
          <Image source={require('../../assets/images/logout.png')} style={{ height: 30, width: 30 }} />
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
              onChangeText={text => setId(text)}
              value={Id}
              keyboardType="numeric"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 19,
  },
  button: {
    width: '50%',
    height: 50,
    backgroundColor: '#db7f8f',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  productContainer: {
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
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
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  iconImage: {
    width: hp(3),
    height: hp(4),
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
    backgroundColor: 'transparent', // Set background color to transparent
  },
  bottomBarText: {
    color: 'black',
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#e3c3c9',
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
});

export default DashboardScreen;
