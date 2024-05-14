/*
 * Created by Suastika Adinata on Tue May 14 2024
 * Copyright (c) 2024 - Made with love
 */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import Stack from './Stack';
import { Divider } from 'react-native-paper';
import Typography from './Typography';
import { colors } from '../styles/colors';

interface Props{
    onPress: () => void;
    isDivider: boolean;
    isSelected: boolean;
    title: string;
}

export default function SelectItemView({ onPress, isDivider, isSelected, title }: Props){
    const CustomRadioView = () => {
        return(
            <Stack items='center' content='center' style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: isSelected ? colors.primary.main : colors.neutral.neutral_60 }}>
                <Stack style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: isSelected ? colors.primary.main : colors.neutral.neutral_60 }}/>
            </Stack>
        )
    }

    return(
        <TouchableOpacity 
            delayPressIn={0}
            onPress={onPress}>
            <Stack direction='row' content='space-between' pt={12} pb={12}>
                <Typography textStyle={{ color: colors.neutral.neutral_90, fontWeight: 600 }} viewStyle={{ alignSelf: 'center' }}>
                    {title}
                </Typography>
                <CustomRadioView />
            </Stack>
            { isDivider ? <Divider /> : null }        
        </TouchableOpacity>
    )
}