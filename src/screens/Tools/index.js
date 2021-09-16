import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import TopGainersAndLosers from "./TopGainersAndLosers";
import TokenEvents from "./TokenEvents";
import PairExplorer from "./PairExplorer";

const Tools = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TopGainersAndLosers />
        <TopGainersAndLosers isLoser />
        <TokenEvents />
        <PairExplorer />
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

export default Tools;