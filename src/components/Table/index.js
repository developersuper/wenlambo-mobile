import React from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";

import COLORS from "constants/colors";

const Table = ({ columns, data, style, onPressRow }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.head}>
        <View style={styles.headerRow}>
          {columns.map(({ headerName, style, span = 1 }, index) => (
            <Text key={index} style={[styles.th, { flex: span }, style]}>
              {headerName}
            </Text>
          ))}
        </View>
      </View>
      <ScrollView style={styles.body} nestedScrollEnabled={true}>
        {data?.map((row, index) => (
          <TouchableOpacity 
            key={index}
            onPress={() => onPressRow ? onPressRow(row) : ''}
          >
            <View 
              style={styles.row}       
            >
              {columns.map(({ field, textStyle, render, span = 1 }, indexCol) => {
                let rendered = render ? render(row) : row[field];
                if (typeof rendered === "string") {
                  rendered = (  
                    <Text
                      key={indexCol + 'iop'}
                      style={[styles.tdText, textStyle ? textStyle(row) : null]}
                    >
                      {rendered}
                    </Text>
                  );
                }
                return (
                  <View key={indexCol} style={[styles.td, { flex: span }]}>
                    {rendered}
                  </View>
                );
              })}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  head: {
    width: "100%",
  },
  body: {
    width: "100%",
    maxHeight: 300,
    minHeight: 200,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: COLORS.GRAY,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.GRAY,
    paddingVertical: 10,
  },
  th: {
    flex: 1,
    color: COLORS.GRAY,
    paddingHorizontal: 5,
  },
  td: {
    flex: 1,
    paddingHorizontal: 5,
  },
  tdText: {
    color: COLORS.WHITE,
  },
});

export default Table;
