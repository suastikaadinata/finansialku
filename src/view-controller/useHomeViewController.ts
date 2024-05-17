/*
 * Created by Suastika Adinata on Mon May 06 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useState, useMemo } from "react";
import { colors } from "../styles/colors";
import transactionViewModel from "../view-model/transactionViewModel";
import Constants from "../data/Constants";
import { TransactionItem } from "../entities/Transaction";

export default function useHomeViewController(){
    const { getTransactionSumByType, getTransactionByLimit } = transactionViewModel();
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalSpending, setTotalSpending] = useState(0)
    const totalBalance = useMemo(() => totalIncome - totalSpending, [totalIncome, totalSpending])
    const [transactionData, setTransactionData] = useState<TransactionItem[]>([])

    const pieData = [
        {value: 70, color: colors.primary.main},
        {value: 30, color: 'lightgray'}
    ];

    const fetchTransaction = async() => {
        await getTransactionSumByType(Constants.TRANSACTION.INCOME).then((data) => {
            console.log('total income', data)
            setTotalIncome(data[0].total)
        })

        await getTransactionSumByType(Constants.TRANSACTION.SPENDING).then((data) => {
            console.log('total spending', data)
            setTotalSpending(data[0].total)
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
        transactionData,
        fetchTransaction
    }
}