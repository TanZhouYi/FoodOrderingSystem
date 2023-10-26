import { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Dimensions } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import colors from "../../constants/colors";
import { userList, userUpdateStatus } from "../../database/firebase";

const VerifyScreen = ({ route, navigation }) => {
  const [pendingList, setPendingList] = useState(
    userList.filter((item) => item.status == "Pending")
  );

  useEffect(() => {
    getPendingList();
    navigation.setOptions({
      rightIcons: [
        {
          icon: "select-all",
          onPress: () =>
            Alert.alert("Warning", "Are you sure want to accept all?", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Yes",
                onPress: onUpdate,
              },
            ]),
        },
      ],
    });
  }, []);

  // Getting Pending Users
  const getPendingList = () => {
    setPendingList(userList.filter((item) => item.status == "Pending"));
  };

  // Update user's status
  const onUpdate = (userID = false) => {
    if (userID) {
      userUpdateStatus(userID, "Active");
    } else {
      pendingList.map((item) => userUpdateStatus(item.id, "Active"));
    }
    getPendingList();
  };

  // Render Pending List
  const RenderList = () => {
    if (pendingList.length == 0)
      return (
        <Card>
          <Card.Content>
            <Text style={{ alignSelf: "center" }}>No Request Found</Text>
          </Card.Content>
        </Card>
      );
    return pendingList.map((item, index) => (
      <Card key={index}>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text>{item.role} ID:</Text>
              <Text variant="labelLarge">{item.userID}</Text>
            </View>
            <View>
              <Text>Role:</Text>
              <Text variant="labelLarge">{item.role}</Text>
            </View>
          </View>
          <Text></Text>
          <Button mode="contained" onPress={() => onUpdate(item.id)}>
            Accept
          </Button>
        </Card.Content>
      </Card>
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <RenderList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Dimensions.get("window").width * 0.1,
    backgroundColor: colors.bgColor,
    gap: 15,
  },
});

export default VerifyScreen;
