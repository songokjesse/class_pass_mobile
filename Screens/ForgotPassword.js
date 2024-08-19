import {SafeAreaView, View, Text, StyleSheet, Image, Button} from "react-native";
import logo from "../assets/logo.png";
import FormTextField from "../components/FormTextField";
import {useState} from "react";
import {sendPasswordRestLink} from "../services/AuthService";


export default function (){
    const [email, setEmail] = useState()
    const [errors, setErrors] = useState({});
    const [resetStatus, setResetStatus] = useState('')
    async function handleForgotPassword(){
        setErrors({});
        setResetStatus("")
        try{
            const status = await sendPasswordRestLink(email)
            setResetStatus(status)
        }catch (error){
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                // Handle other errors (e.g., network issues)
                console.error('Network or other error:', error);
            }
        }
    }
    return(
        <SafeAreaView style={styles.wrapper}>
            <Image source={logo} style={styles.image} />
            {resetStatus && <Text style={styles.resetStatus}>resetStatus</Text>}
            <View style={styles.container}>
                <Text>Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. </Text>
                <FormTextField
                    label="Email Address"
                    placeholder="Enter your Email Address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    errors={errors.email}
                />
                <Button title="Email Password Reset Link" onPress={handleForgotPassword} />
            </View>
        </SafeAreaView>
    )
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
    image: {
        width: 125, // Adjust image width as needed
        height: 125, // Adjust image height as needed
        resizeMode: "contain", // Adjust image scaling as needed
        display: "block",
        marginTop: '10%',
        marginLeft: "auto",
        marginRight: "auto",
    },
    container: {
        marginTop: "auto",
        marginBottom: "auto",
        padding: 35,
        rowGap: 16,
    },
    resetStatus: {
        marginBottom: 10,
        color: "green"
    }
})