/*
 * Created by Suastika Adinata on Wed May 08 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { memo } from "react";
import Page from "../components/Page";
import { colors } from "../styles/colors";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import Stack from "../components/Stack";
import Typography from "../components/Typography";
import { Divider, IconButton, Surface } from "react-native-paper";
import useTransactionViewController from "../view-controller/useTransactionViewController";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PieChart } from "react-native-gifted-charts";
import { useTranslation } from "react-i18next";
import { NavigateProps } from "../entities/GlobalProps";
import Constants from "../data/Constants";
import { TransactionItem } from "../entities/Transaction";
import moment from "moment";
import { currencyFormat } from "../utils/Utilities";
import { GraphItem } from "../entities/Graph";

interface Props{
    isSelected?: boolean;
    title?: string;
    onPress?: () => void;
    color?: string;
    item?: GraphItem; 
    isIncome?: boolean;
    isLast?: boolean;
    transaction?: TransactionItem;
}

export default function TransactionView({ navigation }: NavigateProps){
    const { t } = useTranslation();
    const { totalMoney, pieData, selectedType, transactionData, onSelectedType, doGetTransactionByType } = useTransactionViewController();

    const HeaderView = () => {
        return(
            <Stack direction="row" p={16}>
                <Typography textStyle={{ flex: 1, fontWeight: 700, color: colors.neutral.neutral_90, fontSize: 22 }} viewStyle={{ alignSelf: 'center' }}>
                    {t('title.transaction')}
                </Typography>
                <Stack ml={4} mr={4}>
                    <IconButton 
                        mode="outlined"
                        icon="view-grid"
                        style={{ borderColor: colors.primary.main }}
                        iconColor={colors.primary.main}
                        size={20}
                        onPress={() => navigation.navigate('Category')}
                    />
                </Stack>
                <IconButton 
                    mode="contained"
                    containerColor={colors.primary.main}
                    icon="plus"
                    iconColor={colors.neutral.neutral_10}
                    size={20}
                    onPress={() => navigation.navigate('AddTransaction', {
                        onGoBack: (type: string) => {
                            navigation.goBack()
                            if(type == selectedType){
                                doGetTransactionByType(type)
                            }else{
                                onSelectedType(type)
                            }
                        }
                    })}
                />
            </Stack>
        )
    }

    const TypeView = ({ isSelected, title, onPress }: Props) => {
        return(
            <TouchableOpacity style={{ flex: 1, 
                backgroundColor: isSelected ? colors.primary.main : colors.neutral.neutral_10,
                borderRadius: 25,
                height: 50,
                alignItems: 'center', 
                justifyContent: 'center'
            }} onPress={onPress} delayPressIn={0}>
                <Typography textStyle={{ fontSize: 16, fontWeight: 700, color: isSelected ? colors.neutral.neutral_10 : colors.neutral.neutral_90 }}>
                    {title}
                </Typography>
            </TouchableOpacity>
        )
    }

    const IncomeSpendingTypeView = () => {
        return(
            <Surface style={{ flexDirection: 'row', marginTop: 8, marginHorizontal: 16, backgroundColor: colors.neutral.neutral_10, borderRadius: 25, height: 50 }}>
                <TypeView isSelected={selectedType == 'income'} title={t('transaction.income')} onPress={() => onSelectedType('income')}/>
                <TypeView isSelected={selectedType == 'spending'} title={t('transaction.spending')} onPress={() => onSelectedType('spending')}/>
            </Surface>
        )
    }

    const CategoryItemView = ({ item }: Props) => {
        return(
            <Stack direction="row" style={{ flexWrap: 'wrap' }}>
                <Stack style={{ height: 10, width: 10, backgroundColor: item!.color, borderRadius: 2, alignSelf: 'center' }}/>
                <Stack direction="row" style={{ flex: 1, marginLeft: 6, flexWrap: 'wrap' }}>
                    <Typography textStyle={{ color: colors.neutral.neutral_90 }}>{item?.title}</Typography>
                    <Typography textStyle={{ fontSize: 10, color: colors.neutral.neutral_70 }} viewStyle={{ marginLeft: 4, alignSelf: 'center' }}>({currencyFormat(item?.value)})</Typography>
                </Stack>
            </Stack>
        )
    }

    const CategoryGraphView = () => {
        return(
            <Surface elevation={4} style={{ 
                marginHorizontal: 16,
                marginTop: 24,
                padding: 16,
                backgroundColor: colors.neutral.neutral_10,
                borderRadius: 8
             }}>
                <Typography textStyle={{ fontSize: 16, fontWeight: 700, color: colors.neutral.neutral_90 }}>{t('monthly_summary')}</Typography>
                <Stack mt={16} direction="row">
                    <Stack mr={8} style={{ flex: 1, alignItems: 'center' }}>
                        <PieChart
                            donut
                            radius={75}
                            data={pieData}
                            showText
                        />
                    </Stack>
                    <Stack ml={8} style={{ flex: 1, alignContent: 'center' }}>
                        <FlatList 
                            data={pieData}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={(item) => (
                                <CategoryItemView item={item.item}/>
                            )}
                        />
                    </Stack>
                </Stack>
                <Stack direction="row" mt={24} style={{ justifyContent: 'space-between' }}>
                    <Typography textStyle={{ fontSize: 14, fontWeight: 700, color: colors.neutral.neutral_90, alignSelf: 'flex-end' }}>{selectedType == Constants.TRANSACTION.INCOME ? t('total_income_a_month') : t('total_spending_a_month')}:</Typography>
                    <Typography textStyle={{ fontSize: 20, fontWeight: 700, color: selectedType == Constants.TRANSACTION.INCOME ? colors.success.main : colors.danger.main }}>{currencyFormat(totalMoney)}</Typography>
                </Stack>
            </Surface>
        )
    }

    const TransactionItemView = memo(({ isIncome, isLast, transaction }: Props) => {
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
                    renderItem={({ item, index }) => <TransactionItemView isIncome={item.type == Constants.TRANSACTION.INCOME} isLast={index == (transactionData.length - 1)} transaction={item}/>}
                />
            </Surface>
        )
    }

    return(
        <Page bgColor={colors.neutral.neutral_20}>
            <HeaderView />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <IncomeSpendingTypeView />
                <CategoryGraphView />
                <LatestTransactionView />
            </ScrollView>
        </Page>
    )
}