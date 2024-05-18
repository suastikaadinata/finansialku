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

export const AlertBottomSheet = forwardRef(({title, description, onSubmit, ...props}: {title?: string, description?: string, onSubmit?: () => void, props?: ComponentProps<typeof RBSheet>}, ref) => {
    const { t } = useTranslation();
    
    return(
        <BaseBottomSheet ref={ref} {...props}>
            <Stack p={16} content='center' items='center'>
                <Typography textStyle={{ fontSize: 16, fontWeight: 700, color: colors.neutral.neutral_90 }}>{title}</Typography>
                <Typography textStyle={{ color: colors.neutral.neutral_80, textAlign: 'center' }} viewStyle={{ marginTop: 8 }}>{description}</Typography>
                <Stack mt={24} style={{ width: '100%' }}>
                    <CustomButton color={'primary'} title={t('title.oke_understand')} onPress={onSubmit}/>
                </Stack>
            </Stack>
        </BaseBottomSheet>
    )
})