import { SafeAreaView, Text, TextInput, View, Button, Platform } from "react-native";
import axios from 'axios';
import { useState } from 'react';

function FormTextField() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const handleLogin = async () => {
        setErrors({});
        try {
            const response = await axios.post('http://41.89.163.139/classpass/api/login', {
                email: email,
                password: password,
                device_name: `${Platform.OS} ${Platform.Version}`,
            }, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            try {
                const user = await axios.get("http//41.89.163.139/classpass/api/user", {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${response.data.token}`,
                    },
                });
                console.log('User:', user);
            } catch (error) {
                console.error('Error fetching user data:', error);
                alert('Error fetching user data. Please try again.')
            }
            console.log('Login successful:', response.data);

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
        <View>
            <Text style={{
                color: "#334155",
                fontWeight: 500
            }}>
                Email Address
            </Text>
            <TextInput
                style={{
                    backgroundColor: "#f1f5f9",
                    height: 40,
                    marginTop: 4,
                    borderWidth: 1.6,
                    borderRadius: 4,
                    borderColor: "#cbd5e1",
                    padding: 10
                }}
                value={email}
                onChangeText={setEmail}
                errors={errors.email}
            />
            <Text style={{
                color: "#334155",
                fontWeight: 500,
                marginTop: 10
            }}>
                Password
            </Text>
            <TextInput
                style={{
                    backgroundColor: "#f1f5f9",
                    height: 40,
                    marginTop: 4,
                    borderWidth: 1.6,
                    borderRadius: 4,
                    borderColor: "#cbd5e1",
                    padding: 10,
                    marginBottom: 9
                }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                errors={errors.password}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    )
}
export default function () {
    return (
        <SafeAreaView>
            <View style={{ padding: 20 }}>
                <FormTextField />
            </View>
        </SafeAreaView>
    )
}
