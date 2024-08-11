import { SafeAreaView, Text, TextInput, View, Button, Platform, useNavigation } from "react-native";

import axios from 'axios';
import { useState } from 'react';

function FormTextField() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const handleLogin = () => {
        setErrors({});
        axios.post('http://41.89.163.139/classpass/api/login', {
            email: email,
            password: password,
            device_name: `${Platform.OS} ${Platform.Version}`,
        }, {
            headers: {
                'Accept': 'application/json', // Example header
            }
        })
            .then(response => {
                // Handle successful login, e.g., navigate to home screen
                console.log('Login successful:', response.data);
                // import { SafeAreaView, Text, TextInput, View, Button, Platform, useNavigation } from "react-native";

                useNavigation.navigate('Home');

                console.log('Login successful:', response.data);
            })
            .catch(error => {
                // Handle login error, e.g., display an error message
                console.log(error)
                // console.error('Login failed:', error.response.data);
                // if (error.response?.status === 422) {
                //     setErrors(error.response.data.errors);
                // }
            });
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
