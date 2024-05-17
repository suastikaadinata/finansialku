/*
 * Created by Suastika Adinata on Fri May 17 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { ComponentProps, forwardRef, useState } from 'react';
import { BaseBottomSheet } from './BaseBottomSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import Stack from '../Stack';
import Typography from '../Typography';
import { colors } from '../../styles/colors';
import { useTranslation } from 'react-i18next';
import SelectItemView from '../SelectItemView';
import { CategoryItem } from '../../entities/Category';
import CustomButton from '../CustomButton';

export const DeleteConfirmationBottomSheet = forwardRef(({title, description, onDelete, onCancel,...props}: {title: string, description: string, onDelete: () => void, onCancel: () => void, props?: ComponentProps<typeof RBSheet>}, ref) => {
    const { t } = useTranslation();

    return(
        <BaseBottomSheet ref={ref} {...props}>
            <Stack p={16} content='center' items='center'>
                <Typography textStyle={{ fontSize: 20, fontWeight: 700, color: colors.neutral.neutral_90 }}>{title}</Typography>
                <Typography viewStyle={{ marginTop: 4 }} textStyle={{ fontSize: 16, color: colors.neutral.neutral_90 }}>{description}</Typography>
                <Stack direction='row' mt={24}>
                    <Stack mr={8} style={{ flex: 1 }}>
                        <CustomButton color={'error'} title={t('title.delete')} onPress={onDelete}/>
                    </Stack>
                    <Stack ml={8} style={{ flex: 1 }}>
                        <CustomButton color={'primary'} title={t('title.cancel')} onPress={onCancel}/>
                    </Stack>
                </Stack>
            </Stack>
        </BaseBottomSheet>
    )
})