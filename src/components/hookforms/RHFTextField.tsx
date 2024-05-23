/*
 * Created by Suastika Adinata on Tue Apr 30 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { ComponentProps, ReactNode } from "react";
import { Input } from '@rneui/themed';
import { Controller, useFormContext } from "react-hook-form";
import { colors } from "../../styles/colors";
import Stack from "../Stack";
import Typography from "../Typography";
import { TouchableOpacity } from "react-native";

interface Props {
    name: string;
    helperText?: string;
    readOnly?: boolean;
    title?: string;
    required?: boolean;
    isClickable?: boolean;
    onPress?: () => void;
    children?: ReactNode;
}

export default function RHFTextField({ name, helperText, readOnly, title, required, isClickable, onPress,...props }: Props & ComponentProps<typeof Input>) {
  const { control } = useFormContext();

  return <Controller
    control={control}
    name={name}
    render={({ field: { onChange, onBlur, value }, fieldState }) => {
      return (
      <Stack>
        { title && 
          <Stack direction="row" pb={8} style={{ flexWrap: 'wrap' }}> 
            <Typography textStyle={{ fontWeight: 700, color: colors.neutral.neutral_90 }}>{title}</Typography>
            { required && <Typography textStyle={{ fontWeight: 700, color: colors.danger.main }}> *</Typography> }
          </Stack> }
      { isClickable ? 
       <TouchableOpacity delayPressIn={0} onPress={onPress}>
           <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={fieldState.error != undefined ? fieldState.error?.message : helperText}
            inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 8
            }}
            disabledInputStyle={{ color: colors.neutral.neutral_90, opacity: 1 }}
            inputStyle={{ fontFamily: "Poppins-Regular", color: colors.neutral.neutral_90 }}
            containerStyle={{ paddingHorizontal: 0 }}
            {...props}
          /> 
        </TouchableOpacity>
        : 
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={fieldState.error != undefined ? fieldState.error?.message : helperText}
            inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 8
            }}
            inputStyle={{ fontFamily: "Poppins-Regular", color: colors.neutral.neutral_90 }}
            containerStyle={{ paddingHorizontal: 0 }}
            {...props}
          /> 
        }
      </Stack>
      )
    }}
  />;
}
