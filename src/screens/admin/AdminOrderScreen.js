import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Button, Card, Divider, Text } from "react-native-paper";
import colors from "../../constants/colors";
import {
  onValue,
  ref,
  db,
  updateOrderStatus,
  onPushNotification,
} from "../../database/firebase";
import moment from "moment";

const AdminOrderScreen = ({ route, navigation }) => {
  const [orderList, setOrderList] = useState([]);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    let unsubscribe = onValue(ref(db, "order"), (snapshot) => {
      let data;
      try {
        data = Object.values(snapshot.val());
      } catch (error) {
        data = snapshot.val();
      }
      setOrderList(data?.reverse() ?? []);
    });
    return unsubscribe;
  }, []);

  const onUpdateStatus = (orderID, itemStatus, userID) => {
    let newStatus =
      itemStatus == "Pending"
        ? "Preparing"
        : itemStatus == "Preparing"
        ? "Ready"
        : "Completed";
    if (newStatus == "Ready")
      onPushNotification(
        userID,
        "Your Food is Ready🍴",
        "Please pick up your food at the cafeteria."
      );
    updateOrderStatus(orderID, newStatus);
    ToastAndroid.show("Status Updated", ToastAndroid.SHORT);
  };

  const RenderStatusFilter = () => (
    <ScrollView horizontal>
      <Button
        mode={status == "Pending" ? "contained" : "outlined"}
        style={{ marginRight: 5 }}
        onPress={() => setStatus("Pending")}
      >
        Pending
      </Button>
      <Button
        mode={status == "Preparing" ? "contained" : "outlined"}
        style={{ marginRight: 5 }}
        onPress={() => setStatus("Preparing")}
      >
        Preparing
      </Button>
      <Button
        mode={status == "Ready" ? "contained" : "outlined"}
        style={{ marginRight: 5 }}
        onPress={() => setStatus("Ready")}
      >
        Ready
      </Button>
      <Button
        mode={status == "Completed" ? "contained" : "outlined"}
        onPress={() => setStatus("Completed")}
      >
        Completed
      </Button>
    </ScrollView>
  );

  const RenderOrderList = () => {
    if (orderList.filter((item) => item.status == status).length == 0)
      return (
        <Card>
          <Card.Content>
            <Text variant="labelLarge" style={{ alignSelf: "center" }}>
              No Record Found
            </Text>
          </Card.Content>
        </Card>
      );
    return orderList
      .filter((item) => item.status == status)
      .map((item, index) => (
        <Card key={index}>
          <Card.Content style={{ gap: 10 }}>
            <View>
              <Text>Order ID:</Text>
              <Text variant="labelLarge">{item.id}</Text>
            </View>
            <View>
              <Text>Order Time:</Text>
              <Text variant="labelLarge">
                {moment(item.createdTime, "X").format("DD/MM/YYYY - hh:mm A")}
              </Text>
            </View>
            <Divider />
            {item.items.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{item.name}</Text>
                <Text variant="labelLarge">{`x ${item.amount}`}</Text>
              </View>
            ))}
            <Divider />
            {item.status != "Completed" && (
              <Button
                mode="contained"
                onPress={() =>
                  onUpdateStatus(item.id, item.status, item.userID)
                }
              >
                Mark as{" "}
                {item.status == "Pending"
                  ? "Preparing"
                  : item.status == "Preparing"
                  ? "Ready"
                  : "Completed"}
              </Button>
            )}
          </Card.Content>
        </Card>
      ));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: colors.bgColor }}>
        <View style={styles.container}>
          <RenderStatusFilter />
          <RenderOrderList />
        </View>
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
});

export default AdminOrderScreen;
