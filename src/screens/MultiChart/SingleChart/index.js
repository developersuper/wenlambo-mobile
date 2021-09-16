import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

import Block from "elements/Block";
import SymbolFinder from "components/SymbolFinder";
import TradingView from "components/TradingView";

const SingleChart = ({ defaultCurreny, chartId }) => {
  const [currency, setCurrency] = useState(defaultCurreny);
  const network = useSelector((state) => state.favorites?.network);
  return (
    <Block noIndicator>
      <View style={styles.symbolFinder}>
        <SymbolFinder setCurrency={setCurrency} currency={currency} />
      </View>
      <View style={styles.chart}>
        <TradingView
          currency={currency}
        />
      </View>
    </Block>
  )
};

const styles = StyleSheet.create({
  container: {

  },
});

export default SingleChart;