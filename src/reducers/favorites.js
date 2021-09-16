import { uniqBy } from "lodash";

import {
  ADD_WALLET,
  UPDATE_WALLET,
  REMOVE_WALLET,
  ADD_TOKEN,
  REMOVE_TOKEN,
  UPDATE_BLACKLIST,
  SET_NETWORK,
  SET_GLOBAL_CURRENCY,
} from "constants/actionTypes";

const initialState = {
  wallets: [],
  tokens: [],
  blackList: [],
  network: "bsc",
  globalCurrency: "usd",
};

const favorites = (state = initialState, action) => {
  let newState = state;
  let newWallets, newTokens;
  switch (action.type) {
    case ADD_WALLET:
      newWallets = uniqBy([...state.wallets, action.wallet], "address");
      newState = {
        ...state,
        wallets: newWallets,
      };
      return newState;
    case REMOVE_WALLET:
      newWallets = state.wallets.filter(
        ({ address }) => address !== action.wallet.address
      );
      newState = {
        ...state,
        wallets: newWallets,
      };
      return newState;
    case UPDATE_WALLET:
      newWallets = state.wallets.map(({ address, ...rest }) =>
        address === action.wallet.address ? action.wallet : { address, ...rest }
      );
      newState = {
        ...state,
        wallets: newWallets,
      };
      return newState;
    case ADD_TOKEN:
      newTokens = uniqBy([...state.tokens, action.token], "address");
      newState = {
        ...state,
        tokens: newTokens,
      };
      return newState;
    case REMOVE_TOKEN:
      newTokens = state.tokens.filter(
        ({ address }) => address !== action.token.address
      );
      newState = {
        ...state,
        tokens: newTokens,
      };
      return newState;
    case UPDATE_BLACKLIST:
      const newBlackList = action.blackList;
      newState = {
        ...state,
        blackList: newBlackList,
      };
      return newState;
    case SET_NETWORK:
      newState = {
        ...state,
        network: action.network,
      };
      return newState;
    case SET_GLOBAL_CURRENCY:
      newState = {
        ...state,
        globalCurrency: action.globalCurrency,
      };
      return newState;
    default:
      return newState;
  }
};

export default favorites;
