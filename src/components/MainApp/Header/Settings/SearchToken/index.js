import React from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { setToken } from "actions/current";
import FadeModal from "components/FadeModal";
import SymbolFinder from "components/SymbolFinder";
import Block from "elements/Block";
import BigButton from "elements/BigButton";

const SearchToken = ({ onClose: closeParent }) => {
  const dispatch = useDispatch();
  return (
    <FadeModal
      handler={(onOpen) => (
        <Block noPadding noIndicator>
          <BigButton icon={{ name: "search" }} onPress={onOpen}>
            Search New Token
          </BigButton>
        </Block>
      )}
      style={styles.modal}
    >
      {(onClose) => (
        <SymbolFinder
          setCurrency={(currency) => {
            dispatch(setToken(currency));
            onClose();
            closeParent();
          }}
        />
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
});

export default SearchToken;
