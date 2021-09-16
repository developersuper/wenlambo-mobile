import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Icon from "elements/Icon";
import COLORS  from "constants/colors";

const HelpButton = ({ text }) => {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setShow(!show);
        }}
        onBlur={() => {
          alert();
          setShow(false);
        }}
      >
        <Icon 
          type="material"
          name="help"
          color={COLORS.WHITE}
          size={30}
        />
      </TouchableOpacity>
      { show === true &&
        <View style={styles.alt}>
          <Text style={styles.text}>{text}</Text>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  alt: {
    position: "absolute",
    top: 35,
    right: 0,
    width:250,
    backgroundColor: COLORS.GRAY,
    zIndex: 1000,
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: COLORS.WHITE,
  },
})

export default HelpButton;