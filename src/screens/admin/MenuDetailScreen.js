import { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import colors from "../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { onUpdateMenu, onDeleteMenu } from "../../database/firebase";

const MenuDetailScreen = ({ route, navigation }) => {
  const menuDetail = route.params.item;
  const [selectedImage, setSelectedImage] = useState({
    uri: menuDetail.imageURL,
  });
  const [name, setName] = useState(menuDetail.name);
  const [description, setDescription] = useState(menuDetail.description);
  const [price, setPrice] = useState(menuDetail.price.toString());

  useEffect(() => {
    navigation.setOptions({
      rightIcons: [
        {
          icon: "trash-can-outline",
          color: "red",
          onPress: () =>
            Alert.alert("Warning", "Are you sure want to delete this menu?", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Yes",
                onPress: () => {
                  onDeleteMenu(menuDetail.id);
                  Alert.alert("Success", "Menu deleted");
                  navigation.pop();
                },
              },
            ]),
        },
      ],
    });
  }, []);

  // Select Food Image
  const onSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  // Update Menu
  const updateMenuHandler = async () => {
    if (!selectedImage || name == "" || isNaN(price) || price == "")
      return Alert.alert("Warning", "Please enter complete information");
    await onUpdateMenu(menuDetail.id, selectedImage, name, description, price);
    Alert.alert("Success", "Menu updated");
    navigation.pop();
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: colors.bgColor }}>
        <View style={styles.container}>
          <TouchableHighlight
            style={styles.imgContainer}
            onPress={() => onSelectImage()}
          >
            <Card style={styles.imgContainer}>
              {!selectedImage ? (
                <Text style={{ textAlign: "center" }}>
                  Press to Select Image
                </Text>
              ) : (
                <Image
                  source={{
                    uri: selectedImage.uri,
                  }}
                  style={styles.imgContainer}
                  resizeMode="stretch"
                />
              )}
            </Card>
          </TouchableHighlight>
          <TextInput
            mode="outlined"
            label="Name"
            onChangeText={setName}
            value={name}
          />
          <TextInput
            mode="outlined"
            label="Description"
            onChangeText={setDescription}
            value={description}
          />
          <TextInput
            mode="outlined"
            label="Price (RM)"
            keyboardType="number-pad"
            onChangeText={(text) =>
              !isNaN(text) && setPrice(text.replace(/\s/, ""))
            }
            value={price.toString()}
          />
          <Button mode="contained" onPress={() => updateMenuHandler()}>
            Update
          </Button>
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
  imgContainer: {
    justifyContent: "center",
    minHeight: Dimensions.get("window").height * 0.3,
    borderRadius: 10,
  },
});

export default MenuDetailScreen;
