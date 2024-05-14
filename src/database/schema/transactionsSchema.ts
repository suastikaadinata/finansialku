/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import { tableSchema } from '@nozbe/watermelondb'

export const transactionsSchema = tableSchema({
    name: 'transactions',
    columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'category_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string'},
        { name: 'date', type: 'string' },
        { name: 'amount', type: 'number'},
        { name: 'type', type: 'string'}, // income or spending
        { name: 'created_at', type: 'number'},
    ]
})