import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setWalletAddress } from "actions/current";
import { removeWallet } from "actions/favorites";
import Table from "components/Table";
import FadeModal from "components/FadeModal";
import Block from "elements/Block";
import BigButton from "elements/BigButton";
import IconButton from "elements/IconButton";
import COLORS from "constants/colors";

import AddWallet from "./AddWallet";
import UpdateWallet from "./UpdateWallet";

const Wallets = ({ onClose: closeParent }) => {
  const dispatch = useDispatch();
  const wallets = useSelector((state) => state.favorites?.wallets) || [];

  const columns = [
    {
      field: "alias",
      headerName: "Alias",
      render: ({ alias }) => alias,
    },
    {
      field: "address",
      headerName: "Address",
      render: ({ address }) => address,
    },
    {
      headerName: "",
      render: (selectedWallet) => {
       return (
        <View style={styles.iconButtons}>
          <UpdateWallet 
            iconButtonStyle={styles.iconButton}
            wallet={selectedWallet}
          />
          <IconButton 
            style={styles.iconButton}
            icon={{ 
              name: "delete", 
              type: "material",
              size: 20, 
            }}
            onPress={() => {
              dispatch(removeWallet(selectedWallet));
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
            Wallets
          </BigButton>
        </Block>
      )}
      style={styles.modal}
    >
      {(onClose) => (
        <Block noIndicator>
          <AddWallet />
          <View style={styles.table}>
            <Table 
              columns={columns} 
              data={wallets} 
              onPressRow={(selectedWallet) => {
                dispatch(setWalletAddress(selectedWallet.address))
                onClose();
                closeParent();
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
    justifyContent: "center",
  },
  iconButton: {
    marginRight: 3,
    marginLeft: 3,
  }
});

export default Wallets;
