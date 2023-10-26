import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../constants/colors";
import { getUserDetail } from "../database/firebase";

const InitialScreen = ({ route, navigation }) => {
  const [status, setStatus] = useState("");
  const { isLogout = false } = route.params ?? {};
  useEffect(() => {
    (async () => {
      // Init Notification
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });

      // Check user login status
      let userInfo = await AsyncStorage.getItem("userDetail");
      if (isLogout) await AsyncStorage.removeItem("userDetail");

      if (userInfo == null || isLogout) {
        setStatus("Go Login Page");
        // navigation.replace("AuthorizeStack");
      } else {
        let userData = JSON.parse(userInfo);
        let userDetail = getUserDetail(userData.id);
        if (userDetail.status != "Active") {
          setStatus("Account Pending");
          // navigation.replace("AccountPendingScreen");
        }
        if (userDetail.role == "Admin") {
          setStatus("Welcome Admin");
          // navigation.replace("AdminStack");
        } else if (userDetail.role == "Student" || userDetail.role == "Staff") {
          setStatus("Welcome User (Student/Staff)");
          // navigation.replace("UserStack");
        } else {
          setStatus("Go Login Page");
          // navigation.replace("AuthorizeStack");
        }
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Status: {status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: colors.bgColor,
  },
});

export default InitialScreen;
