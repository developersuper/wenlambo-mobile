import React, { useState } from "react";
import { View, StyleSheet, } from "react-native";
import { useSelector } from "react-redux";

import Block from "elements/Block";
import SymbolFinder from "components/SymbolFinder";
import TradingView from "components/TradingView";
import TradeHistory from "components/TradeHistory";

const PairExplorer = () => {
  const [token1, setToken1] = useState(null);
  const [token2, setToken2] = useState(null);
  const network = useSelector((state) => state.favorites?.network);

  return (
    <Block title="Pair Explorer">
      <View style={styles.symbolFinders}>
        <View style={styles.finder}>
          <SymbolFinder
            setCurrency={setToken1}
            currency={token1}
            title="Symbol 1"
            quote={token2?.address}
            groupBy={
              token2?.symbol
                ? ({ count }) =>
                    count > 0 ? "" : `No Transactions with ${token2?.symbol}`
                : undefined
            }
          />
        </View>
        <View style={styles.finder}>
          <SymbolFinder
            setCurrency={setToken2}
            currency={token2}
            title="Symbol 2"
            base={token1?.address}
            groupBy={
              token1?.symbol
                ? ({ count }) =>
                    count > 0 ? "" : `No Transactions with ${token1?.symbol}`
                : undefined
            }
          />
        </View>
      </View>
      {token1?.symbol && token2?.symbol && (
        <View style={styles.tradingViewWrapper}>
          <TradingView 
            currency={token1} 
            symbol={token2.symbol}
          />
          <TradeHistory 
            currency={token1} 
            quoteCurrency={token2}
            currencySymbol="$"
          />
        </View>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  symbolFinders: {
  },
  finder: {
    marginBottom: 10,
  },
  tradingViewWrapper: {

  }
})

export default PairExplorer;
