/*
 * Created by Suastika Adinata on Sun May 12 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { ComponentProps, forwardRef, useState } from 'react';
import { BaseBottomSheet } from './BaseBottomSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import Stack from './Stack';
import Typography from './Typography';
import { colors } from '../styles/colors';
import { useTranslation } from 'react-i18next';
import SelectItemView from './SelectItemView';
import { GenderItem } from '../entities/Gender';
import Constants from '../data/Constants';

export const GenderBottomSheet = forwardRef(({selectedGender, onSelected, ...props}: {selectedGender: string, rops?: ComponentProps<typeof RBSheet>, onSelected: (value: string) => void}, ref) => {
    const { t } = useTranslation();
    const genderData: GenderItem[] = [
        { value: Constants.GENDER.MALE, title: t("male") },
        { value: Constants.GENDER.FEMALE, title: t("female")}
    ]

    return(
        <BaseBottomSheet ref={ref} {...props}>
            <Stack p={16}>
                <Typography viewStyle={{ marginBottom: 8 }} textStyle={{ fontSize: 16, fontWeight: 700, color: colors.neutral.neutral_90 }}>{t('select_gender')}</Typography>
                <SelectItemView onPress={() => onSelected(genderData[0].value)} isDivider={true} isSelected={selectedGender == genderData[0].value} title={genderData[0].title}/>
                <SelectItemView onPress={() => onSelected(genderData[1].value)} isDivider={false} isSelected={selectedGender == genderData[1].value} title={genderData[1].title}/>
            </Stack>
        </BaseBottomSheet>
    )
})