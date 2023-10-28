import { useState, useEffect } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableHighlight,
} from "react-native";
import { Button, Card, Text, Searchbar } from "react-native-paper";
import colors from "../../constants/colors";
import { menuList as curMenuList } from "../../database/firebase";

const ManageMenuScreen = ({ route, navigation }) => {
  const [menuList, setMenuList] = useState(curMenuList);
  const [searchText, setSearchText] = useState("");

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
  const getMenuList = (filterName = false) => {
    if (filterName && filterName != "") {
      setSearchText(filterName);
      setMenuList(
        curMenuList.filter((item) =>
          item.name.toLowerCase().includes(filterName.toLowerCase())
        )
      );
    } else {
      setSearchText("");
      setMenuList(curMenuList);
    }
  };

  // Render Menu List
  const RenderMenuList = () => {
    if (menuList.length == 0)
      return (
        <Card style={{ width: "97%", marginHorizontal: 5 }}>
          <Card.Content>
            <Text style={{ alignSelf: "center" }}>No Record Found</Text>
          </Card.Content>
        </Card>
      );
    return menuList.map((item, index) => (
      <TouchableHighlight
        key={index}
        style={styles.cardContainer}
        onPress={() => navigation.navigate("MenuDetailScreen", { item })}
      >
        <Card>
          <Card.Cover
            style={styles.cardCover}
            source={{ uri: item.imageURL }}
            resizeMode="stretch"
          />
          <Card.Title
            title={item.name}
            subtitle={`RM ${parseFloat(item.price).toFixed(2)}`}
          />
        </Card>
      </TouchableHighlight>
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Searchbar
          placeholder="Search by Name"
          onChangeText={getMenuList}
          value={searchText}
        />
        <View style={styles.renderContainer}>
          <RenderMenuList />
        </View>
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
  renderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: Dimensions.get("window").height * 0.02,
    gap: 10,
  },
  cardContainer: {
    borderRadius: 12,
    width: Dimensions.get("window").width * 0.43,
  },
  cardCover: {
    height: Dimensions.get("window").width * 0.35,
  },
});

export default ManageMenuScreen;
