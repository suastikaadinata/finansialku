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
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalSpending, setTotalSpending] = useState(0)
    const totalBalance = useMemo(() => totalIncome - totalSpending, [totalIncome, totalSpending])
    const [transactionData, setTransactionData] = useState<TransactionItem[]>([])
    const [totalBudget, setTotalBudget] = useState(0)
    const pieData = useMemo(() => {
        const persentage = (totalSpending / totalBudget) * 100
        const color = persentage > 90 ? colors.danger.main : persentage > 70 ? colors.secondary.main : colors.success.main

        return {
            persentage: persentage > 100 ? 100 : persentage,
            data: [
                    {value: totalSpending, color: color},
                    {value: totalBudget, color: colors.neutral.neutral_30}
                ]
        }
    }, [totalSpending, totalBudget])

    const fetchTransaction = async() => {
        await getTransactionSumByType(Constants.TRANSACTION.INCOME).then((data) => {
            console.log('total income', data)
            setTotalIncome(data[0].total)
        })

        await getTransactionSumByType(Constants.TRANSACTION.SPENDING).then((data) => {
            console.log('total spending', data)
            setTotalSpending(data[0].total)
        })

        await getSumBudget().then((data) => {
            console.log('total budget', data)
            setTotalBudget(data[0].total_budget)
        })

        await getTransactionByLimit(10).then((data) => {
            console.log('transaction data', data)
            setTransactionData(data)
        })
    }

    return {
        pieData,
        totalIncome,
        totalSpending,
        totalBalance,
        totalBudget,
        transactionData,
        fetchTransaction
    }
}