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
import ManageMenuScreen from "../screens/admin/ManageMenuScreen";
import MenuAddScreen from "../screens/admin/MenuAddScreen";
import MenuDetailScreen from "../screens/admin/MenuDetailScreen";
import StaffCreditScreen from "../screens/admin/StaffCreditScreen";
import AdminOrderScreen from "../screens/admin/AdminOrderScreen";
import SalesReportScreen from "../screens/admin/SalesReportScreen";

// User Pages
import AccountPendingScreen from "../screens/user/AccountPendingScreen";
import AccountDetailScreen from "../screens/user/AccountDetailScreen";
import UserHomeScreen from "../screens/user/UserHomeScreen";
import MenuOrderScreen from "../screens/user/MenuOrderScreen";
import CartScreen from "../screens/user/CartScreen";
import UserOrderScreen from "../screens/user/UserOrderScreen";

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
        <Stack.Screen
          name="ManageMenuScreen"
          component={ManageMenuScreen}
          options={{ headerTitle: "Manage Menu" }}
        />
        <Stack.Screen
          name="MenuAddScreen"
          component={MenuAddScreen}
          options={{ headerTitle: "Add Menu" }}
        />
        <Stack.Screen
          name="MenuDetailScreen"
          component={MenuDetailScreen}
          options={{ headerTitle: "Menu Detail" }}
        />
        <Stack.Screen
          name="StaffCreditScreen"
          component={StaffCreditScreen}
          options={{ headerTitle: "Staff Credit" }}
        />
        <Stack.Screen
          name="SalesReportScreen"
          component={SalesReportScreen}
          options={{ headerTitle: "Sales Report" }}
        />
      </Stack.Navigator>
    );
  }

  function AdminOrderStack() {
    return (
      <Stack.Navigator
        initialRouteName="AdminOrderScreen"
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
          name="AdminOrderScreen"
          component={AdminOrderScreen}
          options={{ headerTitle: "Order" }}
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
        <Tab.Screen name="Order" component={AdminOrderStack} />
      </Tab.Navigator>
    );
  }

  function UserMainStack() {
    return (
      <Stack.Navigator
        initialRouteName="UserHomeScreen"
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
          name="UserHomeScreen"
          component={UserHomeScreen}
          options={{ headerTitle: "Menu" }}
        />
        <Stack.Screen
          name="AccountDetailScreen"
          component={AccountDetailScreen}
          options={{ headerTitle: "Account Detail" }}
        />
        <Stack.Screen
          name="MenuOrderScreen"
          component={MenuOrderScreen}
          options={{ headerTitle: "Menu Detail" }}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{ headerTitle: "Cart" }}
        />
      </Stack.Navigator>
    );
  }

  function UserCartStack() {
    return (
      <Stack.Navigator
        initialRouteName="CartScreen"
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
          name="CartScreen"
          component={CartScreen}
          options={{ headerTitle: "Cart" }}
        />
      </Stack.Navigator>
    );
  }

  function UserOrderStack() {
    return (
      <Stack.Navigator
        initialRouteName="UserOrderScreen"
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
          name="UserOrderScreen"
          component={UserOrderScreen}
          options={{ headerTitle: "Order" }}
        />
      </Stack.Navigator>
    );
  }

  function UserStack() {
    return (
      <Tab.Navigator
        initialRouteName="Menu"
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Menu") {
              iconName = focused ? "newspaper" : "newspaper-outline";
            } else if (route.name === "Cart") {
              iconName = focused ? "cart" : "cart-outline";
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
        <Tab.Screen name="Menu" component={UserMainStack} />
        <Tab.Screen name="Cart" component={UserCartStack} />
        <Tab.Screen name="Order" component={UserOrderStack} />
      </Tab.Navigator>
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
