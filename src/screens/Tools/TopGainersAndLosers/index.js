import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import currencyFormatter from "currency-formatter";
import { useQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-native";

import { TOP_GAINERS } from "queries/tools";
import Icon from "elements/Icon";
import COLORS from "constants/colors";
import Table from "components/Table";
import Block from "elements/Block";
import FavoriteButton from "components/FavoriteButton";

import TimeFrameSelecter from "./TimeFrameSelecter";
import PremiumButton from "components/PremiumButton";

const timeframes = [
  {
    title: "5m",
    value: 5,
  },
  {
    title: "10m",
    value: 10,
  },
  {
    title: "30m",
    value: 30,
  },
  {
    title: "1h",
    value: 60,
  },
  {
    title: "5h",
    value: 300,
  },
  {
    title: "24h",
    value: 60 * 24,
  },
  {
    title: "7d",
    value: 60 * 24 * 7,
  },
  {
    title: "30d",
    value: 60 * 24 * 30,
  },
];

const TopGainersAndLosers = ({ isLoser }) => {

  const history = useHistory();
  const premium = useSelector((state) => state.account?.lp?.premium);
  const tokens = useSelector((state) => state.favorites?.tokens) || [];
  const [timeframe, setTimeframe] = useState(30);
  const { data, loading, error } = useQuery(TOP_GAINERS, {
    variables: {
      minutes: timeframe,
      isLoser,
      limit: premium ? 30 : 5,
    },
  });
  const currentTimeframe = timeframes.find(({ value }) => value === timeframe);
  
  const columns = [
    {
      headerName: "",
      span: 0.3,
      render: (currency) => {
        return  (<FavoriteButton currency={currency} />);
      }
    },
    {
      headerName: "Name",
      field: "name",
      render: ({ name, symbol }) => {
        return (
          <View style={styles.nameSymbol}>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.symbol}>{symbol}</Text>
          </View>
        )
      }
    },
    {
      headerName: "Price",
      field: "price",
      span: 0.8,
      render: ({ price }) => {
        const [former, later] = `${price}`.split("e-");
        const decimal = `${former}`.split(".")[1] || "0";
        let precision =
          (later || 0) > 0
            ? Number(later) + 1
            : decimal.length - `${parseInt(decimal, 10)}`.length + 2;
        if (price > 1) {
          precision = 2;
        }
        if(precision > 20) precision = 20;
        return currencyFormatter.format(price, {
          locale: "en-US",
          precision,
        });
      }
    },
    {
      field: "",
      headerName: currentTimeframe?.title,
      span: 0.5,
      render: ({increase}) => {
        return (
          <View style={styles.incDec}>
            <Icon
              type="material"
              name={isLoser ? "arrow-drop-down" : "arrow-drop-up"}
              size={30}
              color={isLoser ? COLORS.RED : COLORS.GREEN}
            />
            <Text style={{
              color: isLoser ? COLORS.RED : COLORS.GREEN,
            }}>
              {currencyFormatter.format(increase, {
                locale: "en-US",
                format: "%v%",
              })}
            </Text>
          </View>
        );
      }
    },
    {
      field: "increase",
      span: 1.3,
      headerName: `Volume(${currentTimeframe?.title})`,
      render: ({ volume }) =>
        currencyFormatter.format(volume, {
          locale: "en-US",
        }),
    },
  ];

  const rightComponent =
    <View style={styles.rightComponent}>     
      <PremiumButton 
        style={{marginRight: 5}}
      />
      <TimeFrameSelecter 
        premium={premium}
        data={timeframes}
        defaultValue={timeframes.find(item => item.value === timeframe)}
        onSelect={({title, value}) => {
          setTimeframe(value);
        }}
      />
    </View>;

  return (
    <Block 
      loading={loading}
      title={ isLoser ? "Top Losers" : "Top Gainers"}
      rightComponent={rightComponent}
    >
      <Table columns={columns} data={loading ? [] : data ? data.topGainers : []} />
    </Block>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  iconButtons: {
    marginRight: 2,
    marginLeft: 1,
  },
  nameSymbol: {
    flexDirection: "column",
  },
  text: {
    color: COLORS.WHITE,
  },
  symbol: {
    color: COLORS.GRAY,
  },
  incDec: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: 'wrap',
  },
  rightComponent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
})
export default TopGainersAndLosers;
