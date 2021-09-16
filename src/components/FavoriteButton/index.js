import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import IconButton from "elements/IconButton";
import { addToken, removeToken } from "actions/favorites";
import COLORS from "constants/colors";

const FavoriteButton = ({
  currency = {}, 
  visible = true, 
}) => {

  const dispatch = useDispatch();
  const tokens = useSelector((state) => state.favorites?.tokens) || [];
  const network = useSelector((state) => state.favorites?.network) || "bsc";
  const address = currency.address || currency.id;
  const active = tokens.findIndex((token) => address === token.address) !== -1;
  
  return (
    <View style={styles.iconButton}>
      <IconButton 
        style={styles.iconButtons}
        icon={{ 
          name: "diamond-stone", 
          type: "mc",
          size: 20, 
          color: COLORS.DIAMOND,
        }}
        active={active}
        onPress={() => {
          if (active) {
            dispatch(removeToken({ address }));
          } else {
            dispatch(
              addToken({
                id: address,
                address: address,
                symbol: currency.symbol,
                name: currency.name,
                network,
              })
            );
          }
        }}
      />
    </View>
  )
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
})

export default FavoriteButton;