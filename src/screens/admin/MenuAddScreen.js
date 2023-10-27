import { useState } from "react";
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
import { onAddMenu } from "../../database/firebase";

const MenuAddScreen = ({ route, navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // Select Food Image
  const onSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  // Submit New Menu
  const addMenuHandler = async () => {
    if (!selectedImage || name == "" || isNaN(price) || price == "")
      return Alert.alert("Warning", "Please enter complete information");
    await onAddMenu(selectedImage, name, description, price);
    Alert.alert("Success", "New menu added");
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
            label="Price"
            keyboardType="number-pad"
            onChangeText={(text) =>
              !isNaN(text) && setPrice(text.replace(/\s/, ""))
            }
            value={price.toString()}
          />
          <Button mode="contained" onPress={() => addMenuHandler()}>
            Add
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

export default MenuAddScreen;
