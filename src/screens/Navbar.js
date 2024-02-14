// Navbar.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navbarText}>Navbar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Navbar;
