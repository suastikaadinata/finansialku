/*
 * Created by Suastika Adinata on Wed May 15 2024
 * Copyright (c) 2024 - Made with love
 */

import { createStore, combineReducers } from 'redux'
import { persistReducer, persistStore } from "redux-persist";
import authReducer from '../reducer/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
};

export const rootReducer = combineReducers({
	authReducer: persistReducer(persistConfig, authReducer),
});

export const store = createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);