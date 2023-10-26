import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

// Initial
import InitialScreen from "../screens/InitialScreen";

export default MainNavigation = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="InitialScreen">
          <Stack.Screen
            name="InitialScreen"
            component={InitialScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
