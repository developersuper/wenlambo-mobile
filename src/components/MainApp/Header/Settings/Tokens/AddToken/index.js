import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux"; 

import { addToken } from "actions/favorites";
import SymbolFinder from "components/SymbolFinder";
import FadeModal from "components/FadeModal";
import Button from "elements/Button";
import COLORS from "constants/colors";

const AddToken = () => {
  const dispatch = useDispatch();

  return (
    <FadeModal
      handler={(onOpen) => (
        <Button 
          fontSize={14}
          backgroundColor={COLORS.PRIMARY}
          style={styles.button}
          onPress={onOpen}
        >
          ADD TOKEN
        </Button>
        )}
      style={styles.modal}
    >
      {(onClose) => (
        <SymbolFinder
          setCurrency={(currency) => {
            dispatch(addToken(currency));
            onClose();
          }}
        />
      )}
  </FadeModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-start",
    paddingTop: 100,
    paddingBottom: 100,
  },
  button: {
      width: 180,
      alignSelf: "flex-end",
      marginBottom: 20,
  },
  input: {
    marginBottom: 19,
  }
})

export default AddToken;