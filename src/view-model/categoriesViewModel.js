/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import moment from "moment"
import { database } from "../database/database"
import Constants from "../data/Constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Q } from "@nozbe/watermelondb"

export default function categoriesViewModel(){
    const getCategories = async() => {
        const userId = await AsyncStorage.getItem(Constants.USER_ID)
        return await database.get('categories').query(
            Q.on('users', 'id', userId),
        ).unsafeFetchRaw()  
    }

    const doCreateCategories = async (name, description, onSuccess, onError) => {
        const userId = await AsyncStorage.getItem(Constants.USER_ID)
        await database.write(async() => {
            await database.get('categories').create(categories => {
                categories.name = name
                categories.description = description
                categories.userId = userId
            }).then((newData) => {
                onSuccess(newData._raw)
            }).catch((error) => {
                onError(error)
            })
        })
    }

    const doUpdateCategories = async(id, name, description, onSuccess, onError) => {
        await database.write(async() => {
            const categories = await database.get('categories').find(id)
            await categories.update(item => {
                item.name = name
                item.description = description
            }).then(() => {
                onSuccess()
            }).catch((error) => {
                onError(error)
            })
        })
    }

    return{
        getCategories,
        doCreateCategories,
        doUpdateCategories
    }
}