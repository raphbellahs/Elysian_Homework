import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{ title: 'Registration' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 