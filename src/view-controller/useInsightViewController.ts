/*
 * Created by Suastika Adinata on Thu May 23 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useState } from "react";
import transactionViewModel from "../view-model/transactionViewModel";
import { GraphData, GraphItem } from "../model/Graph";
import { graphColor } from "../data/graphColor";
import Constants from "../data/Constants";
import moment from "moment";
import { colors } from "../styles/colors";
import { useTranslation } from "react-i18next";
import { ToastAndroid } from "react-native";
import { currencyFormat } from "../utils/Utilities";

export default function useInsightViewController(){
    const { t } = useTranslation()
    const { getTransactionSumByCategory, getSumTransctionLastSixMonthWithType } = transactionViewModel()
    const [chartData, setChartData] = useState({
        incomePieData: { totalMoney: 0, chartData: [] } as GraphData,
        spendingPieData: { totalMoney: 0, chartData: [] } as GraphData,
        monthlyComparionData: [] as any[]
    })

    const doGetTransactionByType = async(type: string, onSuccess: (data: GraphData) => void) => {
        await getTransactionSumByCategory(type).then((data: any) => {
            const chartData: GraphItem[] = []
            let total = 0
            data.map((item: any, index: number) => {
                total += item.total
                chartData.push({ value: item.total, color: graphColor[index], title: item.category_name })
            })

            onSuccess({totalMoney: total, chartData})
        })
    }

    const fetchAllData = async() => {
        let incomeData = {} as GraphData
        let spendingData = {} as GraphData
        let monthlyComparisonData: any[] = []

        await doGetTransactionByType(Constants.TRANSACTION.INCOME, (data) => {
            incomeData = data
        })
        await doGetTransactionByType(Constants.TRANSACTION.SPENDING, (data) => {
            spendingData = data
        })
        await getSumTransctionLastSixMonthWithType().then((data) => {
            console.log('monthly comparison data', data)
            let monthlyData: any[] = []
            data.map((item) => {
                monthlyData.push({
                    value: item.total_income,
                    label: moment(item.month).format("MMM YYYY"),
                    monthYear: moment(item.month).format("MMM YYYY"),
                    type: t("transaction.income"),
                    spacing: 2,
                    labelWidth: 30,
                    labelTextStyle: {color: colors.neutral.neutral_70},
                    frontColor: colors.primary.main
                })
                monthlyData.push({
                    value: item.total_spending, 
                    type: t("transaction.spending"),
                    monthYear: moment(item.month).format("MMM YYYY"),
                    frontColor: colors.danger.main,
                })
            })
            monthlyComparisonData = monthlyData
        })

        setChartData({
            incomePieData: incomeData,
            spendingPieData: spendingData,
            monthlyComparionData: monthlyComparisonData
        })
    }

    const onPressBarChart = (item: any) => {
        ToastAndroid.show(`${item.type} ${item.monthYear}: ${currencyFormat(item.value)}`, ToastAndroid.SHORT)
    }

    const onPressPieChart = (item: any) => {
        ToastAndroid.show(`${item.title}: ${currencyFormat(item.value)}`, ToastAndroid.SHORT)
    }

    return{
        chartData,
        fetchAllData,
        onPressBarChart,
        onPressPieChart
    }
}