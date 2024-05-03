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
import { ScrollView } from 'react-native';
import { Surface, IconButton } from 'react-native-paper';
import { NavigateProps } from '../entities/GlobalProps';

export default function RegisterScreen({ navigation }: NavigateProps){
    const { method } = useRegisterViewController();

    return(
        <Page bgColor='#ffffff'>
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
                    Sign up your account
                </Typography>
                <Stack style={{ flex: 1 }}>
                    <ScrollView style={{ flexGrow: 1, padding: 16 }}>
                        <FormProvider {...method}>
                            <RHFTextField 
                                name='fullname'
                                title='Fullname'
                                required
                                placeholder='Enter your fullname'
                            />
                            <RHFTextField 
                                name='birthdate'
                                title='Birthdate'
                                required
                                placeholder='Enter your birthdate'
                            />
                            <RHFTextField 
                                name='gender'
                                title='Gender'
                                required
                                placeholder='Enter your gender'
                            />
                            <RHFTextField 
                                name='username'
                                title='Username'
                                required
                                placeholder='Enter your username'
                            />
                            <RHFPasswordField
                                name='password'
                                title='Password'
                                required
                                placeholder='Enter your password'
                            />
                            <RHFPasswordField
                                name='passwordConfirmation'
                                title='Password Confirmation'
                                required
                                placeholder='Enter your password confirmation'
                            />
                        </FormProvider>
                    </ScrollView>
                    <Surface elevation={4} style={{ padding: 16, backgroundColor: colors.neutral.neutral_10 }}>
                        <CustomButton color='primary' title='Sign Up'/>
                    </Surface>
                </Stack>
            </Stack>
        </Page>
    )
}