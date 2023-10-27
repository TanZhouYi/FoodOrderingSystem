import { StyleSheet, View, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import colors from "../../constants/colors";

const MenuDetailScreen = ({ route, navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Menu Detail Screen</Text>
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

export default MenuDetailScreen;
