/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import moment from "moment"
import { database } from "../database/database"
import Constants from "../data/Constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Q } from "@nozbe/watermelondb"

export default function transactionViewModel(){
    const last30day = moment().subtract(30, 'days').unix()
    const currentDate = moment().unix()

    const doCreateTransaction = async (data, onSuccess, onError) => {
        const userId = await AsyncStorage.getItem(Constants.USER_ID)
        await database.write(async() => {
            await database.get('transactions').create(transaction => {
                transaction.userId = userId
                transaction.categoryId = data.categoryId
                transaction.name = data.name
                transaction.date = moment(data.date).unix()
                transaction.amount = data.amount
                transaction.type = data.type
            }).then((newData) => {
                console.log('new transaction', newData._raw)
                onSuccess()
            }).catch((error) => {
                onError(error)
            })
        })
    }

    const getTransactionSumByCategory = async(type) => {
        const userId = await AsyncStorage.getItem(Constants.USER_ID)
        return await database.get('transactions').query(
            Q.unsafeSqlQuery(
              `select categories.name as category_name, sum(transactions.amount) as total 
              from transactions left join categories on transactions.category_id = categories.id 
              where transactions.user_id = '${userId}' and (transactions.date between ${last30day} and ${currentDate}) and transactions.type = '${type}' group by transactions.category_id`,
            )
        ).unsafeFetchRaw()
    }

    const getTransactionByType = async(type) => {
        const userId = await AsyncStorage.getItem(Constants.USER_ID)
        return await database.get('transactions').
            query(Q.where('user_id', userId), Q.where('type', type), Q.where('date', Q.between(last30day, currentDate)), Q.sortBy('date', Q.desc))
            .unsafeFetchRaw()
    }

    return{
        doCreateTransaction,
        getTransactionByType,
        getTransactionSumByCategory
    }
}