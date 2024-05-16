/*
 * Created by Suastika Adinata on Tue Apr 30 2024
 * Copyright (c) 2024 - Made with love
 */
import React, { useState } from "react"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import userViewModel from "../view-model/userViewModel";
import { useDispatch } from "react-redux";
import useGlobalDispatch from "../redux/useGlobalDispatch";

export default function useLoginViewController() {
	const dispatch = useDispatch();
	const { doLogin } = userViewModel();
	const { onLoginDispatch } = useGlobalDispatch();
	const [isLoadingForm, setIsLoadingForm] = useState(false);

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

	const doSubmitLogin = async(data: any, onError: (e: string) => void) => {
		console.log("data", data)
		setIsLoadingForm(true)
		await doLogin(data.username, data.password, (user: any) => {
			console.log('user', user)
			setIsLoadingForm(false)
			onLoginDispatch(true, user.id)
		}, (e: string) => {
			setIsLoadingForm(false)
			onError(e)
		})
	}

    return{
        method,
		isLoadingForm,
		doSubmitLogin    
    }
}