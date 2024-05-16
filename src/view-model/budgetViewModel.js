/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import moment from "moment"
import { database } from "../database/database"
import Constants from "../data/Constants"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function budgetViewModel(){
    const doCreateBudget = async (amount, onSuccess) => {
        const userId = await AsyncStorage.getItem(Constants.USER_ID)
        await database.get('budgets').create(budget => {
            budget.amount = amount
            budget.userId = userId
        }).then((newBudget) => {
            onSuccess(newBudget)
        }).catch((error) => {
            console.log(error)
        })
    }

    return{
        doCreateBudget
    }
}