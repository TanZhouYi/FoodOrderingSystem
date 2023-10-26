import { useState } from "react";
import { StyleSheet, View, Dimensions, Alert, Image } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { userResetPassword } from "../../database/firebase";
import colors from "../../constants/colors";

const ResetPassScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState("");

  const onReset = async () => {
    if (email.trim().length == 0) {
      return Alert.alert("Warning", "Please enter complete information");
    } else if (!email.includes("@")) {
      return Alert.alert("Warning", "Please enter valid email form");
    }
    if (!(await userResetPassword(email)))
      return Alert.alert(
        "Error",
        "User not found !!\nPlease enter registered email"
      );
    Alert.alert("Success", "Please check your email to reset the password");
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../../assets/locked.png")}
          style={styles.imageLogo}
        />
        <Text variant="labelLarge">
          Enter your email and we'll send you a link to reset the password
        </Text>
        <TextInput
          style={styles.textInput}
          label="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <Button
          mode="contained"
          onPress={() => onReset()}
          style={{
            borderRadius: Dimensions.get("window").width * 0.01,
            marginVertical: Dimensions.get("window").height * 0.01,
          }}
        >
          Reset Password
        </Button>
        <Text
          style={styles.textLogin}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          Back to Login
        </Text>
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
  imageLogo: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.2,
    resizeMode: "contain",
    alignSelf: "center",
  },
  textInput: {
    marginVertical: Dimensions.get("window").height * 0.02,
    backgroundColor: colors.textInput,
  },
  textLogin: {
    textAlign: "center",
    marginTop: Dimensions.get("window").height * 0.01,
  },
});
export default ResetPassScreen;
