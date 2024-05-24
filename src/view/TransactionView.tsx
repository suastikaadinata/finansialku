/*
 * Created by Suastika Adinata on Wed May 08 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useEffect } from "react";
import Page from "../components/Page";
import { colors } from "../styles/colors";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import Stack from "../components/Stack";
import Typography from "../components/Typography";
import { IconButton, Surface } from "react-native-paper";
import useTransactionViewController from "../view-controller/useTransactionViewController";
import { useTranslation } from "react-i18next";
import { NavigateProps } from "../model/GlobalProps";
import Constants from "../data/Constants";
import { TransactionItem } from "../model/Transaction";
import { TransactionItemViewAnimated } from "../components/TransactionItemViewAnimated";
import { RefreshControl } from "react-native";

interface Props{
    isSelected?: boolean;
    title?: string;
    onPress?: () => void;
    color?: string;
    isIncome?: boolean;
    isLast?: boolean;
    transaction?: TransactionItem;
}

export default function TransactionView({ navigation }: NavigateProps){
    const { t } = useTranslation();
    const { 
        selectedType, 
        selectedItem, 
        transactionData, 
        onSelectedType, 
        onSelectedItem, 
        doHandlingOnGoBack, 
        fetchCategories,
        onOpenDeleteConfirmation,
        onGoAddTransactionPageHandling,
        doRefreshing  
    } = useTransactionViewController();

    useEffect(() => {
        fetchCategories()
    }, [])

    const HeaderView = () => {
        return(
            <Stack direction="row" p={16}>
                <Typography textStyle={{ flex: 1, fontWeight: 700, color: colors.neutral.neutral_90, fontSize: 22, marginRight: 4 }} viewStyle={{ alignSelf: 'center' }}>
                    {t('title.transaction')}
                </Typography>
                <IconButton 
                    mode="contained"
                    containerColor={colors.primary.main}
                    icon="plus"
                    iconColor={colors.neutral.neutral_10}
                    size={20}
                    onPress={() => {
                        onGoAddTransactionPageHandling(() => {
                            navigation.navigate('AddTransaction', {
                                onGoBack: (type: string) => {
                                    navigation.goBack()
                                    doHandlingOnGoBack(type)
                                }
                            })
                        })    
                    }}
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
                <TypeView isSelected={selectedType == Constants.TRANSACTION.INCOME} title={t('transaction.income')} onPress={() => onSelectedType(Constants.TRANSACTION.INCOME)}/>
                <TypeView isSelected={selectedType == Constants.TRANSACTION.SPENDING} title={t('transaction.spending')} onPress={() => onSelectedType(Constants.TRANSACTION.SPENDING)}/>
            </Surface>
        )
    }

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
                    ListEmptyComponent={() => (
                        <Typography textStyle={{ color: colors.neutral.neutral_60 }}>{t('empty.latest_transaction')}</Typography>
                    )}
                    renderItem={({ item, index }) => ( 
                        <TransactionItemViewAnimated 
                            key={index}
                            isSelectedID={selectedItem} 
                            isIncome={item.type == Constants.TRANSACTION.INCOME}  
                            isLast={index == (transactionData.length - 1)} 
                            transaction={item}
                            onPress={() => onSelectedItem(selectedItem == item.id ? '' : (item.id ?? ''))}
                            onDelete={onOpenDeleteConfirmation}
                            onEdit={() => navigation.navigate('AddTransaction', {
                                onGoBack: (type: string) => {
                                    navigation.goBack()
                                    doHandlingOnGoBack(type)
                                },
                                initialData: item,
                                isEdit: true
                            })}
                        />
                    )}
                />
            </Surface>
        )
    }

    return(
        <Page bgColor={colors.neutral.neutral_20}>
            <HeaderView />
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={<RefreshControl refreshing={false} onRefresh={doRefreshing}/>}>
                <IncomeSpendingTypeView />
                <LatestTransactionView />
            </ScrollView>
        </Page>
    )
}