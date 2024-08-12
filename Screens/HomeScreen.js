// Suggested code may be subject to a license. Learn more: ~LicenseLog:4228583259.
import {Text, SafeAreaView, Button} from 'react-native';
import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import {logout} from "../services/AuthService";
export default function () {
    const { user, setUser} = useContext(AuthContext)
    async function handleLogout() {
        await logout()
        setUser(null)
    }
  return (
    <SafeAreaView>
      <Text>Welcome Home, {user.name}</Text>
        <Button title="logout" onPress={handleLogout}/>
    </SafeAreaView>
  );
};

