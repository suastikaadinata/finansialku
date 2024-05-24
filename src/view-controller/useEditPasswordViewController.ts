/*
 * Created by Suastika Adinata on Sat May 18 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import userViewModel from "../view-model/userViewModel";
import { useTranslation } from "react-i18next";

export default function useEditPasswordViewController() {
    const { t } = useTranslation();
    const { doUpdatePassword } = userViewModel();
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const schema = yup.object({
        oldPassword: yup.string().min(8).required().label(t('title.old_password')),
		newPassword: yup.string().min(8).required().label(t('title.new_password')),
        newPasswordConfirmation: yup.string().min(8).oneOf([yup.ref('newPassword'),undefined], t('error.title.password_confirmation')).required().label(t('title.new_password_confirmation')),
	}).required();
	
	const defaultValues = {
		oldPassword: "",
        newPassword: "",
        newPasswordConfirmation: ""
	};
	
	const method = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	});

    const onSubmitFormUpdate = async(data: any, onSuccess: () => void) => {
        setIsLoadingForm(true)
        await doUpdatePassword({
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }, () => {
            setIsLoadingForm(false)
            onSuccess()
        }, () => {
            setIsLoadingForm(false)
        })
    }

    return {
        method,
        isLoadingForm,
        onSubmitFormUpdate
    }
}