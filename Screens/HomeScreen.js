import {Text, SafeAreaView, Button, StyleSheet, View, Image, TouchableOpacity} from "react-native";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { logout } from "../services/AuthService";
import logo from '../assets/logo.png';

export default function ({navigation}) {
  const { user, setUser } = useContext(AuthContext);
  async function handleLogout() {
    await logout();
    setUser(null);
  }

  function handleImagePress() {
    navigation.navigate("RegisterAttendance")
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
      <View>
        <Text style={styles.text}>Click on Icon to Register Attendance </Text>
      </View>
      <View style={styles.mid_container}>
        <TouchableOpacity onPress={handleImagePress}>
        <Image source={logo} style={styles.image} />
        </TouchableOpacity>
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
    marginTop: 90,
    alignItems: 'center',
    justifyContent: 'center', // Distribute image and button evenly
  },
  image: {
    width: 250, // Adjust image width as needed
    height: 250, // Adjust image height as needed
    resizeMode: 'contain', // Adjust image scaling as needed
  },
  text: {
    fontSize: 18, // Adjust font size as needed
    textAlign: 'center',
    marginTop: 30
  },
});
