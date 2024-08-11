import { SafeAreaView, View, Button, Platform, StyleSheet } from "react-native";
import axios from '../utils/axios';
import { useState } from 'react';
import FormTextField from "../components/FormTextField";

export default function () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const handleLogin = async () => {
        setErrors({});
        try {
            const response = await axios.post('/login', {
                email,
                password,
                device_name: `${Platform.OS} ${Platform.Version}`,
            });
            console.log('Login successful:', response.data);
            try {
                const user = await axios.get('/user', {
                    headers: {
                        Authorization: `Bearer ${response.data.token}`,
                    },
                });
                console.log('User data:', user.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }

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

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: { backgroundColor: "#fff", flex: 1},
    container: {padding: 20, rowGap:16}
})