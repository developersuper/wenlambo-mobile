import { 
  SET_TOKEN, 
  SET_WALLET_ADDRESS, 
  SET_CURRENCY,
} from "constants/actionTypes";

const initialState = {
  token: {
    symbol: "(LAMBO)",
    name: "WEN LAMBO",
    id: "0x2c7b396d17e3a5184d4901380836de7a72c5cba4",
    address: "0x2c7b396d17e3a5184d4901380836de7a72c5cba4",
  },
  currency: {},
  walletAddress: "0x7536592bb74b5d62eb82e8b93b17eed4eed9a85c",
};

const current = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case SET_TOKEN:
      newState = {
        ...state,
        token: action.token,
      };
      return newState;
    case SET_WALLET_ADDRESS:
      newState = {
        ...state,
        walletAddress: action.walletAddress,
      };
      return newState;
    case SET_CURRENCY:
      newState = {
        ...state,
        currency: action.currency,
      }
      return newState;
    default:
      return newState;
  }
};

export default current;
