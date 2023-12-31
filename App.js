import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import MainNavigation from "./src/navigation/MainNavigation";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <MainNavigation />
    </View>
  );
}
