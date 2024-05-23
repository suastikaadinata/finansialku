/*
 * Created by Suastika Adinata on Fri May 03 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useState } from "react"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import userViewModel from "../view-model/userViewModel";
import moment from "moment";
import useGlobalDispatch from "../redux/useGlobalDispatch";
import Constants from "../data/Constants";
import { useTranslation } from "react-i18next";
import { SelectItem } from "../model/Select";
import { useBottomSheet } from "../provider/BottomSheetProvider";

export default function useRegisterViewController() {
    const { t } = useTranslation();
    const { showSelectBS, hideSelectBS } = useBottomSheet()
    const { doCreateUser } = userViewModel();
    const { onLoginDispatch } = useGlobalDispatch();
    const [birthdate, setBirthdate] = useState(new Date());
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [isOpenBirtdatePicker, setIsOpenBirtdatePicker] = useState(false);
    const [gender, setSelectedGender] = useState<SelectItem>({} as SelectItem)
    const genderData: SelectItem[] = [
        { id: Constants.GENDER.MALE, name: t("gender.male") },
        { id: Constants.GENDER.FEMALE, name: t("gender.female")}
    ]

    const schema = yup.object({
		username: yup.string().required().label(t('title.username')),
        fullname: yup.string().required().label(t('title.fullname')),
        birthdate: yup.string().required().label(t('title.birthdate')),
        gender: yup.string().required().label(t('title.gender')),
		password: yup.string().min(8).required().label(t('title.password')),
        passwordConfirmation: yup.string().min(8).oneOf([yup.ref('password'),undefined], 'Passwords must match').required().label(t('title.password_confirmation')),
	}).required();
	
	const defaultValues = {
		username: "",
        fullname: "",
        birthdate: "",
        gender: "",
		password: "",
        passwordConfirmation: ""
	};
	
	const method = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	});

    const onChangeBirthdate = (date: Date) => {
        method.setValue('birthdate', moment(date).format("DD MMMM YYYY"));
        setBirthdate(date);
    }

    const onOpenBirtdatePicker = () => {
        setIsOpenBirtdatePicker(true);
    }

    const onCloseBirtdatePicker = () => {
        setIsOpenBirtdatePicker(false);
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

    const doRegister = async(data: any) => {
        setIsLoadingForm(true)
        await doCreateUser({
            fullname: data.fullname,
            birthdate: `${birthdate}`,
            gender: gender.id,
            username: data.username,
            password: data.password
        }, (user: any) => {
            setIsLoadingForm(false);
            onLoginDispatch(user.id)
        }, () => {
            setIsLoadingForm(false);
        });
    }

    return{
        genderData,
        isLoadingForm,
        gender,
        birthdate,
        isOpenBirtdatePicker,
        onOpenGenderPicker,
        onSelectedGender,
        onChangeBirthdate,
        onOpenBirtdatePicker,
        onCloseBirtdatePicker,
        method,
        doRegister    
    }
}