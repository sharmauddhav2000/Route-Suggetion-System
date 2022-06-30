import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FlUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});
let persistor = persistStore(store);

export { store, persistor };
