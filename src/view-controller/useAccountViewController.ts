/*
 * Created by Suastika Adinata on Fri May 17 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useState } from "react";
import userViewModel from "../view-model/userViewModel";
import { UserItem } from "../model/User";
import { SelectItem } from "../model/Select";
import Constants from "../data/Constants";
import { useTranslation } from "react-i18next";
import { useBottomSheet } from "../provider/BottomSheetProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../locales/locales";

export default function useAccountViewController(){
    const { t } = useTranslation();
    const { showSelectBS, hideSelectBS } = useBottomSheet()
    const { getUserDetail } = userViewModel()
    const [userDetail, setUserDetail] = useState<UserItem>({} as UserItem)
    const languageData: SelectItem[] = [
        { id: Constants.LANGUAGE.ENGLISH, name: t('language.english') },
        { id: Constants.LANGUAGE.INDONESIAN, name: t('language.indonesian') }
    ] 
    const [selectedLanguage, setSelectedLanguage] = useState<SelectItem>(languageData.find(item => item.id == i18n.language) ?? languageData[0])

    const onOpenLanguageBS = () => {
        showSelectBS({
            title: t('title.select_language'),
            selectData: languageData,
            height: 190,
            selectedItem: selectedLanguage,
            onSelected: onSelectedLanguage
        })
    }

    const onSelectedLanguage = async(language: SelectItem) => {
        await i18n.changeLanguage(language.id).then(() => {
            setSelectedLanguage(language)
            AsyncStorage.setItem(Constants.USER_LANGUAGE, language.id)
            hideSelectBS()
        })
    }

    const fetchUserDetail = async() => {
        await getUserDetail().then((data: any) => {
            console.log('user detail', data)
            setUserDetail(data)
        })
    }


    return{
        userDetail,
        selectedLanguage,
        onOpenLanguageBS,
        fetchUserDetail
    }
}