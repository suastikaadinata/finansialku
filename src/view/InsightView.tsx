/*
 * Created by Suastika Adinata on Thu May 23 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { memo, useEffect } from "react";
import Page from "../components/Page";
import { colors } from "../styles/colors";
import { Dimensions, FlatList, ScrollView, ToastAndroid } from "react-native";
import Stack from "../components/Stack";
import Typography from "../components/Typography";
import { useTranslation } from "react-i18next";
import { Surface } from "react-native-paper";
import { GraphData, GraphItem } from "../model/Graph";
import { PieChart, BarChart } from "react-native-gifted-charts";
import { currencyFormat } from "../utils/Utilities";
import Constants from "../data/Constants";
import useInsightViewController from "../view-controller/useInsightViewController";
import { useIsFocused } from "@react-navigation/native";

interface Props{
    graphData?: GraphData;
    type?: string;
    graphItem?: GraphItem;
    color?: string;
    title?: string;
}

export default function InsightView(){
    const { t } = useTranslation();
    const isFocused = useIsFocused()
    const { incomePieData, spendingPieData, monthlyComparionData, fetchAllData } = useInsightViewController()

    useEffect(() => {
        if(isFocused) fetchAllData()
    }, [isFocused])

    const CategoryItemView = ({ graphItem }: Props) => {
        return(
            <Stack direction="row" style={{ flexWrap: 'wrap' }}>
                <Stack style={{ height: 10, width: 10, backgroundColor: graphItem!.color, borderRadius: 2, alignSelf: 'center' }}/>
                <Stack direction="row" style={{ flex: 1, marginLeft: 6, flexWrap: 'wrap' }}>
                    <Typography textStyle={{ color: colors.neutral.neutral_90 }}>{graphItem?.title}</Typography>
                    <Typography textStyle={{ fontSize: 10, color: colors.neutral.neutral_70 }} viewStyle={{ marginLeft: 4, alignSelf: 'center' }}>({currencyFormat(graphItem?.value)})</Typography>
                </Stack>
            </Stack>
        )
    }

    const IncomeSpendingByCategoryGraphView = memo(({ graphData, type }: Props) => {
        return(
            <Surface elevation={4} style={{ 
                marginHorizontal: 16,
                marginTop: 24,
                padding: 16,
                backgroundColor: colors.neutral.neutral_10,
                borderRadius: 8
             }}>
                <Typography textStyle={{ fontSize: 16, fontWeight: 700, color: colors.neutral.neutral_90 }}>{t('title.monthly_summary', { type: t(`transaction.${type}`) })}</Typography>
                <Typography viewStyle={{ marginTop: 4 }} textStyle={{ fontSize: 12, color: colors.neutral.neutral_70 }}>{t('description.monthly_summary', { type: t(`transaction.${type}`) })}</Typography>
                { (graphData && graphData?.chartData.length > 0) ?
                <Stack mt={16}>
                    <Stack direction="row">
                        <Stack mr={8} style={{ flex: 1, alignItems: 'center' }}>
                            <PieChart
                                donut
                                radius={75}
                                data={graphData?.chartData}
                                showText
                            />
                        </Stack>
                        <Stack ml={8} style={{ flex: 1, alignContent: 'center' }}>
                            <FlatList 
                                data={graphData?.chartData}
                                scrollEnabled={false}
                                showsVerticalScrollIndicator={false}
                                renderItem={(item) => (
                                    <CategoryItemView graphItem={item.item}/>
                                )}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction="row" mt={24} style={{ justifyContent: 'space-between' }}>
                        <Typography textStyle={{ fontSize: 14, fontWeight: 700, color: colors.neutral.neutral_90, alignSelf: 'flex-end' }}>{type == Constants.TRANSACTION.INCOME ? t('total_income_a_month') : t('total_spending_a_month')}:</Typography>
                        <Typography textStyle={{ fontSize: 20, fontWeight: 700, color: type == Constants.TRANSACTION.INCOME ? colors.success.main : colors.danger.main }}>{currencyFormat(graphData?.totalMoney)}</Typography>
                    </Stack>
                </Stack>
                :
                <Stack mt={16}>
                    <Typography textStyle={{ color: colors.neutral.neutral_60 }}>{t('empty.chart')}</Typography>
                </Stack>
                }
            </Surface>
        )
    })

    const TransactionTypeView = ({ title, color }: Props) => {
        return(
            <Stack content="center" direction="row" style={{ flex: 1 }}>
                <Stack style={{ height: 16, width: 16, backgroundColor: color, borderRadius: 6, alignSelf: 'center' }}/>
                <Typography viewStyle={{ marginLeft: 8, alignSelf: 'center' }} textStyle={{ color: colors.neutral.neutral_90 }}>{title}</Typography>
            </Stack>
        )
    }

    const MonthlyComparisonGraphView = memo(() => {
        return(
            <Surface elevation={4} style={{ 
                marginHorizontal: 16,
                marginTop: 24,
                padding: 16,
                backgroundColor: colors.neutral.neutral_10,
                borderRadius: 8
             }}>
                <Typography textStyle={{ fontSize: 16, fontWeight: 700, color: colors.neutral.neutral_90 }}>{t("title.monthly_comparison")}</Typography>
                <Typography viewStyle={{ marginTop: 4 }} textStyle={{ fontSize: 12, color: colors.neutral.neutral_70 }}>{t("description.monthly_comparison")}</Typography>
                { monthlyComparionData.length > 0 ?
                <Stack mt={16} >
                    <Stack direction="row">
                        <TransactionTypeView title={t('transaction.income')} color={colors.primary.main}/>
                        <TransactionTypeView title={t('transaction.spending')} color={colors.danger.main}/>
                    </Stack>
                
                    <Stack mt={24}>
                        <BarChart
                            data={monthlyComparionData}
                            barWidth={12}
                            spacing={24}
                            roundedTop
                            xAxisThickness={0}
                            yAxisThickness={0}
                            yAxisLabelWidth={50}
                            yAxisTextStyle={{color: colors.neutral.neutral_70}}
                            xAxisLabelsVerticalShift={0}
                            xAxisTextNumberOfLines={2}
                            noOfSections={6}
                            width={(Dimensions.get('window').width / 2) + 64}
                            onPress={(item: any) => ToastAndroid.show(`${item.type} ${item.monthYear}: ${currencyFormat(item.value)}`, ToastAndroid.SHORT)}
                            />
                    </Stack>
                </Stack>
                :
                <Stack mt={16}>
                    <Typography textStyle={{ color: colors.neutral.neutral_60 }}>{t('empty.chart')}</Typography>
                </Stack>
                }
            </Surface>
        )
    })

    return(
        <Page bgColor={colors.neutral.neutral_20}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 16, paddingBottom: 32 }}>
                <IncomeSpendingByCategoryGraphView type={Constants.TRANSACTION.INCOME} graphData={incomePieData}/>
                <IncomeSpendingByCategoryGraphView type={Constants.TRANSACTION.SPENDING} graphData={spendingPieData}/>
                <MonthlyComparisonGraphView />
            </ScrollView>
        </Page>
    )
}