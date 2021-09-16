import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback } from "react-native";

import Block from "elements/Block";
import TransactionForm from "./TransactionForm";

const SwapBlock = () => {
  return (
    <View style={styles.container}>
      <Block noIndicator>
        <TransactionForm 
          title = "Buy"
        />
        <TransactionForm 
          title = "Sell"
        />
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
});

export default SwapBlock;
