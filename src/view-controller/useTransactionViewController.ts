/*
 * Created by Suastika Adinata on Wed May 08 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useState, useRef, useEffect } from "react";
import transactionViewModel from "../view-model/transactionViewModel";
import categoriesViewModel from "../view-model/categoriesViewModel";
import { TransactionItem } from "../model/Transaction";
import { useBottomSheet } from "../provider/BottomSheetProvider";
import { useTranslation } from "react-i18next";
import { CategoryItem } from "../model/Category";

export default function useTransactionViewController(){
    const { t } = useTranslation();
    const { showDeleteBS, hideDeleteBS, showAlertBS, hideAlertBS } = useBottomSheet()
    const { getTransactionByType, doDeleteTransaction } = transactionViewModel();
    const { getCategories } = categoriesViewModel();
    const [transactionData, setTransactionData] = useState<TransactionItem[]>([])
    const [categories, setCategories] = useState<CategoryItem[]>([])
    const [selectedItem, setSelectedItem] = useState('')
    const [selectedType, setSelectedType] = useState('income');

    const doGetTransactionByType = async(type: string) => {
        await getTransactionByType(type).then((data) => {
            console.log('data transaction', data)
            setTransactionData(data)
        })
    }

    const fetchCategories = async() => {
        const data = await getCategories()
        setCategories(data)
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

    const doHandlingOnGoBack = (type: string) => {
        if(type == selectedType){
            doGetTransactionByType(type)
        }else{
            onSelectedType(type)
        }

        onSelectedItem('')
    }

    const onOpenDeleteConfirmation = () => {
        showDeleteBS({
            title: t('title.delete_transaction'),
            description: t('description.delete_transaction'),
            height: 200,
            onSubmit: () => onDeleteTransaction(),
            onCancel: () => hideDeleteBS()
        })
    }

    const onDeleteTransaction = async() => {
        await doDeleteTransaction(selectedItem).then(() => {
            doGetTransactionByType(selectedType)
            hideDeleteBS()
        })
    }

    const onGoAddTransactionPageHandling = (onGoNext: () => void) => {
        if(categories.length > 0){
            onGoNext()
        }else{
            showAlertBS({
                title: t('empty.category'),
                description: t('description.category_empty'),
                height: 200,
                onSubmit: () => hideAlertBS()
            })
        }
    }

    return{
        transactionData,
        selectedType,
        selectedItem,
        onSelectedType,
        onSelectedItem,
        doGetTransactionByType,
        fetchCategories,
        doHandlingOnGoBack,
        onOpenDeleteConfirmation,
        onDeleteTransaction,
        onGoAddTransactionPageHandling
    }
}