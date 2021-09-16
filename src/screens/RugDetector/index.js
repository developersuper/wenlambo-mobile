import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import RugChecker from "./RugChecker";
import ContractScanner from "./ContractScanner";

const RugDetector = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <RugChecker />
        <ContractScanner />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 500,
  },
});

export default RugDetector;