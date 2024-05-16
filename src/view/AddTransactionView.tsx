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
import { NavigateProps } from '../entities/GlobalProps';
import useAddTransactionController from '../view-controller/useAddTransactionController';
import { FormProvider } from 'react-hook-form';
import RHFTextField from '../components/hookforms/RHFTextField';
import { SelectItemBottomSheet } from '../components/bottomsheets/SelectItemBottomSheet';
import DatePicker from 'react-native-date-picker';

export default function AddTransactionView({ navigation, route }: NavigateProps){
    const { onGoBack } = route.params
    const { t } = useTranslation();
    const { 
        method, 
        date,
        typeTransactionData,
        typeTransactionRef,
        selectedTypeTransaction, 
        categories, 
        selectCategoryRef, 
        selectedCategory,
        isOpenDatePicker,
        isLoadingForm,
        onOpenDatePicker,
        onCloseDatePicker,
        onChangeDate,
        onSelectedTypeTransaction,
        onOpenSelectCategoryBS,
        onOpenTypeTransactionBS, 
        fetchCategories,
        onSelectedCategory,
        onSubmitTransaction
    } = useAddTransactionController()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: t('title.add_transaction'),
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

    const onSubmitForm = async(data: any) => {
        Keyboard.dismiss();
        await onSubmitTransaction({
            name: data.name,
            amount: data.amount,
        }, 
        () => {
            console.log('success transaction')
            onGoBack(selectedTypeTransaction.id)
        }, (e: any) => {
            console.log(e);
        })
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
            <SelectItemBottomSheet  
                ref={typeTransactionRef} 
                height={190} 
                title={t('placeholder.type_transaction')}
                data={typeTransactionData} 
                selectedItem={selectedTypeTransaction} 
                onSelected={onSelectedTypeTransaction}/>
            <SelectItemBottomSheet  
                ref={selectCategoryRef} 
                height={(75 + (50 * categories.length))} 
                title={t('placeholder.category')}
                data={categories} 
                selectedItem={selectedCategory} 
                onSelected={onSelectedCategory}/>
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
                <CustomButton color={'primary'} title={t('title.add')} loading={isLoadingForm} onPress={method.handleSubmit(onSubmitForm, e => console.log(e))}/>
            </Stack>
        </Page>
    )
}