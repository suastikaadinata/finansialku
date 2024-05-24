/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useCallback, useRef, useState } from "react";
import categoriesViewModel from "../view-model/categoriesViewModel";
import { CategoryItem } from "../model/Category";
import moment from "moment";
import { ToastAndroid } from "react-native";
import { useTranslation } from "react-i18next";

export default function useCategoryViewController(){
    const { t } = useTranslation();
    const { doCreateCategories, doUpdateCategories, getCategoryByTransactionAmountAndBudget } = categoriesViewModel();
    const [categories, setCategories] = useState<CategoryItem[]>([])
    const [isEdit, setIsEdit] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryItem>({} as CategoryItem)
    const categoryRef = useRef()
    const last30day = moment().subtract(30, 'days').format("DD MMM YYYY")
    const currentDate = moment().format("DD MMM YYYY")

    const onOpenCategoryBS = () => {
        categoryRef?.current?.open();
    }

    const onCreateCategories = async(name: string, budget: number) => {
        await doCreateCategories(name, budget, (newData: any) => {
            console.log('newData', newData)
            categoryRef?.current?.close();
            fetchCategories()
        }, (e: any) => {
            categoryRef?.current?.close();
            console.log('e', e)
        });
    }

    const doDisableEdit = () => {
        setIsEdit(false)
    }

    const onSelectedCategory = useCallback((category: CategoryItem) => {
        setSelectedCategory(category)
        setIsEdit(true)
        onOpenCategoryBS()
    }, [selectedCategory, setIsEdit])

    const onUpdateCategories = async(name: string, budget: number) => {
        await doUpdateCategories(selectedCategory.id, name, budget, () => {
            categoryRef?.current?.close();
            fetchCategories()
        }, () => {
            categoryRef?.current?.close();
        });
    }

    const fetchCategories = async() => {
        const data = await getCategoryByTransactionAmountAndBudget()
        console.log("cat", data)
        setCategories(data)
    }

    const onPressAddCategory = () => {
        if(categories.length < 8){
            doDisableEdit()
            onOpenCategoryBS()
        }else{
            ToastAndroid.show(t('description.max_category'), ToastAndroid.SHORT);
        }
    }
    
    return{
        categories,
        categoryRef,
        selectedCategory,
        isEdit,
        last30day,
        currentDate,
        doDisableEdit,
        onSelectedCategory,
        onOpenCategoryBS,
        onCreateCategories,
        fetchCategories,
        doCreateCategories,
        onUpdateCategories,
        onPressAddCategory
    }
}