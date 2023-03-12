import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

// Create the Redux store with two slices: one for crypto data and one for crypto news
const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer, // the cryptoApi slice
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer, // the cryptoNewsApi slice
  },
  // Add middleware to the store that includes both the cryptoApi and cryptoNewsApi middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware),
});

// Set up listeners for all query APIs used in the store
setupListeners(store.dispatch);

export default store;
