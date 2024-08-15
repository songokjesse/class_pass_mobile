import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Button,
  Platform,
  StyleSheet,
} from "react-native";
import { useState, useContext } from "react";
import FormTextField from "../components/FormTextField";
import { loadUser, register } from "../services/AuthService";
import AuthContext from "../context/AuthContext";
import logo from "../assets/logo.png"; // Import image

export default function () {
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});
  const handleRegister = async () => {
    setErrors({});
    try {
      await register({
        name,
        email,
        admission_number: admissionNumber,
        password,
        password_confirmation: passwordConfirmation,
        device_name: `${Platform.OS} ${Platform.Version}`,
      });

      const user = await loadUser();
      setUser(user);
      console.log(user);
    } catch (error) {
      console.error("Registration failed:", error.response?.data);
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        // Handle other errors (e.g., network issues)
        console.error("Network or other error:", error);
      }
    }
  };
  return (
    <ScrollView>
    <SafeAreaView style={styles.wrapper}>
      <Image source={logo} style={styles.image} />
      <View style={styles.container}>
        <FormTextField
          label="Full Name"
          placeholder="Enter your FullName"
          value={name}
          onChangeText={(text) => setName(text)}
          errors={errors.name}
        />
        <FormTextField
          label="Email Address"
          placeholder="Enter your Email Address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          errors={errors.email}
        />
        <FormTextField
          label="Admission Number"
          placeholder="Enter your Admission Number"
          value={admissionNumber}
          onChangeText={(text) => setAdmissionNumber(text)}
          errors={errors.admission_number}
        />
        <FormTextField
          label="Password"
          placeholder="Enter your Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          errors={errors.password}
        />
        <FormTextField
          label="Password Confirmation"
          placeholder="Confirm your Password"
          value={passwordConfirmation}
          onChangeText={(text) => setPasswordConfirmation(text)}
          secureTextEntry={true}
          errors={errors.password_confirmation}
        />
        <Button title="Create Account" onPress={handleRegister} />
      </View>
    </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: '6%',
    marginBottom: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: "#fff",
    flex: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
  },
  container: {
    marginTop: "auto",
    marginBottom: "auto",
    padding: 35,
    rowGap: 16,
  },
  image: {
    width: 125, // Adjust image width as needed
    height: 125, // Adjust image height as needed
    resizeMode: "contain", // Adjust image scaling as needed
    display: "block",
    marginTop: '10%',
    marginLeft: "auto",
    marginRight: "auto",
  },
});
