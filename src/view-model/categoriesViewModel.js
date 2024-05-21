/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import moment from "moment"
import { database } from "../database/database"
import Constants from "../data/Constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Q } from "@nozbe/watermelondb"
import { useBottomSheet } from "../provider/BottomSheetProvider"

export default function categoriesViewModel(){
    const { showErrorBS } = useBottomSheet() 

    const getCategories = async() => {
        const userId = await AsyncStorage.getItem(Constants.USER_ID)
        return await database.get('categories').query(
            Q.on('users', 'id', userId),
        ).unsafeFetchRaw()  
    }

    const doCreateCategories = async (name, budget, onSuccess, onError) => {
        const userId = await AsyncStorage.getItem(Constants.USER_ID)
        await database.write(async() => {
            await database.get('categories').create(categories => {
                categories.name = name
                categories.budget = budget
                categories.userId = userId
            }).then((newData) => {
                onSuccess(newData._raw)
            }).catch((error) => {
                console.log(error)
                showErrorBS({ errorCode: 500 })
                onError()
            })
        })
    }

    const doUpdateCategories = async(id, name, budget, onSuccess, onError) => {
        await database.write(async() => {
            const categories = await database.get('categories').find(id)
            await categories.update(item => {
                item.name = name
                item.budget = budget
            }).then(() => {
                onSuccess()
            }).catch((error) => {
                console.log(error)
                showErrorBS({ errorCode: 500 })
                onError()
            })
        })
    }

    return{
        getCategories,
        doCreateCategories,
        doUpdateCategories
    }
}