/*
 * Created by Suastika Adinata on Thu May 02 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { ComponentProps, useState } from "react";
import { Input, Icon } from '@rneui/themed';
import { Controller, useFormContext } from "react-hook-form";
import { colors } from "../../styles/colors";
import Stack from "../Stack";
import Typography from "../Typography";

interface Props {
    name: string;
    helperText?: string;
    readOnly?: boolean;
    title?: string;
    required?: boolean;
}

export default function RHFPasswordField({ name, helperText, readOnly, title, required,...props }: Props & ComponentProps<typeof Input>) {
const [showPassword, setShowPassword] = useState(false);
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
        <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={fieldState.error != undefined ? fieldState.error?.message : helperText}
            labelStyle={{ marginBottom: 4, color: colors.neutral.neutral_90 }}
            secureTextEntry={!showPassword}
            inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 8
            }}
            inputStyle={{ fontFamily: "Poppins-Regular" }}
            containerStyle={{ paddingHorizontal: 0 }}
            rightIcon={
                <Icon
                  type="ionicon"
                  name={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
            }
            {...props}
          /> 
        </Stack> 
      )
    }}
  />;
}
