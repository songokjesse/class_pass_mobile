import {Text, SafeAreaView, Button, StyleSheet, View, Image} from "react-native";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { logout } from "../services/AuthService";
import logo from '../assets/logo.png'; // Import image

export default function () {
  const { user, setUser } = useContext(AuthContext);
  async function handleLogout() {
    await logout();
    setUser(null);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.welcomeText}>Hi, {user.name}</Text>
        <Button
          title="Logout"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      </View>
      <View style={styles.mid_container}>
        <Image source={logo} style={styles.image} />
        {/*<Button title="Scan QR" onPress={() => console.log('Scan QR pressed')} />*/}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row", // Arrange elements horizontally
    justifyContent: "space-between", // Align items at opposite ends
    alignItems: "center", // Align items vertically on the same baseline
    padding: 16, // Add some padding for aesthetics
  },
  welcomeText: {
    fontSize: 18, // Adjust font size as needed
  },
  logoutButton: {
    // Adjust button styles (optional)
  },
  mid_container: {
    marginTop: 130,
    alignItems: 'center',
    justifyContent: 'center', // Distribute image and button evenly
  },
  image: {
    width: 300, // Adjust image width as needed
    height: 300, // Adjust image height as needed
    resizeMode: 'contain', // Adjust image scaling as needed
  },
});
