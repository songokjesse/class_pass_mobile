import {Button, StyleSheet, View, Text} from "react-native";
import {CameraView, useCameraPermissions} from "expo-camera";
import {useState} from "react";

export  default function (){
    const [permission, requestPermission] = useCameraPermissions();
    const [scannedData, setScannedData] = useState(null);
    // const [scannedData, setScannedData] = useState<string | null>null; // Explicitly type scannedData as string or null

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
    async function onBarCodeScanned({ data }) {
        setScannedData(data);
        console.log(data);
    }
    return(
        <View style={styles.container}>
        <CameraView
                style={StyleSheet.absoluteFill}
                facing="back"
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarCodeScanned={onBarCodeScanned}
            />
            <View style={styles.border}>
                {/* You can customize the border styles here */}
            </View>

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
    scannedDataText: {
        position: 'absolute',
        bottom: 20,
        color: 'white',
    },
})

