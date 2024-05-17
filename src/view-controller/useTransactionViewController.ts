/*
 * Created by Suastika Adinata on Wed May 08 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useState, useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { colors } from "../styles/colors";
import transactionViewModel from "../view-model/transactionViewModel";
import { TransactionItem } from "../entities/Transaction";
import { GraphItem } from "../entities/Graph";
import { graphColor } from "../data/graphColor";

export default function useTransactionViewController(){
    const deleteConfirmationRef = useRef()
    const { getTransactionByType, getTransactionSumByCategory, doDeleteTransaction } = transactionViewModel();
    const [transactionData, setTransactionData] = useState<TransactionItem[]>([])
    const [pieData, setPieData] = useState<GraphItem[]>([])
    const [totalMoney, setTotalMoney] = useState(0)
    const [selectedItem, setSelectedItem] = useState('')
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

    const onSelectedItem = (id: string) => {
        setSelectedItem(id)
    }

    const onOpenDeleteConfirmationBS = () => {
        deleteConfirmationRef?.current?.open()
    }

    const onCloseDeleteConfirmationBS = () => {
        deleteConfirmationRef?.current?.close()
    }

    const doHandlingOnGoBack = (type: string) => {
        if(type == selectedType){
            doGetTransactionByType(type)
        }else{
            onSelectedType(type)
        }

        onSelectedItem('')
    }

    const onDeleteTransaction = async() => {
        await doDeleteTransaction(selectedItem).then(() => {
            doGetTransactionByType(selectedType)
            onCloseDeleteConfirmationBS()
        })
    }

    return{
        deleteConfirmationRef,
        pieData,
        transactionData,
        totalMoney,
        selectedType,
        selectedItem,
        onSelectedType,
        onSelectedItem,
        doGetTransactionByType,
        onOpenDeleteConfirmationBS,
        onCloseDeleteConfirmationBS,
        doHandlingOnGoBack,
        onDeleteTransaction
    }
}