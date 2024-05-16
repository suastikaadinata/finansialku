/*
 * Created by Suastika Adinata on Sun Apr 28 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider, createTheme } from '@rneui/themed';
import { colors } from './src/styles/colors';
import i18n from './src/locales/locales';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store/store';
import { PersistGate } from "redux-persist/integration/react";
import AppNavigation from './src/view/AppNavigation';

const theme = createTheme({
  lightColors: {
    primary:  colors.primary.main,
    secondary: colors.secondary.main,
  },
  darkColors: {
    primary:  colors.primary.main,
    secondary: colors.secondary.main,
  },
  mode: 'light'
});

function App() {
  useEffect(() => {
    i18n.changeLanguage('en');
  }, [])

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppNavigation />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
