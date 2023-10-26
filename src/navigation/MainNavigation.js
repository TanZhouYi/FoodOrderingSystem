import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

// Initial
import InitialScreen from "../screens/InitialScreen";

// Authorize
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ResetPassScreen from "../screens/auth/ResetPassScreen";

// Admin Pages
import AdminHomeScreen from "../screens/admin/AdminHomeScreen";

// User Pages
import AccountPendingScreen from "../screens/user/AccountPendingScreen";
import UserHomeScreen from "../screens/user/UserHomeScreen";

export default MainNavigation = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function AuthorizeStack() {
    return (
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassScreen"
          component={ResetPassScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  function AdminStack() {
    return (
      <Stack.Navigator initialRouteName="AdminHomeScreen">
        <Stack.Screen
          name="AdminHomeScreen"
          component={AdminHomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  function UserStack() {
    return (
      <Stack.Navigator initialRouteName="UserHomeScreen">
        <Stack.Screen
          name="UserHomeScreen"
          component={UserHomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="InitialScreen">
          <Stack.Screen
            name="InitialScreen"
            component={InitialScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AccountPendingScreen"
            component={AccountPendingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AuthorizeStack"
            component={AuthorizeStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminStack"
            component={AdminStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserStack"
            component={UserStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
