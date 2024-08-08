import {SafeAreaView, Text, TextInput, View} from "react-native";

function FormTextField(){
    return (
        <View>
            <Text style={{
                color: "#334155",
                fontWeight: 500
            }}>
                Email Address
            </Text>
            <TextInput style={{
                backgroundColor: "#f1f5f9",
                height: 40,
                marginTop: 4,
                borderWidth: 1.6,
                borderRadius: 4,
                borderColor: "#cbd5e1",
                padding: 10
            }}/>
        </View>
        )
}
export default function () {
    return(
        <SafeAreaView>
            <View style={{padding: 20}}>
                <FormTextField label="Email Address"/>
            </View>
        </SafeAreaView>
    )
}