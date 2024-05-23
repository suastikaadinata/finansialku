/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */

export interface CategoryItem{
    _changed?: string;
    _status?: string;
    created_at?: number;
    name: string;
    budget: number;
    total_transaction?: number;
    id?: string;
    user_id?: string;
}