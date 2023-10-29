import { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { Button, Card, Chip, DataTable, Text } from "react-native-paper";
import colors from "../../constants/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { onValue, ref, db } from "../../database/firebase";

const SalesReportScreen = ({ route, navigation }) => {
  const [orderList, setOrderList] = useState([]);
  const [recordList, setRecordList] = useState([]);
  const [selectStartDate, setSelectStartDate] = useState(false);
  const [selectEndDate, setSelectEndDate] = useState(false);
  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment().endOf("month"));

  useEffect(() => {
    navigation.setOptions({
      rightIcons: [
        {
          icon: "printer-outline",
          onPress: () => {},
        },
      ],
    });
    let unsubscribe = onValue(ref(db, "order"), (snapshot) => {
      let data;
      try {
        data = Object.values(snapshot.val());
      } catch (error) {
        data = snapshot.val();
      }
      setOrderList(data ?? []);
      getRecordList(data ?? []);
    });
    return unsubscribe;
  }, []);

  const getRecordList = (
    list = orderList,
    sDate = startDate,
    eDate = endDate
  ) => {
    setRecordList(
      list.filter((item) =>
        moment(item.createdTime, "X").isBetween(moment(sDate), moment(eDate))
      )
    );
  };

  const RenderRangeFilter = () => {
    return (
      <Card>
        <Card.Content>
          <View style={styles.filterItem}>
            <Text>Date</Text>
            <Chip onPress={() => setSelectStartDate(true)}>
              {moment(startDate).format("DD/MM/YYYY")}
            </Chip>
            <Text>To</Text>
            <Chip onPress={() => setSelectEndDate(true)}>
              {moment(endDate).format("DD/MM/YYYY")}
            </Chip>
            {selectStartDate && (
              <DateTimePicker
                mode="date"
                value={moment(startDate).toDate()}
                onChange={(event, selectedDate) => {
                  setSelectStartDate(false);
                  setStartDate(moment(selectedDate));
                  getRecordList(orderList, moment(selectedDate), endDate);
                }}
              />
            )}
            {selectEndDate && (
              <DateTimePicker
                mode="date"
                value={moment(endDate).toDate()}
                onChange={(event, selectedDate) => {
                  setSelectEndDate(false);
                  setEndDate(moment(selectedDate));
                  getRecordList(orderList, startDate, moment(selectedDate));
                }}
              />
            )}
          </View>
        </Card.Content>
      </Card>
    );
  };

  const RenderRecordList = () => {
    if (recordList.length == 0)
      return (
        <Card>
          <Card.Content>
            <Text variant="labelLarge" style={{ alignSelf: "center" }}>
              No Record Found
            </Text>
          </Card.Content>
        </Card>
      );

    let totalItems = 0;
    let totalAmount = 0;

    return (
      <Card>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 2 }}>Date</DataTable.Title>
            <DataTable.Title numeric>Items</DataTable.Title>
            <DataTable.Title numeric>Total (RM)</DataTable.Title>
          </DataTable.Header>

          {recordList.map((item, index) => {
            totalItems += item.items.length;
            totalAmount += item.amount;
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell style={{ flex: 2 }}>
                  {moment(item.createdTime, "X").format("DD/MM/YYYY - hh:mm A")}
                </DataTable.Cell>
                <DataTable.Cell numeric>{item.items.length}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {parseFloat(item.amount).toFixed(2)}
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
          <DataTable.Row>
            <DataTable.Cell style={{ flex: 2 }}>Grand Total</DataTable.Cell>
            <DataTable.Cell numeric>{totalItems}</DataTable.Cell>
            <DataTable.Cell numeric>
              {parseFloat(totalAmount).toFixed(2)}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: colors.bgColor }}>
        <View style={styles.container}>
          <RenderRangeFilter />
          <RenderRecordList />
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
    gap: 20,
  },
  filterItem: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default SalesReportScreen;
