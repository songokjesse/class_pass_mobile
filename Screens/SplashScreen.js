// Suggested code may be subject to a license. Learn more: ~LicenseLog:4228583259.
<<<<<<< HEAD
import {Text, SafeAreaView, View} from 'react-native';
export default function () {
  return (
    <SafeAreaView>
        <View>
            <Text>Loading</Text>
        </View>
=======
import {Image, Text, StyleSheet, SafeAreaView} from 'react-native';
// import * as SplashScreen from 'expo-splash-screen';

export default function () {
  return (
    <SafeAreaView>
      <Text style={styles.loading}>Loading...</Text>
            <Image
        source={require('../assets/splash.png')} // Replace with your image path
        style={styles.image}
      />
>>>>>>> 0014db3 (adding and styling splashscreen)
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    margin: 20,
    width: '90%', // Adjust the width as needed
    height: '95%', // Adjust the height as needed
    resizeMode: 'contain', // Resize the image to be fully visible
    borderStyle: 'solid',
    borderWidth: 2,

  },
  loading: {
    position: 'absolute',
    color: 'white',
    zIndex: 1000,
    left: 175,
    top: 235,
    // marginTop: 100,
  }
});

