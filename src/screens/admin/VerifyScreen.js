import { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { Button, Card, Text, Searchbar } from "react-native-paper";
import colors from "../../constants/colors";
import { userList, userUpdateStatus } from "../../database/firebase";

const VerifyScreen = ({ route, navigation }) => {
  const [pendingList, setPendingList] = useState(
    userList.filter((item) => item.status == "Pending")
  );
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
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
  const getPendingList = (userID = false) => {
    if (userID && userID != "") {
      setSearchText(userID);
      setPendingList(
        userList.filter(
          (item) =>
            item.status == "Pending" &&
            item.userID.toLowerCase().includes(userID.toLowerCase())
        )
      );
    } else {
      setSearchText("");
      setPendingList(userList.filter((item) => item.status == "Pending"));
    }
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
        <Card style={styles.cardContainer}>
          <Card.Content>
            <Text style={{ alignSelf: "center" }}>No Record Found</Text>
          </Card.Content>
        </Card>
      );
    return pendingList.map((item, index) => (
      <Card key={index} style={styles.cardContainer}>
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
      <ScrollView style={styles.container}>
        <Searchbar
          placeholder="Search by ID"
          onChangeText={getPendingList}
          value={searchText}
        />
        <RenderList />
        <Text style={{ marginVertical: 20 }}></Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Dimensions.get("window").width * 0.05,
    backgroundColor: colors.bgColor,
    gap: 15,
  },
  cardContainer: {
    marginHorizontal: Dimensions.get("window").width * 0.02,
    marginTop: Dimensions.get("window").height * 0.02,
  },
});

export default VerifyScreen;
