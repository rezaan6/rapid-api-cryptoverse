import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
