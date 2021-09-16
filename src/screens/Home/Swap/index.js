import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback } from "react-native";

import SwapBlock from "components/SwapBlock";

const Swap = () => {
  return (
    <View style={styles.container}>
      <SwapBlock />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Swap;
