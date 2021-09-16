import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { compact, orderBy } from "lodash";

import COLORS from "constants/colors";
import TextInput from "elements/TextInput";
import { tokens } from "queries/history";

const SymbolFinder = ({
  currency,
  setCurrency,
  title = "Search Symbol",
  base = "",
  quote = "",
  groupBy,
}) => {
  const [symbol, setSymbol] = useState(currency ? currency?.address : "");
  const [currencies, setCurrencies] = useState(null);
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getCurrencies = async () => {
      if (symbol && symbol.length > 1) {
        setLoading(true);
        const allTokens = await tokens({ search: symbol, base, quote });
        setLoading(false);
        setCurrencies(allTokens);
      }
    };
    getCurrencies();
  }, [symbol]);
  const options = orderBy(
    currencies?.length ? currencies : currency ? [currency] : [],
    [(o) => o.count > 0],
    ["desc"]
  );
  return (
    <View 
      style={styles.container}
    >
      <TextInput
        value={symbol}
        onChangeText={(text) => setSymbol(text)}
        placeholder={title}
        onFocus={() => {
          setShowList(true);
        }}
      />
      {loading && 
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      }
      { showList && !loading &&
        <View style={styles.listView}>
          <ScrollView style={styles.list}>
            {options.map(({ name, symbol, address }, index) => (
              <TouchableOpacity
                key={address}
                onPress={() =>{
                  setCurrency({ name, symbol, address, id: address })
                  setSymbol(address);
                  setShowList(false);
                }}
              >
                <Text
                  style={compact([
                    styles.listItem,
                    index % 2 === 0 && styles.listItemEven,
                  ])}
                >
                  {name} - {symbol} {address}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  listView: {
    marginTop: 10,
    maxHeight: 300,
  },
  list: {
    width: "100%",
  },
  listItem: {
    color: COLORS.WHITE,
    padding: 10,
  },
  listItemEven: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export default SymbolFinder;
