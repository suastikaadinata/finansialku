/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import { tableSchema } from '@nozbe/watermelondb'

export const usersSchema = tableSchema({
    name: 'users',
    columns: [
        { name: 'fullname', type: 'string' },
        { name: 'birthdate', type: 'number' },
        { name: 'gender', type: 'string'},
        { name: 'username', type: 'string' },
        { name: 'password', type: 'string'},
        { name: 'created_at', type: 'number'},
    ]
})