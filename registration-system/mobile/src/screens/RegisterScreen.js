import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { register } from '../api';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleRegister = async () => {
    try {
      console.log('Registering with:', API_URL);  // Debug log
      setLoading(true);
      setError('');
      
      const response = await register(formData);
      
      // Show welcome message
      setWelcomeMessage(response.welcomeMessage);
      setSnackbarVisible(true);

      // Navigate to login after 2 seconds
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <TextInput
        label="Username"
        value={formData.username}
        onChangeText={(text) => setFormData({ ...formData, username: text })}
        style={styles.input}
        disabled={loading}
      />
      
      <TextInput
        label="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
        style={styles.input}
        disabled={loading}
      />
      
      <TextInput
        label="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
        style={styles.input}
        disabled={loading}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <Button 
        mode="contained" 
        onPress={handleRegister} 
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        Register
      </Button>

      <Button 
        mode="text" 
        onPress={() => navigation.navigate('Login')}
        style={styles.linkButton}
      >
        Already have an account? Login
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        {welcomeMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  linkButton: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
}); 