/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import { tableSchema } from '@nozbe/watermelondb'

export const budgetsSschema = tableSchema({
    name: 'budgets',
    columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'amount', type: 'number' },
        { name: 'created_at', type: 'number'},
    ]
})