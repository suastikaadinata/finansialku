/*
 * Created by Suastika Adinata on Mon May 06 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { memo, useEffect } from "react";
import Page from "../components/Page";
import Stack from "../components/Stack";
import { colors } from "../styles/colors";
import Typography from "../components/Typography";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";
import { Divider, Surface } from "react-native-paper";
import { FlatList, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PieChart } from "react-native-gifted-charts";
import useHomeViewController from "../view-controller/useHomeViewController";
import { useTranslation } from "react-i18next";
import { currencyFormat } from "../utils/Utilities";
import { useIsFocused } from "@react-navigation/native";
import Constants from "../data/Constants";
import { TransactionItem } from "../entities/Transaction";
import moment from "moment";

interface Props{
    isIncome?: boolean;
    isLast?: boolean;
    transaction?: TransactionItem;
}

export default function HomeView(){
    const { t } = useTranslation();
    const isFocused = useIsFocused();
    const { pieData, totalIncome, totalSpending, totalBalance, transactionData, fetchTransaction } = useHomeViewController();

    useEffect(() => {
        if(isFocused) fetchTransaction()
    }, [isFocused])

    const HeaderView = () => {
        return(
            <Stack style={{ 
                width: '100%',
                height: 225,
                backgroundColor: colors.primary.main,
                borderBottomRightRadius: 24,
                borderBottomLeftRadius: 24
            }}>
                <Stack style={{ alignSelf: 'center', marginTop: 32, alignItems: 'center' }}>
                    <Icon type="fontawesome" name="account-circle" size={50} color={colors.neutral.neutral_10} />
                    <Typography textStyle={{ fontSize: 16, fontWeight: 700, color: colors.neutral.neutral_10, marginTop: 8 }}>{t('your_balance_this_month_is')}</Typography>
                    <Stack mt={12} style={{ alignItems: 'center' }}>
                        <View style={{ backgroundColor: colors.neutral.neutral_10, height: 1, width: 150, marginBottom: 12 }}/>
                        <Typography textStyle={{ fontSize: 32, fontWeight: 700, color: colors.neutral.neutral_10 }}>{currencyFormat(totalBalance)}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        )
    }

    const IncomeSpendingView = () => {
        return(
            <Stack mt={-32} direction="row">
                <Stack style={{ flex: 1 }}>
                    <Surface elevation={4} style={{ backgroundColor: colors.neutral.neutral_10, borderRadius: 8, marginLeft: 16, marginRight: 8, padding: 12, alignItems: 'center' }}>
                        <Stack direction="row">
                            <MaterialCommunityIcons name="arrow-up" color={colors.success.main} size={18}/>
                            <Typography textStyle={{ alignSelf: 'center' }} viewStyle={{ marginLeft: 4 }}>{t('transaction.income')}</Typography>
                        </Stack>
                        <Typography textStyle={{ color: colors.success.main, fontSize: 18, fontWeight: 700, marginTop: 2 }}>{currencyFormat(totalIncome)}</Typography>
                    </Surface>
                </Stack>
                <Stack style={{ flex: 1 }}>
                    <Surface elevation={4} style={{ backgroundColor: colors.neutral.neutral_10, borderRadius: 8, marginLeft: 8, marginRight: 16, padding: 12, alignItems: "center" }}>
                        <Stack direction="row">
                            <MaterialCommunityIcons name="arrow-down" color={colors.danger.main} size={18}/>
                            <Typography textStyle={{ alignSelf: 'center' }} viewStyle={{ marginLeft: 4 }}>{t('transaction.spending')}</Typography>
                        </Stack>
                        <Typography textStyle={{ color: colors.danger.main, fontSize: 18, fontWeight: 700, marginTop: 2 }}>{currencyFormat(totalSpending)}</Typography>
                    </Surface>
                </Stack>
            </Stack>
        )
    }

    const MonthlyBudgetView = () => {
        return(
            <Surface elevation={4} style={{ 
                marginHorizontal: 16,
                marginTop: 24,
                padding: 16,
                backgroundColor: colors.neutral.neutral_10,
                borderRadius: 8
             }}>
                <Typography textStyle={{ fontSize: 16, fontWeight: 700, color: colors.neutral.neutral_90 }}>{t('your_monthly_budget')}</Typography>
                <Typography textStyle={{ color: colors.neutral.neutral_70 }} viewStyle={{ marginTop: 2 }}>{t("spend_minus_total", { spend: "Rp. 150.000", total: "Rp. 500.00" })}</Typography>
                <Stack mt={16} style={{ alignItems: 'center' }}>
                    <PieChart
                        donut
                        innerRadius={80}
                        data={pieData}
                        centerLabelComponent={() => {
                            return <Typography textStyle={{fontSize: 30}}>70%</Typography>;
                        }}
                    />
                </Stack>
            </Surface>
        )
    }

    const TransactionItemView = memo(({ isIncome, transaction, isLast }: Props) => {
        return(
            <Stack mb={12}>
                <Stack direction="row">
                    <Stack style={{ padding: 12, backgroundColor: isIncome ? colors.success.surface : colors.danger.surface, borderRadius: 8 }}>
                        <MaterialCommunityIcons name={isIncome ? "cash-plus" : "credit-card-minus"} size={24} color={isIncome ? colors.success.main : colors.danger.main}/>
                    </Stack>
                    <Stack ml={8} mr={8} style={{ alignSelf: 'center', flex: 1 }}>
                        <Typography textStyle={{ color: colors.neutral.neutral_90, fontWeight: 700 }}>{transaction?.name}</Typography>
                        <Typography textStyle={{ color: colors.neutral.neutral_70 }} viewStyle={{ marginTop: 2 }}>{moment.unix(Number(transaction?.date ?? 0)).format("DD MMM YYYY")}</Typography>
                    </Stack>
                    <Typography viewStyle={{ alignSelf: 'center' }} textStyle={{ fontSize: 16, fontWeight: 700, color: isIncome ? colors.success.main : colors.danger.main  }}>{isIncome ? "+": "-"} {currencyFormat(transaction?.amount)}</Typography>
                </Stack>
                { isLast ? null : <Divider style={{ marginTop: 12 }}/> }
            </Stack>
        )
    })

    const LatestTransactionView = () => {
        return(
            <Surface elevation={4} style={{ flex: 1, marginTop: 24, backgroundColor: colors.neutral.neutral_10, padding: 16 }}>
                <Typography textStyle={{ color: colors.neutral.neutral_90, fontWeight: 700, fontSize: 16 }}>
                    {t('latest_transaction')}
                </Typography>
                <FlatList 
                    data={transactionData}
                    contentContainerStyle={{ marginVertical: 16, paddingBottom: 8 }}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => <TransactionItemView isIncome={item.type == Constants.TRANSACTION.INCOME} transaction={item} isLast={index == (transactionData.length - 1)}/>}
                    ListEmptyComponent={() => <Typography textStyle={{ color: colors.neutral.neutral_60 }}>{t('empty.latest_transaction')}</Typography>}
                />
            </Surface>
        )
    }

    return(
        <Page bgColor={colors.neutral.neutral_20}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <HeaderView />
                <IncomeSpendingView />
                <MonthlyBudgetView />
                <LatestTransactionView />
            </ScrollView>
        </Page>
    )
}