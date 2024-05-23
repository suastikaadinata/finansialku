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

export default function useInsightViewController(){
    const { t } = useTranslation()
    const { getTransactionSumByCategory, getSumTransctionLastSixMonthWithType } = transactionViewModel()
    const [incomePieData, setIncomePieData] = useState<GraphData>()
    const [spendingPieData, setSpendingPieData] = useState<GraphData>()
    const [monthlyComparionData, setMonthlyComparionData] = useState<any[]>([])

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
        await doGetTransactionByType(Constants.TRANSACTION.INCOME, (data) => {
            setIncomePieData(data)
        })
        await doGetTransactionByType(Constants.TRANSACTION.SPENDING, (data) => {
            setSpendingPieData(data)
        })
        await getSumTransctionLastSixMonthWithType().then((data) => {
            console.log('monthly comparison data', data)
            let chartData: any[] = []
            data.map((item) => {
                chartData.push({
                    value: item.total_income,
                    label: moment(item.month).format("MMM YYYY"),
                    monthYear: moment(item.month).format("MMM YYYY"),
                    type: t("transaction.income"),
                    spacing: 2,
                    labelWidth: 30,
                    labelTextStyle: {color: colors.neutral.neutral_70},
                    frontColor: colors.primary.main
                })
                chartData.push({
                    value: item.total_spending, 
                    type: t("transaction.spending"),
                    monthYear: moment(item.month).format("MMM YYYY"),
                    frontColor: colors.danger.main,
                })
            })
            setMonthlyComparionData(chartData)
        })
    }


    return{
        incomePieData,
        spendingPieData,
        monthlyComparionData,
        fetchAllData
    }
}