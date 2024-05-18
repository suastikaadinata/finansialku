/*
 * Created by Suastika Adinata on Thu May 09 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useEffect } from 'react';
import Page from '../components/Page';
import { ScrollView, TouchableOpacity } from 'react-native';
import { IconButton, Surface } from 'react-native-paper';
import { colors } from '../styles/colors';
import Stack from '../components/Stack';
import { Icon } from "@rneui/themed";
import Typography from '../components/Typography';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Tile } from '@rneui/base';
import { useTranslation } from 'react-i18next';
import useGlobalDispatch from '../redux/useGlobalDispatch';
import useAccountViewController from '../view-controller/useAccountViewController';
import { useIsFocused } from '@react-navigation/native';
import Constants from '../data/Constants';
import moment from 'moment';
import { NavigateProps } from '../entities/GlobalProps';

interface Props{
    icon?: string;
    title?: string;
    desc?: string;
    onPress?: () => void;
}

export default function AccountView({ navigation }: NavigateProps){
    const { t } = useTranslation();
    const isFocused = useIsFocused();
    const { onLogoutDispatch } = useGlobalDispatch();
    const { 
        userDetail, 
        selectedLanguage, 
        onOpenLanguageBS, 
        fetchUserDetail 
    } = useAccountViewController();

    useEffect(() => { 
        if(isFocused) fetchUserDetail()
    }, [isFocused])

    const AccountInformationView = () => {
        return(
            <Surface elevation={4} style={{ borderRadius: 8, marginTop: 36, marginHorizontal: 16, padding: 16, backgroundColor: colors.neutral.neutral_10 }}>
                <Typography textStyle={{ fontSize: 16, fontWeight: 700, color: colors.neutral.neutral_90 }}>{t('title.account_information')}</Typography>
                <Stack mt={12} direction='row'>
                    <Stack style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Icon type="fontawesome" name="account-circle" size={44} color={colors.neutral.neutral_90} />
                    </Stack>
                    <Stack ml={12} mr={12} style={{ flex: 1 }}>
                        <Typography textStyle={{ fontSize: 14, fontWeight: 700, color: colors.neutral.neutral_90 }}>{userDetail.fullname}</Typography>
                        <Typography textStyle={{ fontSize: 12, color: colors.neutral.neutral_90 }} viewStyle={{ marginTop: 2 }}>@{userDetail.username}</Typography>
                        <Stack direction='row' mt={2}>
                            <Stack direction='row'>
                                <MaterialCommunityIcons name="calendar" size={16} color={colors.success.main} />
                                <Typography textStyle={{ fontSize: 12, color: colors.neutral.neutral_90 }} viewStyle={{ marginLeft: 4, alignSelf: 'center' }}>{moment.unix(Number(userDetail.birthdate ?? 0)).format("DD MMMM YYYY")}</Typography>
                            </Stack>
                            <Stack ml={8} direction='row'>
                                <MaterialCommunityIcons name={userDetail.gender == Constants.GENDER.MALE ? "gender-male" : "gender-female"} size={16} color={userDetail.gender == Constants.GENDER.MALE ? colors.info.main : colors.danger.hover} />
                                <Typography textStyle={{ fontSize: 12, color: colors.neutral.neutral_90 }} viewStyle={{ marginLeft: 4, alignSelf: 'center' }}>{userDetail.gender == Constants.GENDER.MALE ? t('gender.male') : t('gender.female')}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack style={{ alignSelf: 'center' }}>
                        <IconButton
                            icon="pencil"
                            iconColor={colors.neutral.neutral_90}
                            size={24}
                            style={{ marginRight: -2 }}
                            onPress={() => navigation.navigate('EditAccount')}
                        />
                    </Stack>
                </Stack>
            </Surface>
        )
    }

    const SettingItemView = ({ icon, title, desc, onPress }: Props) => {
        return(
            <TouchableOpacity style={{ marginVertical: 8, flexDirection: 'row' }} delayPressIn={0} onPress={onPress}>
                <MaterialCommunityIcons name={icon!} size={24} color={colors.neutral.neutral_90} style={{ alignSelf: 'center' }}/>
                <Stack ml={8} style={{ flex: 1 }}>
                    <Typography textStyle={{ fontSize: 14, fontWeight: 700, color: colors.neutral.neutral_90 }}>{title}</Typography>
                    <Typography textStyle={{ fontSize: 10, color: colors.neutral.neutral_70}}>{desc}</Typography>
                </Stack>
                <MaterialCommunityIcons name={'chevron-right'} size={24} color={colors.neutral.neutral_90} style={{ alignSelf: 'center' }}/>
            </TouchableOpacity>
        )
    }

    const SettingView = () => {
        return(
            <Surface elevation={4} style={{ borderRadius: 8, marginTop: 24, marginHorizontal: 16, padding: 16, backgroundColor: colors.neutral.neutral_10 }}>
                <Typography textStyle={{ fontSize: 16, fontWeight: 700, color: colors.neutral.neutral_90 }} viewStyle={{ marginBottom: 16 }}>{t('title.account_setting')}</Typography>
                <SettingItemView icon='lock-outline' title={t('title.account_security')} desc={t('description.account_security')} onPress={() => navigation.navigate("EditPassword")}/>
                <SettingItemView icon='flag-outline' title={t('title.language')} desc={t('description.language')} onPress={onOpenLanguageBS}/>
            </Surface>
        )
    }

    const LogoutView = () => {
        return(
            <Surface elevation={4} style={{ borderRadius: 8, marginTop: 24, marginHorizontal: 16, backgroundColor: colors.neutral.neutral_10 }}>
                <TouchableOpacity style={{ flexDirection: 'row', padding: 16 }} onPress={onLogoutDispatch}>
                    <MaterialCommunityIcons name={'logout'} size={24} color={colors.neutral.neutral_90} style={{ alignSelf: 'center' }}/>
                    <Typography viewStyle={{ marginHorizontal: 8, flex: 1, alignSelf: 'center' }} textStyle={{ fontSize: 14, fontWeight: 700, color: colors.neutral.neutral_90 }}>{t('title.logout')}</Typography>
                    <Typography viewStyle={{ alignSelf: 'center' }} textStyle={{ fontSize: 12, color: colors.neutral.neutral_70}}>{t('version')} 1.0</Typography>
                </TouchableOpacity>
            </Surface>
        )
    }

    return(
        <Page>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <AccountInformationView />
                <SettingView />
                <LogoutView />
            </ScrollView>
        </Page>
    )
}