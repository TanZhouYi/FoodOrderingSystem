import { Appbar } from "react-native-paper";

const HeaderBar = ({ options, route, back, navigation }) => {
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : route.name;

  return (
    <Appbar.Header mode="center-aligned">
      {back && <Appbar.BackAction onPress={() => navigation.pop()} />}
      {options.leftIcons?.map((item, index) => (
        <Appbar.Action {...item} key={index} />
      ))}
      <Appbar.Content title={title} />
      {options.rightIcons?.map((item, index) => (
        <Appbar.Action {...item} key={index} />
      ))}
    </Appbar.Header>
  );
};

export default HeaderBar;
