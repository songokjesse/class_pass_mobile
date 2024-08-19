import { SafeAreaView, ScrollView, View, Image, Button, Platform, StyleSheet } from "react-native";
import { useState, useContext} from 'react';
import FormTextField from "../components/FormTextField";
import {loadUser, login} from "../services/AuthService";
import AuthContext from "../context/AuthContext";
import logo from '../assets/logo.png'; // Import image

export default function ({navigation}) {
    const {setUser} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const handleLogin = async () => {
        setErrors({});
        try {
             await login({
                email,
                password,
                device_name: `${Platform.OS} ${Platform.Version}`
            })
            const user = await loadUser();
             setUser(user);
            // console.log(user);
        } catch (error) {
            console.error('Login failed:', error.response?.data);
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                // Handle other errors (e.g., network issues)
                console.error('Network or other error:', error);
            }
        }
    }
    return (
        <ScrollView>
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
            <Image source={logo} style={styles.image} />
                <FormTextField
                    label="Email Address"
                    placeholder="Enter your Email Address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    keyboardType="email-address"
                    errors={errors.email}
                />
                <FormTextField
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    errors={errors.password}
                />
                <Button title="Login" onPress={handleLogin} />
                <Button title="Create Account" onPress={() => {
                    navigation.navigate("Register")
                }} />
                <Button title="Forgot Password !" onPress={() => {
                    navigation.navigate("ForgotPassword")
                }} />

            </View>
        </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: { 
        marginTop: '15%',
        marginBottom: '5%',
        marginLeft: '5%',
        marginRight: '5%',
        backgroundColor: "white", 
        flex: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 20,
        padding: 50,
        // height: 'auto',
    },
    container: {
        marginTop: 'auto',
        marginBottom: 'auto',
        padding: 15, 
        rowGap:16, 
    },
    image: {
        width: 150, // Adjust image width as needed
        height: 150, // Adjust image height as needed
        resizeMode: 'contain', // Adjust image scaling as needed
        display: 'block',
        marginBottom: '5%',
        marginTop: '2%',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
})