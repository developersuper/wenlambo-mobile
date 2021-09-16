import { 
  SET_TOKEN, 
  SET_WALLET_ADDRESS,
  SET_CURRENCY,
} from "constants/actionTypes";

export const setToken = (token) => {
  return { type: SET_TOKEN, token };
};

export const setWalletAddress = (walletAddress) => {
  return { type: SET_WALLET_ADDRESS, walletAddress };
};

export const setCurrency = (currency) => {
  return { type: SET_CURRENCY, currency};
}