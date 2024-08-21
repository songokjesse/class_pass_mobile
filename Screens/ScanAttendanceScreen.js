import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext"; // Import the AuthContext
import {attendance} from "../services/QrCodeService";

export default function App({navigation}) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(true);
  // const [data, setData] = useState(null);
  const { user } = useContext(AuthContext); // Get the user object from the AuthContext

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.permission_container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity style={styles.btnStyles} onPress={requestPermission} title="grant permission" >
          <Text style={styles.txtStyles}>GRANT PERMISSION</Text>
        </TouchableOpacity>
      </View>
    );
  }
  async function onBarcodeScanned({ data }) {
    if (!scanned) return;
    try {
      setScanned(false);
      // setData(data);
      // Make a POST request to your API endpoint
      try {
          await attendance({
              timetable_id: data,
              user_id: user.id, // Include the user's ID in the request
          });
        Alert.alert("Attendance", "Attendance Submitted Successfully", [
          { text:"Ok", onPress: () => navigation.navigate("Home") }
        ]);
      } catch (error) {
        if (error.response?.status === 422) {
          const errorMessage = error.response.data.message;
          Alert.alert("Attendance Error", errorMessage, [
            { text: "Ok", onPress: () => navigation.navigate("Home") },
          ]);
          setScanned(false);
        } else {
          console.error('Network or other error:', error);
          setScanned(false);
        }
      }
    } catch (e) {
      setScanned(true);
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={onBarcodeScanned} // Ensure correct function reference
      />
      <View style={styles.border}>
        {/* You can customize the border styles here */}
      </View>
      {/*{scanned && <Text>Scanned data: {data}</Text>}*/}
    </View>
  );
}

const styles = StyleSheet.create({
  permission_container: {
    // display: 'flex',
    // justifyContent: 'center',
    height: 200,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    rowGap: 16,
    margin: 'auto',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  border: {
    position: "absolute",
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  btnStyles: {
    color: 'white',
    height: 40,
    alignItems: 'center',
    backgroundColor: '#067627',
    padding: 10,
  },
  txtStyles: {
    color: 'white',
  }
});
