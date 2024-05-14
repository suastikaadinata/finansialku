/*
 * Created by Suastika Adinata on Sun Apr 28 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from './src/view/LoginView';
import RegisterView from './src/view/RegisterView';
import MainView from './src/view/MainView';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { colors } from './src/styles/colors';
import i18n from './src/locales/locales';

const Stack = createNativeStackNavigator();

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
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginView}/>
            <Stack.Screen name="Register" component={RegisterView}/>
            <Stack.Screen name="Main" component={MainView}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
