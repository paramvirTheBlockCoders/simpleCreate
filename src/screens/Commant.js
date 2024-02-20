import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';

const Comment = () => {
  const navigation = useNavigation(); // Get the navigation object using useNavigation hook
  const route = useRoute(); // Get the route object using useRoute hook
  const { ArtNo } = route.params;
  const [Message, setMessage] = useState("");

  // console.log(ArtNo, "comment ArtNo");

  const handleLogin = async () => {
    try {
      console.log(Message, "message here ");
      navigation.navigate('ScanorManorGo', { ArtNo: ArtNo, Message: Message });
    } catch (error) {
      console.error('Login failed:', error.message);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/bg.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.contentBox}>
          <Text style={styles.title}>Comment</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Type your message here..."
              placeholderTextColor="#888"
              multiline={true}
              onChangeText={(message) => setMessage(message)}
            />
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.nextButton}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  textAreaContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 20,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#fa454d',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Comment;
