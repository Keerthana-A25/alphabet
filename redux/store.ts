import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reduxStore = () => {
  const store = configureStore({ 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
        immutableCheck: {
          // Ignore mutation checks for specific paths if needed
          ignoredPaths: ['reportState.heatmapKeys'],
        },
      }),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export default reduxStore;
