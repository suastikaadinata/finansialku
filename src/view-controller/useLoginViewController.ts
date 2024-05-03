/*
 * Created by Suastika Adinata on Tue Apr 30 2024
 * Copyright (c) 2024 - Made with love
 */
import React from "react"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useLoginViewController() {
    const schema = yup.object({
		username: yup.string().required().label("Username"),
		password: yup.string().min(8).required().label("Password"),
	}).required();
	
	const defaultValues = {
		username: "",
		password: ""
	};
	
	const method = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	});

    return{
        method    
    }
}