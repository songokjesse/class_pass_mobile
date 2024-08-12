import { SafeAreaView, View, Button, Platform, StyleSheet } from "react-native";
import { useState, useContext} from 'react';
import FormTextField from "../components/FormTextField";
import {loadUser, register} from "../services/AuthService";
import AuthContext from "../context/AuthContext";

export default function () {
    const {setUser} = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});
    const handleRegister = async ({ navigation }) => {
        setErrors({});
        try {
             await register({
                 name,
                email,
                password,
                 password_confirmation: passwordConfirmation,
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
                    value={passwordConfirmation}
                    onChangeText={text => setPasswordConfirmation(text)}
                    secureTextEntry={true}
                    errors={errors.password_confirmation}
                />
                <Button title="Create Account" onPress={handleRegister} />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: { backgroundColor: "#fff", flex: 1},
    container: {padding: 20, rowGap:16}
})