/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { forwardRef, ComponentProps, useEffect } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BaseBottomSheet } from './BaseBottomSheet';
import Stack from '../Stack';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider } from 'react-hook-form';
import RHFTextField from '../hookforms/RHFTextField';
import { useTranslation } from 'react-i18next';
import CustomButton from '../CustomButton';
import Typography from '../Typography';
import { colors } from '../../styles/colors';
import { CategoryItem } from '../../entities/Category';

interface Props{
    isAdd: boolean;
    isEdit?: boolean;
    initialData?: CategoryItem;
    onSubmit: (data: CategoryItem) => void;
}

export const CategoryBottomSheet = forwardRef(({ isAdd, isEdit, initialData, onSubmit, ...props }: Props & ComponentProps<typeof RBSheet>, ref) => {
    const { t } = useTranslation();
    
    const schema = yup.object({
		name: yup.string().required().label(t('title.name')),
        budget: yup.number().required().label(t('title.budget'))
	}).required();
	
	const defaultValues = {
		name: "",
        budget: 0
	};
	
	const method = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	});

    useEffect(() => {
        if(isEdit && initialData){
            method.setValue('name', initialData.name)
            method.setValue('budget', `${initialData.budget}`)
        }else{
            method.reset()
            method.clearErrors("name")
        }
    }, [isEdit, initialData])

    const onSubmitForm = async(data: any) => {
        onSubmit({
            name: data.name,
            budget: data.budget
        })
    }
    
    return(
        <BaseBottomSheet ref={ref} {...props}>
            <Stack p={16}>
                <Typography textStyle={{ fontSize: 18, fontWeight: 700, color: colors.neutral.neutral_90 }} viewStyle={{ marginBottom: 16 }}>{isEdit ? t('title.edit_category') : t('title.add_category')}</Typography>
                <FormProvider {...method}>
                    <RHFTextField
                        name={"name"}
                        title={t('title.name')}
                        required
                        placeholder={t('placeholder.name')}
                    />
                    <RHFTextField
                        name={"budget"}
                        title={t('title.budget')}
                        required
                        placeholder={t('placeholder.budget')}
                        inputMode='numeric'
                        keyboardType='number-pad'
                    />
               </FormProvider>
               <Stack mt={24}>
                    <CustomButton 
                        title={isEdit ? t('title.edit') : t('title.add')}
                        color={'primary'}
                        onPress={method.handleSubmit(onSubmitForm, e => console.log(e))}
                    />
               </Stack>
            </Stack>
        </BaseBottomSheet>
    )
})