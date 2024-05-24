/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */

export interface TransactionItem {
    _changed?: string;
    _status?: string;
    created_at?: number;
    category_id: string;
    amount: number;
    name: string;
    date: string;
    type: string;
    description?: string;
    id?: string;
    user_id?: string;
}