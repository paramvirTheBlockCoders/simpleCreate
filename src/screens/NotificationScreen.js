import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationScreen = () => {
  // Dummy notification data
  const notifications = [
    { id: 1, message: 'You have a new message!' },
    { id: 2, message: 'Your order has been shipped.' },
    { id: 3, message: 'Reminder: Event tomorrow at 10 AM.' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>
      {notifications.map(notification => (
        <View key={notification.id} style={styles.notification}>
          <Text>{notification.message}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notification: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default NotificationScreen;
