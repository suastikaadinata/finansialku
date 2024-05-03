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

export default function LoginScreen({ navigation }: NavigateProps){
    const { method } = useLoginViewController()

    return(
        <Page bgColor='#ffffff'>
            <Stack p={16}>
                <Typography textStyle={{ fontSize: 28, marginTop: 32, color: colors.neutral.neutral_100 }}>
                    Sign in with your account
                </Typography>
                <Stack mt={16}>
                    <FormProvider {...method}>
                        <RHFTextField
                            name={"username"}
                            title={'Username'}
                            required
                            placeholder={'Enter your username'}
                        />
                        <RHFPasswordField 
                            name='password'
                            title='Password'
                            required
                            placeholder='Enter your password'
                        />

                        <Stack mt={8} direction='row' style={{ flexWrap: 'wrap' }}>
                            <Typography>Forgot Password? </Typography>
                            <TouchableOpacity>
                                <Typography textStyle={{ color: colors.primary.main, textDecorationColor: 'underline' }}>Tap here.</Typography>
                            </TouchableOpacity>
                        </Stack>

                        <Stack mt={24}>
                            <CustomButton color={'primary'} title={'Sign In'} onPress={() => navigation.navigate("Main")}/>
                            <CustomButton containerStyle={{ marginTop: 12 }} type='outline' color={'primary'} title={'Sign Up'}
                                onPress={() => navigation.navigate("Register")}/>
                        </Stack>
                    </FormProvider>
                </Stack>
            </Stack>
        </Page>
    )
}