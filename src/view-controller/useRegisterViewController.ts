/*
 * Created by Suastika Adinata on Fri May 03 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useState, useRef } from "react"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import userViewModel from "../view-model/userViewModel";
import Constants from "../data/Constants";
import moment from "moment";

export default function useRegisterViewController() {
    const { doCreateUser } = userViewModel();
    const genderRef = useRef();
    const [birthdate, setBirthdate] = useState(new Date());
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [isOpenBirtdatePicker, setIsOpenBirtdatePicker] = useState(false);
    const [gender, setSelectedGender] = useState('')

    const schema = yup.object({
		username: yup.string().required().label("Username"),
        fullname: yup.string().required().label("Fullname"),
        birthdate: yup.string().required().label("Birthdate"),
        gender: yup.string().required().label("Gender"),
		password: yup.string().min(8).required().label("Password"),
        passwordConfirmation: yup.string().min(8).oneOf([yup.ref('password'),undefined], 'Passwords must match').required().label("Password Confirmation"),
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

    const onOpenGendertPicker = () => {
        genderRef?.current?.open()
    }

    const onSelectedGender = (value: string) => {
        setSelectedGender(value);
        method.setValue('gender', value)
        genderRef?.current?.close()
    }

    const doRegister = async(data: any, onSuccess: () => void, onError: (e: string) => void) => {
        setIsLoadingForm(true)
        await doCreateUser({
            fullname: data.fullname,
            birthdate: data.birthdate,
            gender: data.gender,
            username: data.username,
            password: data.password
        }, () => {
            setIsLoadingForm(false);
            onSuccess();
        }, (e: string) => {
            setIsLoadingForm(false);
            onError(e)
        });
    }

    return{
        genderRef,
        isLoadingForm,
        gender,
        birthdate,
        isOpenBirtdatePicker,
        onOpenGendertPicker,
        onSelectedGender,
        onChangeBirthdate,
        onOpenBirtdatePicker,
        onCloseBirtdatePicker,
        method,
        doRegister    
    }
}