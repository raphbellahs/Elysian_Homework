import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{ title: 'Registration' }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 