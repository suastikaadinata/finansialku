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
import { Icon, Button } from '@rneui/themed';
import CustomButton from '../components/CustomButton';
import { TouchableOpacity } from 'react-native';
import { NavigateProps } from '../entities/GlobalProps';
import { useTranslation } from 'react-i18next';

export default function LoginScreen({ navigation }: NavigateProps){
    const { method } = useLoginViewController()
    const { t } = useTranslation();

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
                    name='password'
                    title={t('title.password')}
                    required
                    placeholder={t('placeholder.password')}
                />

                <Stack mt={8} direction='row' style={{ flexWrap: 'wrap' }}>
                    <Typography>{t('forgot_password')} </Typography>
                    <TouchableOpacity>
                        <Typography textStyle={{ color: colors.primary.main, textDecorationColor: 'underline' }}>{t('tap_here')}.</Typography>
                    </TouchableOpacity>
                </Stack>

                <Stack mt={24}>
                    <CustomButton color={'primary'} title={t('title.sign_in')} onPress={() => navigation.navigate("Main")}/>
                    <CustomButton containerStyle={{ marginTop: 12 }} type='outline' color={'primary'} title={t('title.sign_up')}
                        onPress={() => navigation.navigate("Register")}/>
                </Stack>
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
                </Stack>
            </Stack>
        </Page>
    )
}