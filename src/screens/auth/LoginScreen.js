import { useState } from "react";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import colors from "../../constants/colors";
import { userLogin } from "../../database/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = async () => {
    if (email.trim().length == 0 || password.trim().length == 0) {
      return Alert.alert("Warning", "Please enter complete information");
    }
    let userDetail = await userLogin(email, password);
    if (!userDetail) {
      return Alert.alert("Warning", "Email or Password incorrect !!");
    }
    await AsyncStorage.setItem(
      "userDetail",
      JSON.stringify({
        id: userDetail.id,
        username: userDetail.username,
        email: userDetail.email,
        role: userDetail.role,
      })
    );
    Alert.alert("Success", "Login successful !!");
    navigation.reset({
      index: 0,
      routes: [{ name: "InitialScreen" }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text variant="headlineSmall">Food Ordering System (FOS)</Text>
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          label="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={styles.textInput}
          label="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <Button
          mode="contained"
          onPress={() => onLogin()}
          style={{
            borderRadius: Dimensions.get("window").width * 0.01,
            marginVertical: Dimensions.get("window").height * 0.01,
          }}
        >
          Login
        </Button>
        <Text
          style={styles.textForgot}
          onPress={() => navigation.navigate("ResetPassScreen")}
        >
          Forgot Password?
        </Text>
      </View>
      <View>
        <Text
          style={{
            marginTop: Dimensions.get("window").height * 0.02,
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <Text
            style={{
              color: "blue",
              fontSize: Dimensions.get("window").width * 0.05,
            }}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Dimensions.get("window").width * 0.1,
    justifyContent: "space-between",
    backgroundColor: colors.bgColor,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.1,
  },
  logo: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5,
  },
  textInput: {
    marginVertical: Dimensions.get("window").height * 0.01,
    backgroundColor: colors.textInput,
  },
  textForgot: {
    textAlign: "center",
    marginTop: Dimensions.get("window").height * 0.01,
  },
});

export default LoginScreen;
