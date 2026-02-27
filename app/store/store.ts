"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";

const authPersistConfig = {
    key: "auth",
    storage: storage,
    whitelist: ["user", "isAuthenticated"],
};

const uiPersistConfig = {
    key: "ui",
    storage: sessionStorage,
};

const cartPersistConfig = {
    key: "cart",
    storage: storage,
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    ui: persistReducer(uiPersistConfig, uiReducer),
    products: productsReducer,
    cart: persistReducer(cartPersistConfig, cartReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
