/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useRef, useState } from "react";
import categoriesViewModel from "../view-model/categoriesViewModel";
import { CategoryItem } from "../model/Category";
import moment from "moment";

export default function useCategoryViewController(){
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

    const onSelectedCategory = (category: CategoryItem) => {
        setSelectedCategory(category)
        setIsEdit(true)
        onOpenCategoryBS()
    }

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
        onUpdateCategories
    }
}