import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-native";


import { setCurrency } from "actions/current";
import { setNetwork, setGlobalCurrency } from "actions/favorites";
import COLORS from "constants/colors";
import NCSelecter from "./NCSelecter";

const networks = [
  { 
    title: "BSC",
    value: "bsc"
  },
  { 
    title: "ETH",
    value: "eth"
  }, 
];

const currencies = [ 
  { 
    title: "USD",
    value: "usd"
  }, 
  { 
    title: "GBP",
    value: "gbp"
  }, 
  { 
    title: "EUR",
    value: "eur"
  }, 
  { 
    title: "JPY",
    value: "jpy"
  }, 
  { 
    title: "Zar",
    value: "zar"
  }, 
];

export const NetworkAndCurrencySetting = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const network = useSelector((state) => state.favorites?.network);
  const globalCurrency = useSelector((state) => state.favorites?.globalCurrency);
  const premium = useSelector((state) => state.account?.lp?.premium);


  const setCurrencyOriginal = (value) => {
    dispatch(setCurrency(value));
  };

  // const [searchToken, { data: currencyData, loading: currencyLoading, error }] = useLazyQuery(SEARCH_TOKEN);
  useEffect(() => {
    // if (token) {
    //   // searchToken({ variables: { address: token } });
    // } else 
    if (network === "eth") {
      setCurrencyOriginal({
        symbol: "ETH",
        name: "Ether",
        id: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      });
    } else {
      setCurrencyOriginal({
        symbol: "(LAMBO)",
        name: "WEN LAMBO",
        id: "0x2c7b396d17e3a5184d4901380836de7a72c5cba4",
        address: "0x2c7b396d17e3a5184d4901380836de7a72c5cba4",
      });
    }
  }, [network]);

  return (
    <View style={styles.dropdowns}>
    <NCSelecter 
      premium={true}
      data={networks}
      value={networks.find(item => item.value === network)}
      onSelect={(item) => {
        dispatch(setNetwork(item.value));
      }}
    />
    <NCSelecter
      premium={premium}
      data={currencies}
      value={currencies.find(item => item.value === globalCurrency)}
      onSelect={(item) => {
        console.log(item);
        dispatch(setGlobalCurrency(item.value))
      }}
    />
  </View>
  );
};

const styles = StyleSheet.create({

})

export default NetworkAndCurrencySetting;