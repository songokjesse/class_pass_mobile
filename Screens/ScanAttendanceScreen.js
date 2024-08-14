
import {Button, StyleSheet, View, Text, Vibration, Alert} from "react-native";
import {CameraView, useCameraPermissions} from "expo-camera";
import {useContext, useState} from "react";
import AuthContext  from "../context/AuthContext"; // Import the AuthContext

export default function App(){

    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(true);
    const [data, setData] = useState(null);
    const { user } = useContext(AuthContext); // Get the user object from the AuthContext

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.permission_container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
    async function onBarcodeScanned({ data }) {
        if(!scanned) return;
        try {
            setScanned(false);
            setData(data);
            console.log(data)
            Alert.alert("Attendance", 'Attendance Captured Successfully')
            // // Make a POST request to your API endpoint
            // try {
            //     const response = await axios.post('https://your-api-endpoint.com/qr-code-data', {
            //         qrCodeData: data,
            //         userId: user.id, // Include the user's ID in the request
            //     });
            //     console.log(response.data);
            // } catch (error) {
            //     console.error(error);
            // }
        } catch (e) {
            setScanned(true);
            console.log(e)
        }
    }

    return(
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
            {scanned && (
                <Text>
                    Scanned data: {data}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    permission_container:{
        padding: 20,
        rowGap:16
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    border: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

