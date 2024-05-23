/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */

export interface GraphData{
    totalMoney: number;
    chartData: GraphItem[];
}

export interface GraphItem{
    value: number;
    color: string;
    title: string
}