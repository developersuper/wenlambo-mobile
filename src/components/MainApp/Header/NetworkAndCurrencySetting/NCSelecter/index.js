import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { useHistory } from "react-router";

import COLORS from "constants/colors";
import Icon from "elements/Icon";
import FadeModal from "components/FadeModal";

export const NCSelecter = ({ 
  premium,
  value, 
  data, 
  onSelect, 
}) => {
  
  const history = useHistory();
  const filteredData = premium ? 
    [...data] : 
    [...data.slice(0,1), { 
      title: "Upgarde to Premium to view other timeframes",
      value: "premium",
    }];

  const handleSelected = (item, onClose) => {
    if(item.value === "premium") {
      history.push("/main/premium");
      return;
    }
    onSelect(item);
    onClose();
  }
  return (
    <FadeModal
      backgroundOpacity={0.8}
      handler={(onOpen) => (
        <TouchableOpacity onPress={onOpen}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonTextStyle}>{value.title}</Text>
            <Icon 
              type="material"
              name="arrow-drop-down"
              color={COLORS.GRAY}
              size={20}
            />
          </View>
        </TouchableOpacity>
      )}
      style={styles.modal}
    >
      {(onClose) => (
        <View style={styles.modalContainer}>
          <ScrollView>
            {
              filteredData.map((item) => {
                return (
                  <TouchableOpacity 
                    key={item.value}
                    onPress={() => handleSelected(item, onClose)}
                  >
                    <View style={styles.rowStyle}> 
                      <Text style={styles.rowTextStyle}>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })  
            }
          </ScrollView>
        </View>
      )}
    </FadeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalContainer: {
    width: "80%",
    backgroundColor: COLORS.SECONDARY_BG,
    maxHeight: 400,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  buttonTextStyle: {
    color: COLORS.GRAY,
    fontSize: 16,
    textAlign: "right"
  },
  rowStyle: {
    borderBottomWidth: 0,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    padding: 10,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: COLORS.BLACK,
    paddingLeft: 30,
  },
  rowTextStyle: {
    color: COLORS.WHITE,
    fontSize: 16,
  }
})

export default NCSelecter;