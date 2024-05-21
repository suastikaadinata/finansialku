/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { ComponentProps, forwardRef, useState } from 'react';
import { BaseBottomSheet } from './BaseBottomSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import Stack from '../Stack';
import Typography from '../Typography';
import { colors } from '../../styles/colors';
import SelectItemView from '../SelectItemView';
import { SelectItem } from '../../entities/Select';

export const SelectItemBottomSheet = forwardRef(({title, data, selectedItem, onSelected, ...props}: {title?: string, data?: any[], selectedItem?: any, props?: ComponentProps<typeof RBSheet>, onSelected?: (value: any) => void}, ref) => {
    return(
        <BaseBottomSheet ref={ref} {...props}>
            <Stack p={16}>
                <Typography viewStyle={{ marginBottom: 8 }} textStyle={{ fontSize: 16, fontWeight: 700, color: colors.neutral.neutral_90 }}>{title}</Typography>
                <Stack>
                    { data?.map((item, index) => (
                      <SelectItemView key={index} onPress={() => onSelected!(item)} isDivider={index < data.length - 1} isSelected={selectedItem?.id == item.id} title={item.name}/>  
                    ))}
                </Stack>
            </Stack>
        </BaseBottomSheet>
    )
})