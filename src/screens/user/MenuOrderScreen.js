import { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Button, Card, Divider, Text, IconButton } from "react-native-paper";
import colors from "../../constants/colors";
import { onCartUpdate } from "../../database/firebase";

const MenuOrderScreen = ({ route, navigation }) => {
  const menuDetail = route.params.item;
  const [amount, setAmount] = useState(1);

  // Change amount
  const onChangeAmount = (action) => {
    let newAmount =
      action == "+" ? amount + 1 : amount != 1 ? amount - 1 : amount;
    setAmount(newAmount);
  };

  // Add to cart
  const onSubmit = () => {
    onCartUpdate(menuDetail, amount);
    ToastAndroid.show("Menu Added to Cart", ToastAndroid.SHORT);
    navigation.pop();
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: colors.bgColor }}>
        <View style={styles.container}>
          <Card>
            <Card.Cover
              style={styles.imgContainer}
              source={{
                uri: menuDetail.imageURL,
              }}
              resizeMode="stretch"
            />
            <Card.Title
              title={menuDetail.name}
              subtitle={`RM ${parseFloat(menuDetail.price).toFixed(2)}`}
              titleVariant="titleLarge"
            />
            <Card.Content>
              <Text>{menuDetail.description}</Text>
              <Divider
                style={{
                  marginVertical: Dimensions.get("window").height * 0.01,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <IconButton
                    icon="minus-circle-outline"
                    onPress={() => onChangeAmount("-")}
                    size={Dimensions.get("window").height * 0.04}
                  />
                  <Text variant="titleLarge">{amount}</Text>
                  <IconButton
                    icon="plus-circle-outline"
                    onPress={() => onChangeAmount("+")}
                    size={Dimensions.get("window").height * 0.04}
                  />
                </View>
                <Button mode="contained" onPress={() => onSubmit()}>
                  Add to Cart
                </Button>
              </View>
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
    paddingBottom: Dimensions.get("window").height * 0.1,
    backgroundColor: colors.bgColor,
    gap: 15,
  },
  imgContainer: {
    justifyContent: "center",
    height: Dimensions.get("window").height * 0.3,
    borderRadius: 10,
  },
});

export default MenuOrderScreen;
