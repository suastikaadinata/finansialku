/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useLayoutEffect, useEffect } from 'react';
import Page from '../components/Page';
import { colors } from '../styles/colors';
import Stack from '../components/Stack';
import { Keyboard, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useTranslation } from 'react-i18next';
import { NavigateProps } from '../model/GlobalProps';
import useAddTransactionController from '../view-controller/useAddTransactionController';
import { FormProvider } from 'react-hook-form';
import RHFTextField from '../components/hookforms/RHFTextField';
import DatePicker from 'react-native-date-picker';

export default function AddTransactionView({ navigation, route }: NavigateProps){
    const { onGoBack, isEdit, initialData } = route.params
    const { t } = useTranslation();
    const { 
        method, 
        date,
        categories, 
        isOpenDatePicker,
        isLoadingForm,
        onOpenDatePicker,
        onCloseDatePicker,
        onChangeDate,
        onOpenSelectCategoryBS,
        onOpenTypeTransactionBS, 
        fetchCategories,
        onSubmitTransaction,
        setInitialFormData,
    } = useAddTransactionController()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: isEdit ? t('title.edit_transaction') : t('title.add_transaction'),
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: colors.neutral.neutral_10,
            },
            onBackPressed: () => navigation.goBack(),
        })
    }, [navigation])

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if(categories.length > 0 && isEdit && initialData){
            console.log("is edit", initialData)
            setInitialFormData(initialData)
        }
    }, [categories, isEdit, initialData])

    const onSubmitForm = async(data: any) => {
        Keyboard.dismiss();
        onSubmitTransaction(data, onGoBack, isEdit, initialData?.id)
    }

    const FormView = () => {
        return(
            <FormProvider {...method}>
                <RHFTextField 
                    name="type"
                    title={t('title.type_transaction')}
                    required
                    disabled
                    isClickable
                    onPress={onOpenTypeTransactionBS}
                    placeholder={t('placeholder.type_transaction')}
                />
                <RHFTextField 
                    name="name"
                    title={t('title.name_transaction')}
                    required
                    placeholder={t('placeholder.name_transaction')}
                />
                <RHFTextField 
                    name="description"
                    title={t('title.description')}
                    required
                    placeholder={t('placeholder.description')}
                />
                <RHFTextField 
                    name="amount"
                    title={t('title.amount')}
                    required
                    inputMode='numeric'
                    keyboardType='number-pad'
                    placeholder={t('placeholder.amount')}
                />
                <RHFTextField 
                    name="category"
                    title={t('title.category')}
                    required
                    disabled
                    isClickable
                    onPress={onOpenSelectCategoryBS}
                    placeholder={t('placeholder.category')}
                />
                <RHFTextField 
                    name='date'
                    title={t('title.date_transaction')}
                    isClickable
                    disabled
                    onPress={onOpenDatePicker}
                    required
                    placeholder={t('placeholder.date_transaction')}
                />
            </FormProvider>
        )
    }

    return(
        <Page bgColor={colors.neutral.neutral_10}>
            <DatePicker
                modal
                open={isOpenDatePicker}
                date={date}
                mode="date"
                onConfirm={(date) => {
                    onCloseDatePicker()
                    onChangeDate(date)
                }}
                onCancel={() => {
                    onCloseDatePicker()
                }}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
                <FormView />
            </ScrollView>
            <Stack m={16}>
                <CustomButton color={'primary'} title={isEdit ? t('title.edit') : t('title.add')} loading={isLoadingForm} onPress={method.handleSubmit(onSubmitForm, e => console.log(e))}/>
            </Stack>
        </Page>
    )
}