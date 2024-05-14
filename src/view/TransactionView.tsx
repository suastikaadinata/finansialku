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

interface Props{
    isSelected?: boolean;
    title?: string;
    onPress?: () => void;
    color?: string;
    isIncome?: boolean;
    isLast?: boolean;
}

export default function TransactionView(){
    const { t } = useTranslation();
    const { selectedType, onSelectedType, pieData } = useTransactionViewController();

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
                        onPress={() => console.log('Pressed')}
                    />
                </Stack>
                <IconButton 
                    mode="contained"
                    containerColor={colors.primary.main}
                    icon="plus"
                    iconColor={colors.neutral.neutral_10}
                    size={20}
                    onPress={() => console.log('Pressed')}
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
                <TypeView isSelected={selectedType == 'income'} title={t('title.income')} onPress={() => onSelectedType('income')}/>
                <TypeView isSelected={selectedType == 'spending'} title={t('title.spending')} onPress={() => onSelectedType('spending')}/>
            </Surface>
        )
    }

    const CategoryItemView = ({ title, color }: Props) => {
        return(
            <Stack direction="row" style={{ flexWrap: 'wrap' }}>
                <Stack style={{ height: 10, width: 10, backgroundColor: color, borderRadius: 2, alignSelf: 'center' }}/>
                <Typography viewStyle={{ flex: 1, marginLeft: 6 }}>{title}</Typography>
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
                        />
                    </Stack>
                    <Stack ml={8} style={{ flex: 1, alignContent: 'center' }}>
                        <FlatList 
                            data={pieData}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={(item) => (
                                <CategoryItemView title={`${item.item.title}`} color={item.item.color}/>
                            )}
                        />
                    </Stack>
                </Stack>
                <Stack direction="row" mt={24} style={{ justifyContent: 'space-between' }}>
                    <Typography textStyle={{ fontSize: 14, fontWeight: 700, color: colors.neutral.neutral_90, alignSelf: 'flex-end' }}>{t('total_spending_a_month')}:</Typography>
                    <Typography textStyle={{ fontSize: 20, fontWeight: 700, color: colors.danger.main }}>Rp. 300.000</Typography>
                </Stack>
            </Surface>
        )
    }

    const TransactionItemView = memo(({ isIncome, isLast }: Props) => {
        return(
            <Stack mb={12}>
                <Stack direction="row">
                    <Stack style={{ padding: 12, backgroundColor: isIncome ? colors.success.surface : colors.danger.surface, borderRadius: 8 }}>
                        <MaterialCommunityIcons name={isIncome ? "cash-plus" : "credit-card-minus"} size={24} color={isIncome ? colors.success.main : colors.danger.main}/>
                    </Stack>
                    <Stack ml={8} mr={8} style={{ alignSelf: 'center', flex: 1 }}>
                        <Typography textStyle={{ color: colors.neutral.neutral_90, fontWeight: 700 }}>Kopi Skena</Typography>
                        <Typography textStyle={{ color: colors.neutral.neutral_70 }} viewStyle={{ marginTop: 2 }}>24 Mar 2024</Typography>
                    </Stack>
                    <Typography viewStyle={{ alignSelf: 'center' }} textStyle={{ fontSize: 16, fontWeight: 700, color: isIncome ? colors.success.main : colors.danger.main  }}>{isIncome ? "+": "-"} Rp. 50.000</Typography>
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
                    data={[1, 2, 3, 4, 5]}
                    contentContainerStyle={{ marginVertical: 16, paddingBottom: 8 }}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => <TransactionItemView isIncome={item % 2 === 0} isLast={index == 4}/>}
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