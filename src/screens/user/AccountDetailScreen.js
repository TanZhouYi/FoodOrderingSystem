import { StyleSheet, View, Dimensions } from "react-native";
import { Text, Button, Card, Divider } from "react-native-paper";
import colors from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getUserDetail } from "../../database/firebase";

const AccountDetailScreen = ({ route, navigation }) => {
  const userDetail = getUserDetail();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Card>
          <Card.Content style={{ gap: 20 }}>
            <View style={{ gap: 10 }}>
              <View>
                <Text>{userDetail.role} ID:</Text>
                <Text variant="labelLarge">{userDetail.userID}</Text>
              </View>
              <View>
                <Text>Email:</Text>
                <Text variant="labelLarge">{userDetail.email}</Text>
              </View>
              <View>
                <Text>Phone:</Text>
                <Text variant="labelLarge">{userDetail.phone}</Text>
              </View>
              <View>
                <Text>Role:</Text>
                <Text variant="labelLarge">{userDetail.role}</Text>
              </View>
            </View>
            <Divider />
            <View>
              <Text>Credit:</Text>
              <Text variant="labelLarge">{`RM ${parseFloat(
                userDetail.credit
              ).toFixed(2)}`}</Text>
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

export default AccountDetailScreen;
