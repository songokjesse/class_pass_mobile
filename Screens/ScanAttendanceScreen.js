import {SafeAreaView, StyleSheet} from "react-native";
import {CameraView, useCameraPermissions} from "expo-camera";
import {useState} from "react";

export  default function (){
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    return(
        <SafeAreaView style={styles.container}>
            <CameraView style={styles.camera} facing={facing}>


            </CameraView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
})