/*
 * Created by Suastika Adinata on Sat May 18 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { ComponentProps, forwardRef, useState } from 'react';
import { BaseBottomSheet } from './BaseBottomSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import Stack from '../Stack';
import Typography from '../Typography';
import { colors } from '../../styles/colors';
import CustomButton from '../CustomButton';
import { useTranslation } from 'react-i18next';

interface Props{
    title?: string;
    description?: string;
    color?: string;
    onSubmit?: () => void;
    btnTitle?: string;
}

export const AlertBottomSheet = forwardRef(({title, description, color = 'primary', btnTitle, onSubmit, ...props}: Props & ComponentProps<typeof RBSheet>, ref) => {
    const { t } = useTranslation();
    
    return(
        <BaseBottomSheet ref={ref} {...props}>
            <Stack p={16} content='center' items='center'>
                <Typography textStyle={{ fontSize: 16, fontWeight: 700, color: colors.neutral.neutral_90 }}>{title}</Typography>
                <Typography textStyle={{ color: colors.neutral.neutral_80, textAlign: 'center' }} viewStyle={{ marginTop: 8 }}>{description}</Typography>
                <Stack mt={24} style={{ width: '100%' }}>
                    <CustomButton color={color} title={btnTitle ?? t('title.oke_understand')} onPress={onSubmit}/>
                </Stack>
            </Stack>
        </BaseBottomSheet>
    )
})