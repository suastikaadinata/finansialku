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
import { TypeTransactionItem } from '../entities/Transaction';
import Constants from '../data/Constants';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

export default function useAddTransactionController(){
    const { getCategories } = categoriesViewModel();
    const { doCreateTransaction } = transactionViewModel();
    const { t } = useTranslation();
    const typeTransactionRef = useRef()
    const selectCategoryRef = useRef()
    const [isLoadingForm, setIsLoadingForm] = useState(false)
    const [categories, setCategories] = useState<CategoryItem[]>([])
    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)
    const [date, setDate] = useState(new Date());
    const [selectedCategory, setSelectedCategory] = useState<CategoryItem>({} as CategoryItem)
    const [selectedTypeTransaction, setSelectedTypeTransaction] = useState<TypeTransactionItem>({} as TypeTransactionItem)
    const typeTransactionData: TypeTransactionItem[] = [
        { id: Constants.TRANSACTION.INCOME, name: t("transaction.income") },
        { id: Constants.TRANSACTION.SPENDING, name: t("transaction.spending") }
    ]

    const schema = yup.object({
		type: yup.string().required().label("Type"),
		name: yup.string().required().label("Name"),
        amount: yup.number().required().label("Amount"),
        category: yup.string().required().label("Category"),
        date: yup.string().required().label("Date")
	}).required();
	
	const defaultValues = {
		type: "",
		name: "",
        amount: 0,
        category: "",
        date: ""
	};
	
	const method = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	})

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

    const onSelectedTypeTransaction = (item: TypeTransactionItem) => {
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
        onSubmitTransaction
    }
}