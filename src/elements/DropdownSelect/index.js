import React, { useState, useRef } from "react";
import { View, Text, StyleSheet} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'

import COLORS from "constants/colors";

export const DropdownSelect = ({ 
  defaultValue, 
  data, 
  onSelect, 
  upperCase, 
  buttonTextAfterSelection,  
  rowTextForSelection
}) => {
  return (
    <View style={styles.container}>
      <SelectDropdown
        style={styles.picker}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={styles.buttonTextStyle}
        defaultValue={defaultValue}
        dropdownStyle={styles.dropdownStyle}
        rowStyle={styles.rowStyle}
        rowTextStyle={styles.rowTextStyle}
        data={data}
        onSelect={(value) => onSelect(value)}
        buttonTextAfterSelection={buttonTextAfterSelection ? buttonTextAfterSelection : (selectedItem, index) => {
          if(upperCase){
            return selectedItem?.toUpperCase();
          }
          return selectedItem;
        }}
        rowTextForSelection={rowTextForSelection ? rowTextForSelection : (item, index) => {
          if(upperCase){
            return item?.toUpperCase();
          }
          return item;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: 70,
    padding: 0,
    backgroundColor: COLORS.BLACK,
    height: 20,
    padding: 0,
  },
  buttonTextStyle: {
    color: COLORS.GRAY,
    fontSize: 17,
  },
  dropdownStyle: {
    backgroundColor: COLORS.SECONDARY_BG,
    color: COLORS.WHITE,
  },
  rowStyle: {
    borderBottomWidth: 0,
    height: 30,
  },
  rowTextStyle: {
    color: COLORS.SECONDARY_GRAY,
  }
})

export default DropdownSelect;