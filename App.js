import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import LoginScreen from "./Screens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";
import AuthContext from "./context/AuthContext";
import {loadUser} from "./services/AuthService";
import {useState, useEffect} from "react";
import SplashScreen from "./Screens/SplashScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ScanAttendanceScreen from "./Screens/ScanAttendanceScreen";

const Stack = createNativeStackNavigator()
export default function App() {
    const[ user, setUser] = useState()
    const[ status, setStatus] = useState("Loading")
    useEffect(() =>{
        async function runEffect(){
            try {
                const user = await loadUser()
                setUser(user)
            } catch (e){
                console.log("Failed to load user", e)
            }
            setStatus("idle")
        }
        runEffect();
    }, [])
    if(status === "Loading"){
        return  <SplashScreen/>
    }
  return (
      <AuthContext.Provider value={{user, setUser}}>
            <NavigationContainer>
              <Stack.Navigator>
                  {user? (
                      <>
                          <Stack.Screen name='Home' component={HomeScreen}/>
                          <Stack.Screen name='RegisterAttendance' component={ScanAttendanceScreen}/>
                      </>
                  ) : (
                      <>
                          <Stack.Screen name='Login' component={LoginScreen}/>
                          <Stack.Screen name='Register' component={RegisterScreen}/>
                      </>
                  )}
              </Stack.Navigator>
            </NavigationContainer>
      </AuthContext.Provider>
  );
}

