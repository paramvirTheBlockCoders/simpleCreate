import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import NotificationScreen from '../screens/NotificationScreen';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import DashboardScreen from '../screens/Dashboard';
import Navbar from '../screens/Navbar';
import CheckoutScreen from '../screens/Checkout';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeDetail" options={{presentation: 'fullScreenModal'}} component={RecipeDetailScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
       
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Nav" component={Navbar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
