/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import { database } from "../database/database"
import { sha256 } from 'react-native-sha256';
import moment from "moment";
import localStorage from "redux-persist/es/storage";
import { Q } from '@nozbe/watermelondb'

export default function userViewModel(){
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
        if(!user){
            const hashPassword = await doHashPassword(data.password)
            await database.get('users').create(user => {
                user.fullname = data.fullname
                user.birthdate = data.birthdate
                user.gender = data.gender
                user.username = data.username
                user.password = hashPassword
                user.created_at = moment()
            }).then((newUser) => {
                onSuccess(newUser)
            }).catch((error) => {
                console.log(error)
            })
        }else{
            onError("Username already exist")
        } 
    }

    const getUserDetail = async() => {
        const userId = localStorage.getItem('userId')
        return await database.get('users').find(userId)
    }

    const doLogin = async (username, password, onSuccess, onError) => {
        const user = await findingUser(username)
        if(user){
            deComparePassword(password, user.password).then((res) => {
                if(res){
                    onSuccess(user)
                }else{
                    onError("Username or password is wrong")
                }
            })
        }else{
            onError("User not found")
        }
    }

    return{
        doCreateUser,
        getUserDetail,
        doLogin
    }
}