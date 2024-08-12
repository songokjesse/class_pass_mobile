import { SafeAreaView, View, Button, Platform, StyleSheet } from "react-native";
import { useState, useContext} from 'react';
import FormTextField from "../components/FormTextField";
import {loadUser} from "../services/AuthService";
import AuthContext from "../context/AuthContext";

export default function () {
    const {setUser} = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});
    const handleRegister = async () => {
        setErrors({});
        try {
             await register({
                 name,
                email,
                password,
                 password_confirmation,
                device_name: `${Platform.OS} ${Platform.Version}`
            })

            const user = await loadUser();
             setUser(user);
            console.log(user);
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
                    label="Full Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    keyboardType="full-name"
                    errors={errors.name}
                />
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
                <FormTextField
                    label="Password Confirmation"
                    value={password_confirmation}
                    onChangeText={text => setPasswordConfirmation(text)}
                    secureTextEntry={true}
                    errors={errors.password_confirmation}
                />
                <Button title="Login" onPress={handleRegister} />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: { backgroundColor: "#fff", flex: 1},
    container: {padding: 20, rowGap:16}
})