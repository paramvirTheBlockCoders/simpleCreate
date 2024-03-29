import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import NotificationScreen from '../screens/NotificationScreen';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
// import DashboardScreen from '../screens/Dashboard';
import Navbar from '../screens/Navbar';
import CheckoutScreen from '../screens/Checkout';
import CusEmp from '../screens/CusEmp'
import RegorLog from '../screens/RegorLog';
import Login1 from '../screens/Login1';
import ScanorMan from '../screens/ScanorMan';
import EnterManually from '../screens/EnterManually';
import ProductDetail from '../screens/ProductDetail';
import ArticleDetail from '../screens/ArticleDetail';
import Commant from '../screens/Commant';
import Register from '../screens/Register';
import ScanorManorGo from '../screens/ScanorManorGo';
import Exhibit from '../screens/Exhibit';
import SittingDetail from '../screens/SittinSample';
import CheckoutScreen1 from '../screens/Checkout1';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='CusEmp' screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        {/* <Stack.Screen name="Dashboard" component={DashboardScreen} /> */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeDetail" options={{presentation: 'fullScreenModal'}} component={RecipeDetailScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Login1" component={Login1} />
        <Stack.Screen name="CusEmp" component={CusEmp} />
        <Stack.Screen name="ScanorMan" component={ScanorMan} />
        <Stack.Screen name="ScanorManorGo" component={ScanorManorGo} />
        <Stack.Screen name="RegorLog" component={RegorLog} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="EnterManually" component={EnterManually} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
        <Stack.Screen name="Exhibit" component={Exhibit} />
        <Stack.Screen name="SittingDetail" component={SittingDetail} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Commant" component={Commant} />
        <Stack.Screen name="CheckoutScreen1" component={CheckoutScreen1} />
        <Stack.Screen name="Registration" component={Registration} />
       
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Nav" component={Navbar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
