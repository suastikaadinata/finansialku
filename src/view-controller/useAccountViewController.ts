/*
 * Created by Suastika Adinata on Fri May 17 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useState, useRef } from "react";
import userViewModel from "../view-model/userViewModel";
import { UserItem } from "../entities/User";
import { SelectItem } from "../entities/Select";
import Constants from "../data/Constants";
import { useTranslation } from "react-i18next";

export default function useAccountViewController(){
    const { t } = useTranslation();
    const languageRef = useRef()
    const { getUserDetail } = userViewModel()
    const [userDetail, setUserDetail] = useState<UserItem>({} as UserItem)
    const [selectedLanguage, setSelectedLanguage] = useState<SelectItem>({} as SelectItem)
    const languageData: SelectItem[] = [
        { id: Constants.LANGUAGE.ENGLISH, name: t('language.english') },
        { id: Constants.LANGUAGE.INDONESIAN, name: t('language.indonesian') }
    ] 

    const onOpenLanguageBS = () => {
        languageRef?.current?.open();
    }

    const onSelectedLanguage = (language: SelectItem) => {
        setSelectedLanguage(language)
        languageRef?.current?.close();
    }

    const fetchUserDetail = async() => {
        await getUserDetail().then((data: any) => {
            console.log('user detail', data)
            setUserDetail(data)
        })
    }

    return{
        languageRef,
        userDetail,
        languageData,
        selectedLanguage,
        onOpenLanguageBS,
        onSelectedLanguage,
        fetchUserDetail
    }
}