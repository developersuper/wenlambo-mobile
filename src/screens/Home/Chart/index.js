import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-native";

import { SEARCH_TOKEN } from "queries/history";
import { BNB_PRICE } from "queries/tools";
import Symbols from "constants/symbols";
import TradingView from "components/TradingView";
import TradeHistory from "components/TradeHistory";

import TokenInfo from "./components/TokenInfo";

let bnbTimeInterval = null;

const Chart = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.current?.token);
  const globalCurrency = useSelector((state) => state.favorites?.globalCurrency);
  const currency = useSelector((state) => state.current?.currency);
  const walletAddress = useSelector((state) => state.current?.walletAddress);
  const [bnbUsdPrice, setbnbUsdPrice] = useState();
  const [getBnbPrice] = useLazyQuery(BNB_PRICE, {
    fetchPolicy: "network-only",
    variables: {
      currency: globalCurrency,
    },
    onCompleted: ({ bnbPrice }) => {
      setbnbUsdPrice(bnbPrice);
    },
  });

  useEffect(() => {
    if (bnbTimeInterval) {
      clearInterval(bnbTimeInterval);
    }
    getBnbPrice();
    bnbTimeInterval = setInterval(() => {
      getBnbPrice();
    }, 5000);
    return () => {
      clearInterval(bnbTimeInterval);
    };
  }, [globalCurrency]);

  return (
    <View style={styles.container}>
      <TradingView 
        currency={currency} 
        symbol={Symbols[globalCurrency]}
      />
      <TokenInfo 
        currency={currency} 
        bnbPrice={bnbUsdPrice}
        symbol={Symbols[globalCurrency]}
      />
      <TradeHistory 
        currency={currency} 
        currencySymbol={Symbols[globalCurrency]}
      />
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

export default Chart;
