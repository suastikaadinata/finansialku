/*
 * Created by Suastika Adinata on Sat May 18 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectItem } from "../entities/Select";
import Constants from "../data/Constants";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useBottomSheet } from "../provider/BottomSheetProvider";
import userViewModel from "../view-model/userViewModel";
import { UserItem } from "../entities/User";

export default function useEditAccountViewController(){
    const { t } = useTranslation();
    const { showSelectBS, hideSelectBS } = useBottomSheet()
    const { getUserDetail, doUpdateUser } = userViewModel();
    const [gender, setSelectedGender] = useState<SelectItem>({} as SelectItem)
    const [birthdate, setBirthdate] = useState(new Date());
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [isOpenBirtdatePicker, setIsOpenBirtdatePicker] = useState(false);
    const genderData: SelectItem[] = [
        { id: Constants.GENDER.MALE, name: t("gender.male") },
        { id: Constants.GENDER.FEMALE, name: t("gender.female")}
    ]

    const schema = yup.object({
		username: yup.string().required().label(t('title.username')),
        fullname: yup.string().required().label(t('title.fullname')),
        birthdate: yup.string().required().label(t('title.birthdate')),
        gender: yup.string().required().label(t('title.gender')),
	}).required();
	
	const defaultValues = {
		username: "",
        fullname: "",
        birthdate: "",
        gender: "",
	};
	
	const method = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	});

    const onOpenBirtdatePicker = () => {
        setIsOpenBirtdatePicker(true);
    }

    const onCloseBirtdatePicker = () => {
        setIsOpenBirtdatePicker(false);
    }

    const onChangeBirthdate = (date: Date) => {
        method.setValue('birthdate', moment(date).format("DD MMMM YYYY"));
        setBirthdate(date);
    }

    const onOpenGenderPicker = () => {
        showSelectBS({
            height: 190, 
            title: t('select_gender'),
            selectData: genderData, 
            selectedItem: gender,
            onSelected: onSelectedGender
        })
    }

    const onSelectedGender = (result: SelectItem) => {
        setSelectedGender(result);
        method.setValue('gender', result.name)
        hideSelectBS()
    }

    const fetchUserDetail = async() => {
        await getUserDetail().then((data: any) => {
            console.log('user detail', data)
            method.setValue('username', data.username)
            method.setValue('fullname', data.fullname)
            method.setValue('birthdate', moment.unix(data.birthdate).format("DD MMMM YYYY"))
            const gender = genderData.find(item => item.id == data.gender) as SelectItem
            method.setValue('gender', gender.name)
            setSelectedGender(gender)
            setBirthdate(new Date(data.birthdate * 1000))
        })
    }

    const doSubmitFormUpdate = async(data: any, onSuccess: () => void) => {
        setIsLoadingForm(true)
        await doUpdateUser({
            fullname: data.fullname,
            birthdate: `${birthdate}`,
            gender: gender.id
        }, () => {
            setIsLoadingForm(false)
            onSuccess()
        }, () => {
            setIsLoadingForm(false)
        })
    }

    return{
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
    }
}