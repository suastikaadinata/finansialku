/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { mainSchema } from './schema/mainSchema'
import UserModel from './model/UserModel'
import BudgetModel from './model/BudgetModel'
import CategoriesModel from './model/CategoriesModel'
import TransactionModel from './model/TransactionModel'

const adapter = new SQLiteAdapter({
    schema: mainSchema,
    dbName: 'finansialku',
    onSetUpError: error => {
      console.log('db setup error:', error)
    }
})

export const database = new Database({
    adapter,
    modelClasses: [
        UserModel,
        BudgetModel,
        CategoriesModel,
        TransactionModel
    ],
})