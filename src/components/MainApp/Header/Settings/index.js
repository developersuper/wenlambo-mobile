import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setWalletAddress } from "actions/current";
import COLORS from "constants/colors";
import FadeModal from "components/FadeModal";
import Block from "elements/Block";
import BigButton from "elements/BigButton";
import IconButton from "elements/IconButton";

import OtherWallet from "./OtherWallet";
import SearchToken from "./SearchToken";
import Wallets from "./Wallets";
import Tokens from "./Tokens";

const Settings = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.account?.address);
  return (
    <FadeModal
      handler={(onOpen) => (
        <IconButton icon={{ name: "settings" }} active onPress={onOpen} />
      )}
    >
      {(onClose) => (
        <>
          <SearchToken onClose={onClose} />
          <Block noPadding noIndicator>
            <BigButton 
              icon={{ name: "wallet-outline", type: "ion" }}
              onPress={() => {
                dispatch(setWalletAddress(walletAddress));
                onClose();
              }}
            >
              My Wallet
            </BigButton>
          </Block>
          <OtherWallet onClose={onClose} />
          <Wallets onClose={onClose} />
          <Tokens onClose={onClose} />
        </>
      )}
    </FadeModal>
  );
};

export default Settings;
