import { useState } from "react";
import { Alert, StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { Button, Card, Text, Searchbar, TextInput } from "react-native-paper";
import colors from "../../constants/colors";
import {
  userList,
  userUpdateCredit,
  onPushNotification,
} from "../../database/firebase";

const TopupScreen = ({ route, navigation }) => {
  const [studentList, setStudentList] = useState(
    userList.filter((item) => item.role == "Student" && item.status == "Active")
  );
  const [searchText, setSearchText] = useState("");

  // Getting Students List
  const getStudentList = (userID) => {
    if (userID && userID != "") {
      setSearchText(userID);
      setStudentList(
        userList.filter(
          (item) =>
            item.role == "Student" &&
            item.status == "Active" &&
            item.userID.toLowerCase().includes(userID.toLowerCase())
        )
      );
    } else {
      setSearchText("");
      setStudentList(
        userList.filter(
          (item) => item.role == "Student" && item.status == "Active"
        )
      );
    }
  };

  // Update Student Credit
  const onUpdateCredit = (ID, prevCredit, newCredit) => {
    if (isNaN(newCredit) || newCredit == "")
      return Alert.alert("Warning", "Please enter valid amount");
    Alert.alert(
      "Warning",
      `Are you sure want topup RM ${parseFloat(newCredit).toFixed(2)}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            let credit = parseFloat(prevCredit) + parseFloat(newCredit);
            userUpdateCredit(ID, credit);
            onPushNotification(
              ID,
              "Successful top-up💰",
              `You have successfully top-up RM ${parseFloat(newCredit).toFixed(
                2
              )} credit.`
            );
            getStudentList(searchText);
          },
        },
      ]
    );
  };

  // Render Student List
  const RenderStudentList = () => {
    if (studentList.length == 0)
      return (
        <Card style={styles.cardContainer}>
          <Card.Content>
            <Text style={{ alignSelf: "center" }}>No Record Found</Text>
          </Card.Content>
        </Card>
      );
    return studentList.map((item, index) => {
      const [isTopup, setIsTopup] = useState(false);
      const [newCredit, setNewCredit] = useState("");

      return (
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
          </Card.Content>
          <Text></Text>
          {!isTopup ? (
            <Card.Content>
              <Button mode="contained" onPress={() => setIsTopup(true)}>
                Topup
              </Button>
            </Card.Content>
          ) : (
            <>
              <Card.Content>
                <TextInput
                  mode="outlined"
                  label="Amount (RM)"
                  keyboardType="number-pad"
                  onChangeText={(text) =>
                    !isNaN(text) && setNewCredit(text.replace(/\s/, ""))
                  }
                  value={newCredit.toString()}
                />
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => setIsTopup(false)}>Cancel</Button>
                <Button
                  onPress={() =>
                    onUpdateCredit(item.id, item.credit, newCredit)
                  }
                >
                  Topup
                </Button>
              </Card.Actions>
            </>
          )}
        </Card>
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Searchbar
          placeholder="Search by ID"
          onChangeText={getStudentList}
          value={searchText}
        />
        <RenderStudentList />
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

export default TopupScreen;
