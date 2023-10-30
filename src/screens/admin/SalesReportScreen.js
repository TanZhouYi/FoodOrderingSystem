import { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, ScrollView, Alert } from "react-native";
import { Button, Card, Chip, DataTable, Text } from "react-native-paper";
import colors from "../../constants/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import { shareAsync } from "expo-sharing";
import { onValue, ref, db } from "../../database/firebase";

const SalesReportScreen = ({ route, navigation }) => {
  const [orderList, setOrderList] = useState([]);
  const [recordList, setRecordList] = useState([]);
  const [selectStartDate, setSelectStartDate] = useState(false);
  const [selectEndDate, setSelectEndDate] = useState(false);
  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment().endOf("month"));
  const [isExportReport, setIsExportReport] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      rightIcons: [
        {
          icon: "printer-outline",
          onPress: () => setIsExportReport(true),
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

  const OnExportReport = () => {
    useEffect(() => {
      (async () => {
        if (recordList.length == 0) {
          setIsExportReport(false);
          return Alert.alert("Warning", "No record to export");
        }

        let totalItems = 0;
        let totalAmount = 0;
        let reportList = orderList
          .map((item) => {
            totalItems += item.items.length;
            totalAmount += item.amount;
            return `
              <tr>
                <td>${moment(item.createdTime, "X").format(
                  "DD/MM/YYYY - hh:mm A"
                )}</td>
                <td>${item.items.length}</td>
                <td>${parseFloat(item.amount).toFixed(2)}</td>
              </tr>
              `;
          })
          .join("");
        let html = `
          <html>
            <head>
              <style>
                body {
                  font-family: "Helvetica";
                  font-size: 12px;
                }
                header,
                footer {
                  height: 50px;
                  background-color: #fff;
                  color: #000;
                  display: flex;
                  justify-content: center;
                  padding: 0 20px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th,
                td {
                  border: 1px solid #000;
                  padding: 5px;
                }
                th {
                  background-color: #ccc;
                }
              </style>
            </head>
            <body>
              <header>
                <h1>Sales Report</h1>
              </header>
              <h1>Report Details</h1>
              <table>
                <tr>
                  <th>Date</th>
                  <td>${moment(startDate).format("DD/MM/YYYY")} to ${moment(
          endDate
        ).format("DD/MM/YYYY")}</td>
                </tr>
                <tr>
                  <th>Total Order</th>
                  <td>${orderList.length}</td>
                </tr>
                <tr>
                  <th>Total Items</th>
                  <td>${totalItems}</td>
                </tr>
                <tr>
                  <th>Grand Total</th>
                  <td>RM ${parseFloat(totalAmount).toFixed(2)}</td>
                </tr>
              </table>
              <h1>List</h1>
              <table>
                <tr>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total (RM)</th>
                </tr>
                ${reportList}
              </table>
            </body>
          </html>
        `;
        const { uri } = await Print.printToFileAsync({ html });
        setIsExportReport(false);
        Alert.alert(
          "Success",
          "Your Sales Report is Ready",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Preview",
              onPress: async () => {
                FileSystem.getContentUriAsync(uri).then((cUri) => {
                  IntentLauncher.startActivityAsync(
                    "android.intent.action.VIEW",
                    {
                      data: cUri,
                      flags: 1,
                      type: "application/pdf",
                    }
                  );
                });
              },
            },
            {
              text: "Download",
              onPress: async () => {
                await shareAsync(uri, {
                  UTI: ".pdf",
                  mimeType: "application/pdf",
                });
              },
            },
          ],
          { cancelable: true }
        );
      })();
    }, []);
    return <></>;
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: colors.bgColor }}>
        <View style={styles.container}>
          {isExportReport && <OnExportReport />}
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
