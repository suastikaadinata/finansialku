/*
 * Created by Suastika Adinata on Fri May 03 2024
 * Copyright (c) 2024 - Made with love
 */

import React from 'react';
import Page from '../components/Page';
import Stack from '../components/Stack';
import Typography from '../components/Typography';
import { colors } from '../styles/colors';
import { FormProvider } from 'react-hook-form';
import useRegisterViewController from '../view-controller/useRegisterViewController';
import RHFTextField from '../components/hookforms/RHFTextField';
import RHFPasswordField from '../components/hookforms/RHFPasswordField';
import CustomButton from '../components/CustomButton';
import { Keyboard, ScrollView } from 'react-native';
import { Surface, IconButton } from 'react-native-paper';
import { NavigateProps } from '../model/GlobalProps';
import DatePicker from 'react-native-date-picker'
import { useTranslation } from 'react-i18next';

export default function RegisterView({ navigation }: NavigateProps){
    const { t } = useTranslation();

    const { 
        isLoadingForm,
        birthdate, 
        isOpenBirtdatePicker, 
        onOpenGenderPicker,
        onChangeBirthdate,
        onOpenBirtdatePicker, 
        onCloseBirtdatePicker,
        method, 
        doRegister 
    } = useRegisterViewController();

    const doSubmitForm = async(data: any) => {
        Keyboard.dismiss();
        await doRegister(data)
    }

    const FormView = () => {
        return(
            <Stack mb={32}>
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
                        placeholder={t('placeholder.username')}
                    />
                    <RHFPasswordField
                        name='password'
                        title={t('title.password')}
                        required
                        placeholder={t('placeholder.password')}
                    />
                    <RHFPasswordField
                        name='passwordConfirmation'
                        title={t('title.password_confirmation')}
                        required
                        placeholder={t('placeholder.password_confirmation')}
                    />
                </FormProvider>
            </Stack>
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
                <Stack ml={8} mt={16}>
                    <IconButton
                        icon="chevron-left"
                        iconColor={colors.neutral.neutral_90}
                        size={24}
                        mode='outlined'
                        onPress={() => navigation.goBack()}
                    />
                </Stack>
                <Typography textStyle={{ fontSize: 28, color: colors.neutral.neutral_100, padding: 16 }}>
                    {t('title.sign_up_your_account')}
                </Typography>
                <Stack style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
                        <FormView />
                    </ScrollView>
                    <Surface elevation={4} style={{ padding: 16, backgroundColor: colors.neutral.neutral_10 }}>
                        <CustomButton loading={isLoadingForm} color='primary' title={t('title.sign_up')} onPress={method.handleSubmit(doSubmitForm, e => console.log(e))}/>
                    </Surface>
                </Stack>
            </Stack>
        </Page>
    )
}