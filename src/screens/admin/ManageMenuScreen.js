import { useState, useEffect } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";
import colors from "../../constants/colors";
import { menuList as curMenuList } from "../../database/firebase";

const ManageMenuScreen = ({ route, navigation }) => {
  const [menuList, setMenuList] = useState(curMenuList);

  useEffect(() => {
    navigation.setOptions({
      rightIcons: [
        {
          icon: "plus",
          onPress: () => navigation.navigate("MenuAddScreen"),
        },
      ],
    });

    const unsubscribe = navigation.addListener("focus", async () => {
      getMenuList();
    });
    return unsubscribe;
  }, [navigation]);

  // Fetch menu list
  const getMenuList = () => {
    setMenuList(curMenuList);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Manage Menu Screen Page</Text>
        <Text>{JSON.stringify(menuList)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Dimensions.get("window").width * 0.1,
    backgroundColor: colors.bgColor,
  },
});

export default ManageMenuScreen;
