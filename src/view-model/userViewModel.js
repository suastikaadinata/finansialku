/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import { database } from "../database/database"
import { sha256 } from 'react-native-sha256';
import moment from "moment";
import { Q } from '@nozbe/watermelondb'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "../data/Constants";
import { useBottomSheet } from "../provider/BottomSheetProvider";
import { useTranslation } from "react-i18next";

export default function userViewModel(){
    const { t } = useTranslation()
    const { showErrorBS } = useBottomSheet()

    const doHashPassword = async (password) => {
        return await sha256(password).then( hash => {
            return hash
        })
    }

    const deComparePassword = async (password, hash) => {
        const upcomingHash = await doHashPassword(password)
        return upcomingHash === hash
    }

    const findingUser = async (username) => {
        return await database.get('users').query(Q.where('username', username)).fetch()
    }

    const doCreateUser = async (data, onSuccess, onError) => { 
        const user = await findingUser(data.username)
        console.log('user', user)
        if(!user || user.length === 0){
            const hashPassword = await doHashPassword(data.password)
            await database.write(async() => {
                await database.get('users').create(user => {
                    user.fullname = data.fullname
                    user.birthdate = moment(data.birthdate).unix()
                    user.gender = data.gender
                    user.username = data.username
                    user.password = hashPassword
                }).then((newUser) => {
                    console.log('new user', newUser._raw)
                    onSuccess(newUser._raw)
                }).catch((error) => {
                    console.log(error)
                    showErrorBS({ errorCode: 500 })
                    onError()
                })
            })
        }else{
            showErrorBS({
                title: t("error.title.username_has_been_taken"),
                description: t("error.description.username_has_been_taken")
            })
            onError()
        } 
    }

    const doUpdateUser = async (data, onSuccess, onError) => {
        const userId = await AsyncStorage.getItem(Constants.USER_ID)
        await database.write(async() => {
            const user = await database.get('users').find(userId)
            await user.update(item => {
                item.fullname = data.fullname
                item.gender = data.gender
                item.birthdate = moment(data.birthdate).unix()
            }).then(() => {
                onSuccess()
            }).catch((error) => {
                console.log(error)
                showErrorBS({ errorCode: 500 })
                onError()
            })
        })
    }

    const doUpdatePassword = async (data, onSuccess, onError) => {
        const userId = await AsyncStorage.getItem(Constants.USER_ID)
        const user = await database.get('users').find(userId)
        const comparePassword = await deComparePassword(data.oldPassword, user._raw.password)
        if(comparePassword){
            const hashPassword = await doHashPassword(data.newPassword)
            await database.write(async() => {
                await user.update(item => {
                    item.password = hashPassword
                }).then(() => {
                    onSuccess()
                }).catch((error) => {
                    console.log(error)
                    showErrorBS({ errorCode: 500 })
                    onError()
                })
            })
        }else{
            showErrorBS({
                title: t("error.title.old_password_incorrect"),
                description: t("error.description.old_password_incorrect")
            })
            onError()
        }
    }

    const getUserDetail = async() => {
        const userId = await AsyncStorage.getItem(Constants.USER_ID)
        const user = await database.get('users').find(userId)
        return user._raw
    }

    const doLogin = async (username, password, onSuccess, onError) => {
        const user = await findingUser(username)
        console.log('user', user)
        if(user && user.length > 0){
            deComparePassword(password, user[0]._raw.password).then((res) => {
                if(res){
                    onSuccess(user[0]._raw)
                }else{
                    showErrorBS({
                        title: t("error.title.username_or_password_incorrect"),
                        description: t("error.description.username_or_password_incorrect"),
                        height: 225
                    })
                    onError()
                }
            })
        }else{
            showErrorBS({
                title: t("error.title.username_or_password_incorrect"),
                description: t("error.description.username_or_password_incorrect"),
                height: 225
            })
            onError()
        }
    }

    return{
        doCreateUser,
        getUserDetail,
        doLogin,
        doUpdateUser,
        doUpdatePassword
    }
}