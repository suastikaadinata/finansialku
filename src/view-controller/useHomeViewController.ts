/*
 * Created by Suastika Adinata on Mon May 06 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useState, useMemo } from "react";
import { colors } from "../styles/colors";
import transactionViewModel from "../view-model/transactionViewModel";
import Constants from "../data/Constants";
import { TransactionItem } from "../model/Transaction";
import categoriesViewModel from "../view-model/categoriesViewModel";

export default function useHomeViewController(){
    const { getTransactionSumByType, getTransactionByLimit } = transactionViewModel();
    const { getSumBudget } = categoriesViewModel();
    const [homeData, setHomeData] = useState({
        totalIncome: 0,
        totalSpending: 0,
        totalBalance: 0,
        totalBudget: 0,
        transactionData: [] as TransactionItem[]
    } as any)
    const pieData = useMemo(() => {
        const persentage = (homeData.totalSpending / homeData.totalBudget) * 100
        const color = persentage > 90 ? colors.danger.main : persentage > 70 ? colors.secondary.main : colors.success.main

        return {
            persentage: persentage > 100 ? 100 : persentage,
            data: [
                    {value: homeData.totalSpending, color: color},
                    {value: homeData.totalBudget, color: colors.neutral.neutral_30}
                ]
        }
    }, [homeData.totalSpending, homeData.totalBudget])

    const fetchTransaction = async() => {
        let totalIncome = 0
        let totalSpending = 0
        let totalBudget = 0
        let transactionData: TransactionItem[] = []
        await getTransactionSumByType(Constants.TRANSACTION.INCOME).then((data) => {
            console.log('total income', data)
            totalIncome = data[0].total
        })

        await getTransactionSumByType(Constants.TRANSACTION.SPENDING).then((data) => {
            console.log('total spending', data)
            totalSpending = data[0].total
        })

        await getSumBudget().then((data) => {
            console.log('total budget', data)
            totalBudget = data[0].total_budget
        })

        await getTransactionByLimit(10).then((data) => {
            console.log('transaction data', data)
            transactionData = data
        })

        const totalBalance = totalIncome - totalSpending

        setHomeData({
            totalIncome, 
            totalSpending, 
            totalBalance: totalBalance >= 0 ? totalBalance : 0,
            totalBudget, 
            transactionData
        })
    }

    return {
        pieData,
        homeData,
        fetchTransaction
    }
}