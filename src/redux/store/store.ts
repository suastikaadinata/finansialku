/*
 * Created by Suastika Adinata on Wed May 15 2024
 * Copyright (c) 2024 - Made with love
 */

import { createStore, combineReducers } from 'redux'
import { persistReducer, persistStore } from "redux-persist";
import accountReducer from '../reducer/accountReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
};

export const rootReducer = combineReducers({
	accountReducer: persistReducer(persistConfig, accountReducer),
});

export const store = createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);