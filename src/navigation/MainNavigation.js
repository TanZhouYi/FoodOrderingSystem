import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

import HeaderBar from "../screens/HeaderBar";

// Initial
import InitialScreen from "../screens/InitialScreen";

// Authorize
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ResetPassScreen from "../screens/auth/ResetPassScreen";

// Admin Pages
import AdminHomeScreen from "../screens/admin/AdminHomeScreen";
import VerifyScreen from "../screens/admin/VerifyScreen";
import TopupScreen from "../screens/admin/TopupScreen";

// User Pages
import AccountPendingScreen from "../screens/user/AccountPendingScreen";
import UserHomeScreen from "../screens/user/UserHomeScreen";

// Template Page
import Template from "../screens/Template";

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

  function AdminMainStack() {
    return (
      <Stack.Navigator
        initialRouteName="AdminHomeScreen"
        headerMode="screen"
        screenOptions={{
          header: ({ options, route, back, navigation }) => (
            <HeaderBar
              options={options}
              route={route}
              back={back}
              navigation={navigation}
            />
          ),
        }}
      >
        <Stack.Screen
          name="AdminHomeScreen"
          component={AdminHomeScreen}
          options={{ headerTitle: "Home" }}
        />
        <Stack.Screen
          name="VerifyScreen"
          component={VerifyScreen}
          options={{ headerTitle: "Verify Registration" }}
        />
        <Stack.Screen
          name="TopupScreen"
          component={TopupScreen}
          options={{ headerTitle: "Topup Credit" }}
        />
      </Stack.Navigator>
    );
  }

  function AdminStack() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Order") {
              iconName = focused ? "time" : "time-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          unmountOnBlur: true,
          tabBarActiveTintColor: colors.navigationBottom,
        })}
      >
        <Tab.Screen name="Home" component={AdminMainStack} />
        <Tab.Screen name="Order" component={Template} />
      </Tab.Navigator>
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
