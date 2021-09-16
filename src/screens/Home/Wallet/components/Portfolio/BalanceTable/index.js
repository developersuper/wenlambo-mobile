import React from "react";
import { StyleSheet, View } from "react-native";
import currencyFormatter from "currency-formatter";
import { useSelector, useDispatch } from "react-redux";

import { updateBlackList, addToken, removeToken } from "actions/favorites";
import IconButton from "elements/IconButton";
import COLORS from "constants/colors";

import Table from "components/Table";
import FavoriteButton from "../../../../../../components/FavoriteButton";

const BalanceTable = ({ balances, showBlackList }) => {
  const blackList = useSelector((state) => state.favorites?.blackList || []);
  const dispatch = useDispatch();

  const tokens = useSelector((state) => state.favorites?.tokens) || [];
  const network = useSelector((state) => state.favorites?.network) || "bsc";
  const columns = [
    {
      headerName: "",
      span: 0.2,
      render: (currency) => {
        return blackList.includes(currency.id || currency.address) ? (
          ""
        ) : (<FavoriteButton currency={currency}/>);
      }
    },
    {
      field: "name-price",
      headerName: "Name / Price",
      render: ({ name, price }) =>
        `${name}\n${currencyFormatter.format(price, {
          locale: "en-US",
          precision: Math.min((`${price}`.split(".")[1] || "0").length, 18),
        })}`,
    },
    {
      field: "holdings-value",
      headerName: "Holdings / Value",
      render: ({ value, holdings }) =>
        `${currencyFormatter.format(holdings, {
          locale: "en-US",
          format: "%v",
        })}\n${currencyFormatter.format(value, {
          locale: "en-US",
        })}`,
    },
    {
      headerName: "",
      span: 0.2,
      render: (currency) => {
        const address = currency.id || currency.address;
        return (
          <View style={styles.iconButton}>
            {!showBlackList && <IconButton 
              style={styles.iconButtons}
              icon={{ 
                name: "delete", 
                type: "material",
                size: 20, 
              }}
              onPress={() => {
                dispatch(updateBlackList([...blackList, address]));
              }}
            />}
            {showBlackList && <IconButton 
              style={styles.iconButtons}
              icon={{ 
                name: "undo", 
                type: "material",
                size: 20, 
              }}
              onPress={() => {
                dispatch(updateBlackList(blackList.filter((item) => item !== address)));
              }}
            />}
          </View>
        );
      }
    }
  ];
  return <Table columns={columns} data={balances || []} />;
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
  }
})
export default BalanceTable;
