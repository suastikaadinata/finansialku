/*
 * Created by Suastika Adinata on Sun Apr 28 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider, createTheme } from '@rneui/themed';
import { colors } from './src/styles/colors';
import './src/locales/locales';
import i18n from './src/locales/locales';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store/store';
import { PersistGate } from "redux-persist/integration/react";
import AppNavigation from './src/view/AppNavigation';
import { BottomSheetProvider } from './src/provider/BottomSheetProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from './src/data/Constants';

const theme = createTheme({
  lightColors: {
    primary:  colors.primary.main,
    secondary: colors.secondary.main,
    error: colors.danger.main,
  },
  darkColors: {
    primary:  colors.primary.main,
    secondary: colors.secondary.main,
    error: colors.danger.main,
  },
  mode: 'light'
});

function App() {
  useEffect(() => {
    AsyncStorage.getItem(Constants.USER_LANGUAGE).then((data) => {
      i18n.changeLanguage(data ?? 'en');
    })
  }, [])

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <BottomSheetProvider>
              <AppNavigation />
            </BottomSheetProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
