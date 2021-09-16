import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import currencyFormatter from "currency-formatter";
import humanizeDuration from "humanize-duration";
import { useLazyQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import moment from "moment";
import { kilomega } from "kilomega";

import Table from "components/Table";
import COLORS from "constants/colors";
import Block from "elements/Block";
import Icon from "elements/Icon";
import { TRADES } from "queries/history";

let interval = null;

function formatAmount(amount) {
  const amountFormated = kilomega(amount);
  return `${currencyFormatter.format(amountFormated.amount, {
    locale: "en-US",
    format: "%v",
  })}${amountFormated.symbol || ""}`;
}

const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: "shortEn",
  languages: {
    shortEn: {
      y: () => "y",
      mo: () => "mo",
      w: () => "w",
      d: () => "d",
      h: () => "h",
      m: () => "m",
      s: () => "s",
      ms: () => "ms",
    },
  },
});

const generateColumns = (symbol, qSymbol) => [
  {
    headerName: "",
    field: "side",
    span: 0.1,
    render: ({ side }) =>
      side === "SELL" ? (
        <Icon
          name="caret-left"
          type="fa"
          style={[styles.sell, { fontSize: 35 }]}
        />
      ) : (
        <Icon
          name="caret-left"
          type="fa"
          style={[styles.buy, { fontSize: 35 }]}
        />
      ),
  },
  {
    field: "amount",
    headerName: "Amount",
    style: { textAlign: "center" },
    span: 3,
    render: ({ side, buyAmount, sellAmount }) => {
      const quoteSymbol = qSymbol || (symbol === "BNB" ? "USD" : "BNB");
      return (
        <View style={styles.amountItemWrapper}>
          <View style={styles.amountItem}>
            <Text style={[styles.amount, styles[side.toLowerCase()]]}>
              {formatAmount(buyAmount)}
            </Text>
            <Text style={[styles.symbol]}>
              {side === "BUY" ? symbol : quoteSymbol}
            </Text>
          </View>
          <View style={styles.amountItem}>
            <Text style={[styles.amount, styles[side.toLowerCase()]]}>
              {formatAmount(sellAmount)}
            </Text>
            <Text style={[styles.symbol]}>
              {side === "BUY" ? quoteSymbol : symbol}
            </Text>
          </View>
        </View>
      );
    },
  },
  {
    field: "amountInUSD",
    headerName: "Value",
    textStyle: () => styles.amountInUSD,
    render: ({ amountInUSD, side, buyAmount, sellAmount }) =>
      currencyFormatter.format(
        symbol === "BNB"
          ? side === "BUY"
            ? sellAmount
            : buyAmount
          : amountInUSD,
        {
          locale: "en-US",
        }
      ),
  },
  {
    field: "time",
    headerName: "Time",
    textStyle: () => styles.time,
    render: ({ time }) =>
      `${shortEnglishHumanizer(
        (moment.utc(time).unix() - moment().unix()) * 1000,
        {
          largest: 1,
          round: true,
          spacer: "",
        }
      )} ago`,
  },
];

const TradeHistory = ({ 
  currency = {}, 
  quoteCurrency = {}, 
  currencySymbol,
  quoteAddress,
  quoteSymbol,
}) => {
  const { address, symbol,  } = currency;
  const premium = useSelector((state) => state.account?.lp?.premium);
  const globalCurrency = useSelector((state) => state.favorites?.globalCurrency);
  const wallet = useSelector((state) => state.currenct?.walletAddress);
  const limit = premium ? 50 : 5;
  const [showMyWallet, setShowMyWallet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const network = useSelector((state) => state.favorites?.network);
  const [getTrades] = useLazyQuery(TRADES, {
    fetchPolicy: "network-only",
    variables: {
      address,
      quoteAddress,
      currency: currencySymbol,
      wallet: showMyWallet ? wallet?.address : undefined,
      limit,
    },
    onCompleted: (data) => {
      setLoading(false);
      setData(data);
      console.log('>>get treads???>>', data.trades?.length);
    },
    onError: (error) => {
      console.log(error)
      setLoading(false);
    },
  });

  useEffect(() => {
    if (!address && !quoteAddress) {
      return;
    }
    console.log(currency);
    setLoading(true);
    console.log('getTreades>>>>', address, quoteAddress, currencySymbol, showMyWallet ? wallet?.address : undefined, limit,);
    getTrades();
    interval = setInterval(() => {
      getTrades();
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [currency]);
  
  const columns = generateColumns(currency?.symbol, quoteCurrency?.symbol);

  return (
    <Block style={styles.container} loading={loading} title="Trade History">
      <Table columns={columns} data={data?.trades} />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  amountItemWrapper: {},
  amountItem: {
    flexDirection: "row",
  },
  amount: {
    marginRight: 3,
    textAlign: "right",
    flex: 1,
    fontWeight: "bold",
  },
  symbol: {
    flex: 1,
    color: COLORS.GRAY,
  },
  sell: {
    color: COLORS.GREEN,
  },
  buy: {
    color: COLORS.RED,
  },
  amountInUSD: {
    color: COLORS.WHITE,
  },
  time: {
    color: COLORS.YELLOW,
  },
});

export default TradeHistory;
