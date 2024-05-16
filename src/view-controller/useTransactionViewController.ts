/*
 * Created by Suastika Adinata on Wed May 08 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useState, useMemo, useEffect } from "react";
import { colors } from "../styles/colors";
import transactionViewModel from "../view-model/transactionViewModel";
import { TransactionItem } from "../entities/Transaction";
import { GraphItem } from "../entities/Graph";
import { graphColor } from "../data/graphColor";

export default function useTransactionViewController(){
    const { getTransactionByType, getTransactionSumByCategory } = transactionViewModel();
    const [transactionData, setTransactionData] = useState<TransactionItem[]>([])
    const [pieData, setPieData] = useState<GraphItem[]>([])
    const [totalMoney, setTotalMoney] = useState(0)

    const [selectedType, setSelectedType] = useState('income');

    const doGetTransactionByType = async(type: string) => {
        await getTransactionByType(type).then((data) => {
            console.log('data transaction', data)
            setTransactionData(data)
        })
        await getTransactionSumByCategory(type).then((data: any) => {
            const chartData: GraphItem[] = []
            let total = 0
            data.map((item: any, index: number) => {
                total += item.total
                chartData.push({ value: item.total, color: graphColor[index], title: item.category_name })
            })

            setTotalMoney(total)
            setPieData(chartData)
        })
    }

    useEffect(() => {
        doGetTransactionByType(selectedType)
    }, [selectedType])

    const onSelectedType = (type: string) => {
        setSelectedType(type);
    }

    return{
        pieData,
        transactionData,
        totalMoney,
        selectedType,
        onSelectedType,
        doGetTransactionByType
    }
}