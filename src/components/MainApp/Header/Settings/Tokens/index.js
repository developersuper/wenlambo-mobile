import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Table from "components/Table";
import FadeModal from "components/FadeModal";
import Block from "elements/Block";
import BigButton from "elements/BigButton";
import IconButton from "elements/IconButton";
import COLORS from "constants/colors";

import AddToken from "./AddToken";

const Tokens = ({ onClose: closeParent }) => {
  const dispatch = useDispatch();
  const tokens = useSelector((state) => state.favorites?.tokens) || [];

  const columns = [
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "symbol",
      headerName: "Symbol",
    },
    {
      field: "address",
      headerName: "Address",
    },
    {
      headerName: "",
      render: (token) => {
       return (
        <View style={styles.iconButtons}>
          <IconButton 
            style={styles.iconButton}
            icon={{ 
              name: "delete", 
              type: "material",
              size: 20, 
            }}
          />
        </View>
       );
      }
    }
  ];

  return (
    <FadeModal
      handler={(onOpen) => (
        <Block noPadding noIndicator>
          <BigButton
            icon={{
              name: "diamond-stone",
              type: "mc",
              color: COLORS.DIAMOND,
            }}
            onPress={onOpen}
          >
            Tokens
          </BigButton>
        </Block>
      )}
      style={styles.modal}
    >
      {(onClose) => (
        <Block noIndicator>
          <AddToken />
          <View style={styles.table}>
            <Table 
              columns={columns} 
              data={tokens} 
              onPressRow={({name, symbol, address}) => {
              }}
            />
          </View>
        </Block>
      )}
    </FadeModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-start",
    paddingTop: 100,
    paddingBottom: 100,
  },
  input: {
    marginBottom: 10,
  },
  table: {
    backgroundColor: COLORS.BLACK,
    padding: 20,
    borderRadius: 5,
  },
  iconButtons: {
    flexDirection: "row",
    justifyContent: "center"
  },
  iconButton: {
    marginRight: 3,
    marginLeft: 3,
  }
});

export default Tokens;
