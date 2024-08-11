
import {SafeAreaView, Text, TextInput, View, Button} from "react-native";

import axios from 'axios';
import { useState } from 'react';

function FormTextField(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const handleLogin = () => {
        axios.post('http://41.89.163.139/api/login',  {
            email: email,
            password: password
          }, {
            headers: {
              'Accept': 'application/json', // Example header
            }
          })
        .then(response => {
            // Handle successful login, e.g., navigate to home screen
            console.log('Login successful:', response.data);
        })
        .catch(error => {
            // Handle login error, e.g., display an error message
            console.error('Login failed:', error);
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
                    padding: 10
                }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    )
}
export default function () {
    return(
        <SafeAreaView>
            <View style={{padding: 20}}>
                <FormTextField />
            </View>
        </SafeAreaView>
    )
}
