import { StyleSheet, View, Dimensions } from "react-native";
import { Text, Button, Card, Divider } from "react-native-paper";
import colors from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AccountPendingScreen = ({ route, navigation }) => {
  const userDetail = route.params?.userDetail;
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Card>
          <Card.Content style={{ gap: 20 }}>
            <MaterialCommunityIcons
              name="shield-account-variant-outline"
              size={Dimensions.get("window").width * 0.2}
              style={{ alignSelf: "center" }}
            />
            <Text variant="titleMedium">
              Your account is pending activation.
            </Text>
            <Text variant="bodyMedium">
              You will be notified when the administrator activates it.
            </Text>
            <Divider />
            <View style={{ gap: 5 }}>
              <View>
                <Text>{userDetail.role} ID:</Text>
                <Text variant="labelLarge">{userDetail.userID}</Text>
              </View>
              <View>
                <Text>Email:</Text>
                <Text variant="labelLarge">{userDetail.email}</Text>
              </View>
              <View>
                <Text>Role:</Text>
                <Text variant="labelLarge">{userDetail.role}</Text>
              </View>
            </View>
            <Divider />
            <Button
              mode="contained"
              onPress={() =>
                navigation.navigate("InitialScreen", { isLogout: true })
              }
            >
              Logout
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Dimensions.get("window").width * 0.1,
    backgroundColor: colors.bgColor,
    justifyContent: "center",
  },
});

export default AccountPendingScreen;
