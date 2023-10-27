import { useState } from "react";
import { Alert, StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { Button, Card, Text, Searchbar, TextInput } from "react-native-paper";
import colors from "../../constants/colors";
import { userList, userUpdateCredit } from "../../database/firebase";

const StaffCreditScreen = ({ route, navigation }) => {
  const [staffList, setStaffList] = useState(
    userList.filter(
      (item) =>
        item.role == "Staff" && item.status == "Active" && item.credit != 0
    )
  );
  const [searchText, setSearchText] = useState("");

  // Getting Staff List
  const getStaffList = (userID) => {
    if (userID && userID != "") {
      setSearchText(userID);
      setStaffList(
        userList.filter(
          (item) =>
            item.role == "Staff" &&
            item.status == "Active" &&
            item.credit != 0 &&
            item.userID.toLowerCase().includes(userID.toLowerCase())
        )
      );
    } else {
      setSearchText("");
      setStaffList(
        userList.filter(
          (item) =>
            item.role == "Staff" && item.status == "Active" && item.credit != 0
        )
      );
    }
  };

  // Reset Staff Credit
  const onResetCredit = (ID) => {
    Alert.alert(
      "Warning",
      "Are you sure want reset this staff credit?\n\nPlease make sure it has been deducted from their salary.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            userUpdateCredit(ID, 0);
            getStaffList();
          },
        },
      ]
    );
  };

  // Render Staff List
  const RenderStaffList = () => {
    if (staffList.length == 0)
      return (
        <Card style={styles.cardContainer}>
          <Card.Content>
            <Text style={{ alignSelf: "center" }}>No Record Found</Text>
          </Card.Content>
        </Card>
      );
    return staffList.map((item, index) => (
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
              <Text>Credit:</Text>
              <Text variant="labelLarge">
                RM {parseFloat(item.credit).toFixed(2)}
              </Text>
            </View>
          </View>
          <Text></Text>
          <Button mode="contained" onPress={() => onResetCredit(item.id)}>
            Reset
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
          onChangeText={getStaffList}
          value={searchText}
        />
        <RenderStaffList />
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

export default StaffCreditScreen;
