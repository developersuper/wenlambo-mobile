import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { setWalletAddress } from "actions/current";
import FadeModal from "components/FadeModal";
import Block from "elements/Block";
import TextInput from "elements/TextInput";
import BigButton from "elements/BigButton";
import Button from "elements/Button";

const OtherWallet = ({ onClose: closeParent }) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState();
  return (
    <FadeModal
      handler={(onOpen) => (
        <Block noPadding noIndicator>
          <BigButton
            icon={{ name: "wallet-outline", type: "ion" }}
            onPress={onOpen}
          >
            Other Wallet
          </BigButton>
        </Block>
      )}
      style={styles.modal}
    >
      {(onClose) => (
        <>
          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
            placeholder="Wallet Address"
            style={styles.input}
          />
          <Button
            onPress={() => {
              dispatch(setWalletAddress(address));
              onClose();
              closeParent();
            }}
            size="small"
          >
            Ok
          </Button>
        </>
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
});

export default OtherWallet;
