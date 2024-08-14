
import {Button, StyleSheet, View, Text} from "react-native";
import {CameraView, useCameraPermissions} from "expo-camera";
import {useEffect, useState} from "react";

export default function App(){

    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState(null);

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
    const onBarcodeScanned = ({ data }) => {
        setScanned(true);
        setData(data);
    };

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

