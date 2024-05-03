/*
 * Created by Suastika Adinata on Fri May 03 2024
 * Copyright (c) 2024 - Made with love
 */

import React from "react"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useRegisterViewController() {
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

    return{
        method    
    }
}