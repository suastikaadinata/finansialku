/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategoryItem } from '../entities/Category';
import categoriesViewModel from '../view-model/categoriesViewModel';
import transactionViewModel from '../view-model/transactionViewModel';
import Constants from '../data/Constants';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { SelectItem } from '../entities/Select';
import { useBottomSheet } from '../provider/BottomSheetProvider';

export default function useAddTransactionController(){
    const { showSelectBS, hideSelectBS } = useBottomSheet()
    const { getCategories } = categoriesViewModel();
    const { doCreateTransaction, doUpdateTransaction } = transactionViewModel();
    const { t } = useTranslation();
    const [isLoadingForm, setIsLoadingForm] = useState(false)
    const [categories, setCategories] = useState<CategoryItem[]>([])
    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)
    const [date, setDate] = useState(new Date());
    const [selectedCategory, setSelectedCategory] = useState<CategoryItem>({} as CategoryItem)
    const [selectedTypeTransaction, setSelectedTypeTransaction] = useState<SelectItem>({} as SelectItem)
    const typeTransactionData: SelectItem[] = [
        { id: Constants.TRANSACTION.INCOME, name: t("transaction.income") },
        { id: Constants.TRANSACTION.SPENDING, name: t("transaction.spending") }
    ]

    const schema = yup.object({
		type: yup.string().required().label(t('title.type_transaction')),
		name: yup.string().required().label(t('title.name_transaction')),
        description: yup.string().label(t('title.description')).nullable(),
        amount: yup.number().required().label(t('title.amount')),
        category: yup.string().required().label(t('title.category')),
        date: yup.string().required().label(t('title.date_transaction'))
	}).required();
	
	const defaultValues = {
		type: "",
		name: "",
        description: "",
        amount: 0,
        category: "",
        date: ""
	};
	
	const method = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	})

    const setInitialFormData = (data: any) => {
        const typeTransaction = typeTransactionData.find(item => item.id == data.type) as SelectItem
        method.setValue('type', typeTransaction.name)
        method.setValue('name', data.name)
        method.setValue('description', data.description)
        method.setValue('amount', `${data.amount}`)
        method.setValue('date', moment.unix(data.date).format("DD MMMM YYYY"))
        const category = categories.find(item => item.id == data.category_id) as CategoryItem
        method.setValue('category', category.name)
        setSelectedTypeTransaction(typeTransaction)
        setSelectedCategory(category)
        setDate(new Date(data.date * 1000))
    }

    const onOpenSelectBottomSheet = (height: number, title: string, data: any[], selectItem: any, onSelect: (result: any) => void) => {
        showSelectBS({
            height,
            title,
            selectData: data,
            selectedItem: selectItem,
            onSelected: onSelect
        })
    }

    const onOpenTypeTransactionBS = () => {
        onOpenSelectBottomSheet(190, t('placeholder.type_transaction'), typeTransactionData, selectedTypeTransaction, onSelectedTypeTransaction)
    }

    const onOpenSelectCategoryBS = () => {
        onOpenSelectBottomSheet((75 + (50 * categories.length)), t('placeholder.category'), categories, selectedCategory, onSelectedCategory)
    }

    const fetchCategories = async() => {
        const data = await getCategories()
        setCategories(data)
    }

    const onSelectedTypeTransaction = (item: SelectItem) => {
        setSelectedTypeTransaction(item)
        method.setValue('type', item.name)
        hideSelectBS()
    }

    const onSelectedCategory = (item: CategoryItem) => {
        setSelectedCategory(item)
        method.setValue('category', item.name)
        hideSelectBS()
    }

    const onOpenDatePicker = () => {
        setIsOpenDatePicker(true)
    }

    const onCloseDatePicker = () => {
        setIsOpenDatePicker(false)
    }

    const onChangeDate = (date: Date) => {
        method.setValue('date', moment(date).format("DD MMMM YYYY"))
        setDate(date)
        onCloseDatePicker()
    }

    const onSubmitTransaction = async(data: any, onSuccess: () => void) => {
        setIsLoadingForm(true)
        await doCreateTransaction({
            type: selectedTypeTransaction.id,
            name: data.name,
            description: data.description,
            amount: data.amount,
            categoryId: selectedCategory.id,
            date: `${date}`
        }, () => {
            setIsLoadingForm(false)
            onSuccess()
        }, () => {
            setIsLoadingForm(false)
        })
    }

    const onSubmitUpdateTransaction = async(data: any, onSuccess: () => void) => {
        setIsLoadingForm(true)
        await doUpdateTransaction(data.id, {
            type: selectedTypeTransaction.id,
            name: data.name,
            description: data.description,
            amount: data.amount,
            categoryId: selectedCategory.id,
            date: `${date}`
        }, () => {
            setIsLoadingForm(false)
            onSuccess()
        }, (e: any) => {
            setIsLoadingForm(false)
        })
    }

    return{
        date,
        typeTransactionData,
        categories,
        method,
        selectedTypeTransaction,
        selectedCategory,
        isOpenDatePicker,
        isLoadingForm,
        onOpenSelectCategoryBS,
        onOpenTypeTransactionBS,
        onSelectedTypeTransaction,
        onOpenDatePicker,
        onCloseDatePicker,
        onChangeDate,
        onSelectedCategory,
        fetchCategories,
        onSubmitTransaction,
        setInitialFormData,
        onSubmitUpdateTransaction
    }
}