import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux"; 

import { addWallet } from "actions/favorites";
import FadeModal from "components/FadeModal";
import TextInput from "elements/TextInput";
import Button from "elements/Button";
import COLORS from "constants/colors";

const AddWallet = () => {
  const dispatch = useDispatch();
  const [alias, setAlias] = useState('');
  const [address, setAddress] = useState('');

  return (
    <FadeModal
      handler={(onOpen) => (
        <Button 
          fontSize={14}
          backgroundColor={COLORS.PRIMARY}
          style={styles.button}
          onPress={onOpen}
        >
          ADD WALLET
        </Button>
        )}
      style={styles.modal}
    >
      {(onClose) => (
        <>
          <TextInput
            value={alias}
            onChangeText={(text) => setAlias(text)}
            placeholder="Alias"
            style={styles.input}
          />
          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
            placeholder="Wallet Address"
            style={styles.input}
          />
          <Button
            onPress={() => {
              if(alias !== '' && address !== '') {
                dispatch(addWallet({ alias, address}));
              }
              onClose();
            }}
            size="small"
          >
            Ok
          </Button>
        </>
      )}
  </FadeModal>
  );
}

const styles = StyleSheet.create({
  button: {
      width: 180,
      alignSelf: "flex-end",
      marginBottom: 20,
  },
  input: {
    marginBottom: 19,
  }
})

export default AddWallet;