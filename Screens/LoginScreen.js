import { SafeAreaView, View, Button, Platform, StyleSheet } from "react-native";
import { useState, useContext} from 'react';
import FormTextField from "../components/FormTextField";
import {loadUser, login} from "../services/AuthService";
import AuthContext from "../context/AuthContext";

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
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <FormTextField
                    label="Email Address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    keyboardType="email-address"
                    errors={errors.email}
                />
                <FormTextField
                    label="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    errors={errors.password}
                />
                <Button title="Login" onPress={handleLogin} />
                <Button title="Create Account" onPress={() => {
                    navigation.navigate("Register")
                }} />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: { backgroundColor: "#fff", flex: 1},
    container: {padding: 20, rowGap:16}
})