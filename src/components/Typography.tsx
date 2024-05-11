/*
 * Created by Suastika Adinata on Sun Apr 28 2024
 * Copyright (c) 2024 - Made with love
 */

import React from "react";
import { Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import { colors } from "../styles/colors";

interface Props{
    children: React.ReactNode;
    viewStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;   
}

export default function Typography({ children, viewStyle, textStyle }: Props) {
  return <Text style={[{ fontFamily: "Poppins-Regular", fontSize: 14, fontWeight: "normal", color: colors.neutral.neutral_90 }, viewStyle, textStyle ]}>{children}</Text>;
}