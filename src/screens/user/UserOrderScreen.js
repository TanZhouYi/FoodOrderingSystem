import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Card, Divider, Text } from "react-native-paper";
import colors from "../../constants/colors";
import { getUserDetail, onValue, ref, db } from "../../database/firebase";
import moment from "moment";

const UserOrderScreen = ({ route, navigation }) => {
  const userDetail = getUserDetail();
  const [orderList, setOrderList] = useState([]);

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

  const RenderOrderList = () => {
    if (orderList.filter((item) => item.userID == userDetail.id).length == 0)
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
      .filter((item) => item.userID == userDetail.id)
      .map((item, index) => {
        const [showDetail, setShowDetail] = useState(false);

        return (
          <Card key={index}>
            <Card.Content
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ gap: 5, maxWidth: "70%" }}>
                <View>
                  <Text>Order ID:</Text>
                  <Text variant="labelLarge">{item.id}</Text>
                </View>
                <View>
                  <Text>Order Time:</Text>
                  <Text variant="labelLarge">
                    {moment(item.createdTime, "X").format(
                      "DD/MM/YYYY - hh:mm A"
                    )}
                  </Text>
                </View>
              </View>
              <View>
                <Text>Status:</Text>
                <Text variant="labelLarge">{item.status}</Text>
              </View>
            </Card.Content>
            <Card.Content>
              <TouchableOpacity onPress={() => setShowDetail(!showDetail)}>
                <View style={{ marginTop: 10, gap: 10 }}>
                  <Divider />
                  <Text>{showDetail ? "Less" : "More"} Detail</Text>
                  {showDetail && (
                    <View style={{ gap: 10 }}>
                      {item.items.map((item, index) => (
                        <View key={index} style={styles.detailContainer}>
                          <Text>{item.name}</Text>
                          <Text variant="labelLarge">{`RM ${parseFloat(
                            item.price
                          ).toFixed(2)} x ${item.amount}`}</Text>
                        </View>
                      ))}
                      <Divider />
                      <View style={styles.detailContainer}>
                        <Text>Grand Total</Text>
                        <Text variant="labelLarge">{`RM ${parseFloat(
                          item.amount
                        ).toFixed(2)}`}</Text>
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        );
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: colors.bgColor }}>
        <View style={styles.container}>
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
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default UserOrderScreen;
