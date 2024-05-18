/*
 * Created by Suastika Adinata on Sat May 18 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useEffect, useLayoutEffect } from "react";
import Page from "../components/Page";
import Stack from "../components/Stack";
import { NavigateProps } from "../entities/GlobalProps";
import { colors } from "../styles/colors";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { Surface } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import useEditAccountViewController from "../view-controller/useEditAccountViewController";
import { FormProvider } from "react-hook-form";
import RHFTextField from "../components/hookforms/RHFTextField";
import DatePicker from "react-native-date-picker";
import { Keyboard } from "react-native";

export default function EditAccountView({ navigation }: NavigateProps){
    const { t } = useTranslation();
    const { 
        method, 
        isLoadingForm, 
        birthdate, 
        isOpenBirtdatePicker, 
        onOpenBirtdatePicker, 
        onCloseBirtdatePicker, 
        onChangeBirthdate, 
        onOpenGenderPicker,
        fetchUserDetail,
        doSubmitFormUpdate 
    } = useEditAccountViewController();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: t('title.edit_account'),
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: colors.neutral.neutral_10,
            },
            onBackPressed: () => navigation.goBack(),
        })
    }, [navigation])

    useEffect(() => {
        fetchUserDetail()
    }, [])

    const doSubmitForm = async(data: any) => {
        Keyboard.dismiss();
        await doSubmitFormUpdate(data, 
            () => { navigation.goBack() },
            (e: string) => {
                console.log(e);
            }
        )
    }

    const FormView = () =>{
        return(
            <FormProvider {...method}>
                <RHFTextField 
                    name='fullname'
                    title={t('title.fullname')}
                    required
                    placeholder={t('placeholder.fullname')}
                />
                <RHFTextField 
                    name='birthdate'
                    title={t('title.birthdate')}
                    isClickable
                    disabled
                    onPress={() => onOpenBirtdatePicker()}
                    required
                    placeholder={t('placeholder.birthdate')}
                />
                <RHFTextField 
                    name='gender'
                    title={t('title.gender')}
                    required
                    disabled
                    isClickable
                    onPress={() => onOpenGenderPicker()}
                    placeholder={t('placeholder.gender')}
                />
                <RHFTextField 
                    name='username'
                    title={t('title.username')}
                    required
                    disabled
                    placeholder={t('placeholder.username')}
                />
            </FormProvider>
        )
    }

    return(
        <Page bgColor={colors.neutral.neutral_10}>
            <DatePicker
                modal
                open={isOpenBirtdatePicker}
                date={birthdate}
                mode="date"
                onConfirm={(date) => {
                    onCloseBirtdatePicker()
                    onChangeBirthdate(date)
                }}
                onCancel={() => {
                    onCloseBirtdatePicker()
                }}
            />
            <Stack style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
                    <FormView />
                </ScrollView>
                <Surface elevation={4} style={{ padding: 16, backgroundColor: colors.neutral.neutral_10 }}>
                    <CustomButton loading={isLoadingForm} color='primary' title={t('title.edit')} onPress={method.handleSubmit(doSubmitForm, e => console.log(e))}/>
                </Surface>
            </Stack>
        </Page>
    )
}