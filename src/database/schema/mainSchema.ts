/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import { appSchema } from '@nozbe/watermelondb'
import { usersSchema } from './usersSchema'
import { categorieschema } from './categoriesSchema'
import { transactionsSchema } from './transactionsSchema'
import { budgetsSschema } from './budgetsSchema'

export const mainSchema = appSchema({
  version: 1,
  tables: [
    usersSchema,
    budgetsSschema,
    categorieschema,
    transactionsSchema
  ]
})