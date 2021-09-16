import { combineReducers } from "redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from "redux-persist";

import account from "./account";
import favorites from "./favorites";
import current from "./current";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["favorites"],
  debug: false,
};

export default combineReducers({
  account,
  favorites: persistReducer(persistConfig, favorites),
  current,
});
