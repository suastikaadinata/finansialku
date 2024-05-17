/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useDispatch } from "react-redux";
import Constants from "../data/Constants";

export default function useGlobalDispatch(){
    const dispatch = useDispatch();

    const onLoginDispatch = (userId: string) => {
        AsyncStorage.setItem(Constants.USER_ID, userId)
        dispatch({
            type: 'IS_LOGIN',
            payload: {
                isAuthentication: true,
            }
        })
    }

    const onLogoutDispatch = () => {
        AsyncStorage.removeItem(Constants.USER_ID)
        dispatch({
            type: 'IS_LOGOUT',
            payload: {
                isAuthentication: false,
            }
        })
    }

    return{
        onLoginDispatch,
        onLogoutDispatch
    }
}