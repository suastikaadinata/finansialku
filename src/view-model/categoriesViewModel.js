/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import moment from "moment"
import { database } from "../database/database"
import localStorage from "redux-persist/es/storage"
import Constants from "../data/Constants"

export default function categoriesViewModel(){
    const doCreateCategories = async (name, onSuccess) => {
        const userId = await localStorage.getItem(Constants.USER_ID)
        await database.get('categories').create(categories => {
            categories.name = name
            categories.userId = userId
            categories.createdAt = moment()
        }).then((newBudget) => {
            onSuccess(newBudget)
        }).catch((error) => {
            console.log(error)
        })
    }

    return{
        doCreateCategories
    }
}