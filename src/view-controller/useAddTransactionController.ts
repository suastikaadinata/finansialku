/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */
import React, { useRef, useState } from 'react';
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

export default function useAddTransactionController(){
    const { getCategories } = categoriesViewModel();
    const { doCreateTransaction, doUpdateTransaction } = transactionViewModel();
    const { t } = useTranslation();
    const typeTransactionRef = useRef()
    const selectCategoryRef = useRef()
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
		type: yup.string().required().label("Type"),
		name: yup.string().required().label("Name"),
        description: yup.string().label("Description").nullable(),
        amount: yup.number().required().label("Amount"),
        category: yup.string().required().label("Category"),
        date: yup.string().required().label("Date")
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

    const onOpenTypeTransactionBS = () => {
        typeTransactionRef?.current?.open();
    }

    const onOpenSelectCategoryBS = () => {
        selectCategoryRef?.current?.open();
    }

    const fetchCategories = async() => {
        const data = await getCategories()
        setCategories(data)
    }

    const onSelectedTypeTransaction = (item: SelectItem) => {
        setSelectedTypeTransaction(item)
        method.setValue('type', item.name)
        typeTransactionRef?.current?.close();
    }

    const onSelectedCategory = (item: CategoryItem) => {
        setSelectedCategory(item)
        method.setValue('category', item.name)
        selectCategoryRef?.current?.close();
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

    const onSubmitTransaction = async(data: any, onSuccess: () => void, onError: (e: any) => void) => {
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
        }, (e: any) => {
            setIsLoadingForm(false)
            onError(e)
        })
    }

    const onSubmitUpdateTransaction = async(data: any, onSuccess: () => void, onError: (e: any) => void) => {
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
            onError(e)
        })
    }

    return{
        date,
        typeTransactionData,
        categories,
        method,
        typeTransactionRef,
        selectedTypeTransaction,
        selectCategoryRef,
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