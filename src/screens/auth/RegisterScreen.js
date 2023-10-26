import { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { Text, Button, TextInput, RadioButton } from "react-native-paper";
import { userRegister } from "../../database/firebase";
import colors from "../../constants/colors";

const RegisterScreen = ({ navigation }) => {
  const [role, setRole] = useState("Student");
  const [userID, setUserID] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const onRegister = async () => {
    if (
      userID.trim().length == 0 ||
      email.trim().length == 0 ||
      phone.trim().length == 0 ||
      password.trim().length == 0 ||
      cPassword.trim().length == 0
    ) {
      return Alert.alert("Warning", "Please enter complete information !!");
    }
    if (password.trim().length < 6)
      return Alert.alert(
        "Warning",
        "Password should be at least 6 characters !!"
      );
    if (password != cPassword) {
      return Alert.alert(
        "Warning",
        "Password and confirm password not same !!"
      );
    }
    if (!(await userRegister(userID, email, phone, password, role)))
      return Alert.alert(
        "Warning",
        "Email exist !!\nPlease login or use another email !!"
      );
    Alert.alert(
      "Success",
      "Register account successful !!\nPlease login to the account"
    );
    navigation.replace("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text variant="headlineSmall">Food Ordering System (FOS)</Text>
        <Text variant="titleMedium">Registration</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Button
          mode={role == "Student" ? "contained" : "elevated"}
          onPress={() => setRole("Student")}
        >
          Student
        </Button>
        <Button
          mode={role == "Staff" ? "contained" : "elevated"}
          onPress={() => setRole("Staff")}
        >
          Staff
        </Button>
      </View>

      <TextInput
        style={styles.textInput}
        label={`${role} ID`}
        value={userID}
        onChangeText={(value) => setUserID(value)}
      />
      <TextInput
        style={styles.textInput}
        label="Email"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        style={styles.textInput}
        label="Phone Number"
        value={phone}
        onChangeText={(value) => setPhone(value)}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.textInput}
        label="Password"
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.textInput}
        label="Confirm Password"
        value={cPassword}
        onChangeText={(value) => setCPassword(value)}
      />
      <Button
        mode="contained"
        onPress={() => onRegister()}
        style={{
          borderRadius: Dimensions.get("window").width * 0.01,
          marginVertical: Dimensions.get("window").height * 0.01,
        }}
      >
        Sign Up
      </Button>
      <Text
        style={{
          marginTop: Dimensions.get("window").height * 0.02,
          textAlign: "center",
        }}
      >
        Have an account?{" "}
        <Text
          style={{
            color: "blue",
            fontSize: Dimensions.get("window").width * 0.05,
          }}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          Sign In
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: Dimensions.get("window").width * 0.1,
    backgroundColor: colors.bgColor,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Dimensions.get("window").height * 0.05,
  },
  logo: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
  },
  textTitle: {
    textAlign: "center",
    marginVertical: Dimensions.get("window").height * 0.01,
  },
  textInput: {
    marginVertical: Dimensions.get("window").height * 0.01,
    height: Dimensions.get("window").height * 0.07,
    backgroundColor: colors.textInput,
  },
});

export default RegisterScreen;
