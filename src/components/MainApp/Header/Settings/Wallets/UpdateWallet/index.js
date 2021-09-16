import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux"; 

import { updateWallet } from "actions/favorites";
import FadeModal from "components/FadeModal";
import TextInput from "elements/TextInput";
import IconButton from "elements/IconButton";
import Button from "elements/Button";

const UpdateWallet = ({ iconButtonStyle, wallet }) => {
  const dispatch = useDispatch();
  const [alias, setAlias] = useState(wallet.alias);

  return (
    <FadeModal
      handler={(onOpen) => (
        <IconButton 
          style={iconButtonStyle}
          icon={{ 
            name: "create", 
            type: "material",
            size: 20, 
          }}
          onPress={onOpen}
        />
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
            value={wallet.address}
            placeholder="Wallet Address"
            style={styles.input}
            editable={false}
          />
          <Button
            onPress={() => {
              dispatch(updateWallet({alias, address: wallet.address}));
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

export default UpdateWallet;