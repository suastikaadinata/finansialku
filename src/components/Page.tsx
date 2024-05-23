/*
 * Created by Suastika Adinata on Sun Apr 28 2024
 * Copyright (c) 2024 - Made with love
 */

import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

interface Props {
  children: React.ReactNode;
  statusBarColor?: string;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
}

export default function Page({
  children,
  statusBarColor,
  bgColor,
  styles,
}: Props) {

  return (
    <SafeAreaView
      style={[{flex: 1}, bgColor ? {backgroundColor: bgColor} : {}, styles]}>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
          keyboardVerticalOffset={getStatusBarHeight()}
          behavior={'padding'}
          style={{flex: 1}}>
          {children}
        </KeyboardAvoidingView>
      ) : (
        <>{children}</>
      )}
    </SafeAreaView>
  );
}
