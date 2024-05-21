/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useRef, useState } from "react";
import categoriesViewModel from "../view-model/categoriesViewModel";
import { CategoryItem } from "../entities/Category";

export default function useCategoryViewController(){
    const { getCategories, doCreateCategories, doUpdateCategories } = categoriesViewModel();
    const [categories, setCategories] = useState<CategoryItem[]>([])
    const [isEdit, setIsEdit] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryItem>({} as CategoryItem)
    const categoryRef = useRef()

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
        const data = await getCategories()
        setCategories(data)
    }
    
    return{
        categories,
        categoryRef,
        selectedCategory,
        isEdit,
        doDisableEdit,
        onSelectedCategory,
        onOpenCategoryBS,
        onCreateCategories,
        fetchCategories,
        doCreateCategories,
        onUpdateCategories
    }
}