/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import moment from "moment"
import { database } from "../database/database"
import localStorage from "redux-persist/es/storage"
import Constants from "../data/Constants"

export default function transactionViewModel(){
    const doCreateTransaction = async (categoryId, name, date, amount, type, onSuccess) => {
        const userId = await localStorage.getItem(Constants.USER_ID)
        await database.get('transactions').create(transaction => {
            transaction.userId = userId
            transaction.categoryId = categoryId
            transaction.name = name
            transaction.date = date
            transaction.amount = amount
            transaction.type = type
        }).then((newBudget) => {
            onSuccess(newBudget)
        }).catch((error) => {
            console.log(error)
        })
    }

    return{
        doCreateTransaction
    }
}