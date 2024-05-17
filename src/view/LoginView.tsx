/*
 * Created by Suastika Adinata on Sun Apr 28 2024
 * Copyright (c) 2024 - Made with love
 */

import React from 'react';
import Page from '../components/Page';
import Typography from '../components/Typography';
import Stack from '../components/Stack';
import { colors } from '../styles/colors';
import { FormProvider } from 'react-hook-form';
import useLoginViewController from '../view-controller/useLoginViewController';
import RHFTextField from '../components/hookforms/RHFTextField';
import RHFPasswordField from '../components/hookforms/RHFPasswordField';
import CustomButton from '../components/CustomButton';
import { Keyboard, TouchableOpacity } from 'react-native';
import { NavigateProps } from '../entities/GlobalProps';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

export default function LoginView({ navigation }: NavigateProps){
    const { method, isLoadingForm, doSubmitLogin } = useLoginViewController()
    const { t } = useTranslation();

    const doSubmitForm = async(data: any) => {
        Keyboard.dismiss();
        await doSubmitLogin(data, (e) => {
            console.log(e)
        })
    }

    const FormView = () => {
        return(
            <FormProvider {...method}>
                <RHFTextField
                    name={"username"}
                    title={t('title.username')}
                    required
                    placeholder={t('placeholder.username')}
                />
                <RHFPasswordField 
                    name="password"
                    title={t('title.password')}
                    required
                    placeholder={t('placeholder.password')}
                />
            </FormProvider>
        )
    }

    return(
        <Page bgColor='#ffffff'>
            <Stack p={16}>
                <Typography textStyle={{ fontSize: 28, marginTop: 32, color: colors.neutral.neutral_100 }}>
                    {t('title.sign_in_with_your_account')}
                </Typography>
                <Stack mt={16}>
                    <FormView />
                    <Stack mt={24}>
                        <CustomButton color={'primary'} loading={isLoadingForm} title={t('title.sign_in')} onPress={method.handleSubmit(doSubmitForm, e => console.log(e))}/>
                        <CustomButton disabled={isLoadingForm} containerStyle={{ marginTop: 12 }} type='outline' color={'primary'} title={t('title.sign_up')}
                            onPress={() => navigation.navigate("Register")}/>
                    </Stack>
                </Stack>
            </Stack>
        </Page>
    )
}