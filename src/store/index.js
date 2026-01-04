// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';


// const store = configureStore({
//     reducer: {
//         auth: authReducer
//     },
// });

// export default store;



import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { adminApi } from "./services/admin.service";
import { postApi } from "./services/post.service";

const persistConfig = {
  key: "auth",
  storage,
};

const persistAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    auth: persistAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      adminApi.middleware,
      postApi.middleware
    ),
});

export const persistor = persistStore(store);