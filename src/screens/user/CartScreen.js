import { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Button, Card, Divider, IconButton, Text } from "react-native-paper";
import colors from "../../constants/colors";
import {
  getUserDetail,
  onCartUpdate,
  onCartRemove,
  onCartSubmit,
} from "../../database/firebase";

const CartScreen = ({ route, navigation }) => {
  const [cartList, setCartList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    getCartList();
  }, []);

  // Get latest list
  const getCartList = () => {
    let newList;
    try {
      newList = Object.values(getUserDetail().cart);
    } catch (error) {
      newList = getUserDetail().cart;
    }
    setCartList(newList ?? []);
  };

  // Render List
  const RenderCartList = () => {
    useEffect(() => {
      let newTotal = 0;
      cartList.map((item) => {
        newTotal += parseFloat(item.price) * parseInt(item.amount);
      });
      setTotalAmount(newTotal);
    }, []);

    if (cartList.length == 0) {
      return (
        <Text variant="labelLarge" style={{ alignSelf: "center" }}>
          Cart is Empty
        </Text>
      );
    }

    return cartList.map((item, index) => {
      const onUpdateAmount = (action) => {
        if (action == "-") {
          if (item.amount == 1) {
            Alert.alert(
              "Warning",
              "Are you sure you want to delete this menu?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    ToastAndroid.show(
                      "Menu has been deleted",
                      ToastAndroid.SHORT
                    );
                    onCartRemove(item.id);
                    getCartList();
                  },
                  style: "default",
                },
              ],
              { cancelable: true }
            );
          } else {
            onCartUpdate(item, item.amount - 1);
          }
        } else {
          onCartUpdate(item, item.amount + 1);
        }
        getCartList();
      };

      return (
        <View key={index} style={styles.itemsContainer}>
          <View>
            <Text variant="labelLarge">{item.name}</Text>
            <Text variant="bodySmall">{`RM ${parseFloat(item.price).toFixed(
              2
            )}`}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton
              icon="minus-circle-outline"
              onPress={() => onUpdateAmount("-")}
              style={{ marginVertical: 0 }}
            />
            <Text variant="titleMedium">{item.amount}</Text>
            <IconButton
              icon="plus-circle-outline"
              onPress={() => onUpdateAmount("+")}
              style={{ marginVertical: 0 }}
            />
          </View>
        </View>
      );
    });
  };

  // Place Order
  const onPlaceOrder = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want place order?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            let userDetail = getUserDetail();
            let amount = parseFloat(totalAmount);
            let credit = parseFloat(userDetail.credit);

            if (userDetail.role == "Student" && amount > credit)
              return Alert.alert(
                "Warning",
                "Your credit is low, please top-up it to continue order."
              );
            onCartSubmit({
              userID: userDetail.id,
              items: cartList,
              amount: parseFloat(totalAmount),
              credit:
                userDetail.role == "Student"
                  ? credit - amount
                  : credit + amount,
            });
            ToastAndroid.show("Successful Place Order", ToastAndroid.SHORT);
            getCartList();
          },
          style: "default",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: colors.bgColor }}>
        <View style={styles.container}>
          <Card>
            <Card.Content style={{ gap: 10 }}>
              <Text variant="labelLarge">You've Ordered</Text>
              <RenderCartList />
              <Divider />
              <View style={styles.itemsContainer}>
                <Text variant="labelLarge">Grand Total</Text>
                <Text>RM {parseFloat(totalAmount).toFixed(2)}</Text>
              </View>
              <Divider />
              <Button
                mode="contained"
                disabled={isNaN(totalAmount) || totalAmount == 0}
                onPress={() => onPlaceOrder()}
              >
                Place Order
              </Button>
            </Card.Content>
          </Card>
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
  },
  itemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default CartScreen;
