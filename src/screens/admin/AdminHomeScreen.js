import { useState, useEffect } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

const AdminHomeScreen = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      rightIcons: [
        {
          icon: "logout",
          onPress: () =>
            Alert.alert("Warning", "Are you sure want logout?", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Yes",
                onPress: () =>
                  navigation.navigate("InitialScreen", { isLogout: true }),
              },
            ]),
        },
      ],
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <TouchableOpacity>
            <View style={styles.btnContainer}>
              <Ionicons
                name="person-add-outline"
                size={Dimensions.get("window").height * 0.04}
              />
              <Text variant="labelLarge">Verify Registration</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.btnContainer}>
              <Ionicons
                name="wallet-outline"
                size={Dimensions.get("window").height * 0.04}
              />
              <Text variant="labelLarge">Topup Credit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.btnContainer}>
              <Ionicons
                name="newspaper-outline"
                size={Dimensions.get("window").height * 0.04}
              />
              <Text variant="labelLarge">Manage Menu</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.btnContainer}>
              <Ionicons
                name="analytics-outline"
                size={Dimensions.get("window").height * 0.04}
              />
              <Text variant="labelLarge">Sales Report</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Dimensions.get("window").width * 0.1,
    backgroundColor: colors.bgColor,
  },
  btnContainer: {
    padding: Dimensions.get("window").width * 0.04,
    width: Dimensions.get("window").width * 0.385,
    minHeight: Dimensions.get("window").height * 0.13,
    backgroundColor: "white",
    borderRadius: 10,
    gap: 10,
  },
});

export default AdminHomeScreen;
