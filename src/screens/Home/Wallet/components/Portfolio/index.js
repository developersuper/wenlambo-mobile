import React, { useState, useEffect } from "react";
import { StyleSheet, Switch, View, Text } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";

import Block from "elements/Block";
import { BALANCES } from "queries/balance";
import COLORS from "constants/colors";

import BalanceTable from "./BalanceTable";
import DonutChart from "./DonutChart";

const Portfolio = () => {
  const [showBlackList, setShowBlackList] = useState(false);
  const blackList = useSelector((state) => state.favorites?.blackList || []);
  const walletAddress = useSelector((state) => state.current?.walletAddress);
  const { data, loading } = useQuery(BALANCES, {
    variables: { walletAddress },
    skip: !walletAddress,
    onCompleted: (data) => {
      /* if (address === accountAddress && data) {
        const balances = {};
        data.balances.forEach(({ value, currency: { address } }) => {
          balances[address] = value;
        });
        // dispatch(setAccountBalances(balances));
      } */
    },
  });
  const balancesUnfiltered =
    data?.balances?.map(({ value, currency, bnbValue }) => ({
      id: currency.address,
      name: currency.name,
      symbol: currency.symbol,
      holdings: value.toFixed(2),
      price: currency.price || 0,
      value: value * (currency.price || 0),
      bnbValue,
    })) || [];
  const filteredBalances = loading
    ? []
    : balancesUnfiltered.filter((item) =>
        showBlackList
          ? blackList.includes(item.id || item.address)
          : !blackList.includes(item.id || item.address)
      );

  return (
    <Block style={styles.container} loading={loading} title="Portfolio">
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: COLORS.GRAY, true: COLORS.PRIMARY }}
          thumbColor={showBlackList ? '#5c0eba' : COLORS.SECONDARY_GRAY}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setShowBlackList(!showBlackList)}
          value={showBlackList}
        />
        <Text style={styles.text}>Show blackList</Text>
      </View>
      {!showBlackList && <DonutChart balances={filteredBalances} /> }
      <BalanceTable 
        balances={filteredBalances} 
        showBlackList={showBlackList}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    padding: 10,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 20,
    marginLeft: 8,
  }
});

export default Portfolio;
