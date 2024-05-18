/*
 * Created by Suastika Adinata on Sat May 18 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useLayoutEffect } from 'react';
import Page from '../components/Page';
import Stack from '../components/Stack';
import { colors } from '../styles/colors';
import useEditPasswordViewController from '../view-controller/useEditPasswordViewController';
import { useTranslation } from 'react-i18next';
import { Keyboard, ScrollView } from 'react-native';
import { FormProvider } from 'react-hook-form';
import RHFPasswordField from '../components/hookforms/RHFPasswordField';
import { Surface } from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import { NavigateProps } from '../entities/GlobalProps';

export default function EditPasswordView({ navigation }: NavigateProps){
    const { t } = useTranslation();
    const { method, isLoadingForm, onSubmitFormUpdate } = useEditPasswordViewController();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: t('title.edit_password'),
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: colors.neutral.neutral_10,
            },
            onBackPressed: () => navigation.goBack(),
        })
    }, [navigation])

    const onSubmitForm = async(data: any) => {
        Keyboard.dismiss();
        await onSubmitFormUpdate(data, () => {
            navigation.goBack()
        }, (e: any) => {
            console.log(e)
        })
    } 

    const FormView = () => {
        return(
            <FormProvider {...method}>
                <RHFPasswordField
                    name='oldPassword'
                    title={t('title.old_password')}
                    required
                    placeholder={t('placeholder.old_password')}
                />
                <RHFPasswordField
                    name='newPassword'
                    title={t('title.new_password')}
                    required
                    placeholder={t('placeholder.new_password')}
                />
                <RHFPasswordField
                    name='newPasswordConfirmation'
                    title={t('title.new_password_confirmation')}
                    required
                    placeholder={t('placeholder.new_password_confirmation')}
                />
            </FormProvider>
        )
    }

    return(
        <Page bgColor={colors.neutral.neutral_10}>
            <Stack style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
                    <FormView />
                </ScrollView>
                <Surface elevation={4} style={{ padding: 16, backgroundColor: colors.neutral.neutral_10 }}>
                    <CustomButton loading={isLoadingForm} color='primary' title={t('title.edit')} onPress={method.handleSubmit(onSubmitForm, e => console.log(e))}/>
                </Surface>
            </Stack>
        </Page>
    )
}