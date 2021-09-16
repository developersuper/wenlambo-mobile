import React from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";

import COLORS from "constants/colors";

const TextInput = ({ style, ...props }) => {
  return (
    <RNTextInput
      style={[styles.input, style]}
      placeholderTextColor={COLORS.GRAY}
      selectionColor={COLORS.WHITE}
      autoFocus
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    color: COLORS.WHITE,
    fontSize: 20,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
});

export default TextInput;
