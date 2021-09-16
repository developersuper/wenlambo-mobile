import React from "react";
import { StyleSheet, View } from "react-native";

import Portfolio from "./components/Portfolio";

const Wallet = () => {
  return (
    <View style={styles.container}>
      <Portfolio />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
});

export default Wallet;
