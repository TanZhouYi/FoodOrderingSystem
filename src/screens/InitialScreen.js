import { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../constants/colors";
import { checkDoneInit, getUserDetail } from "../database/firebase";

const InitialScreen = ({ route, navigation }) => {
  const { isLogout = false } = route.params ?? {};
  useEffect(() => {
    // Init Notification
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const unsubscribe = navigation.addListener("focus", async () => {
      // Check user login status
      let userInfo = await AsyncStorage.getItem("userDetail");
      if (isLogout) await AsyncStorage.removeItem("userDetail");

      if (userInfo == null || isLogout) {
        navigation.replace("AuthorizeStack");
      } else {
        await checkDoneInit();
        let userData = JSON.parse(userInfo);
        let userDetail = getUserDetail(userData.id);
        if (userDetail.status != "Active") {
          return navigation.replace("AccountPendingScreen");
        }
        if (userDetail.role == "Admin") {
          navigation.replace("AdminStack");
        } else if (userDetail.role == "Student" || userDetail.role == "Staff") {
          navigation.replace("UserStack");
        } else {
          return navigation.replace("AuthorizeStack");
        }
      }
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bgColor,
  },
});

export default InitialScreen;
