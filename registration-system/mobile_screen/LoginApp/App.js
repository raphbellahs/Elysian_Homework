import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { colors, icons, images } from './assets/index';

// Login Screen Component
export default function App() {
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.title}>Log in</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Image source={icons.mail} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={icons.lock} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        {/* Forgot Password Link */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        {/* Social Login Buttons */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <icons.google width={24} height={24} />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <icons.facebook width={24} height={24} />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Have no account yet?</Text>
          <TouchableOpacity>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.primary,
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  forgotPassword: {
    color: colors.primary,
    textAlign: 'right',
    fontSize: 14,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    color: colors.textSecondary,
    marginVertical: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 12,
    width: '48%',
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.textSecondary,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    color: colors.textSecondary,
    marginRight: 4,
  },
  registerLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});
