import { StyleSheet, View, Dimensions } from "react-native";
import { Text, Button } from "react-native-paper";
import colors from "../../constants/colors";

const UserHomeScreen = ({ route, navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>User Home Screen Page</Text>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate("InitialScreen", { isLogout: true })
          }
        >
          Logout
        </Button>
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
});

export default UserHomeScreen;
