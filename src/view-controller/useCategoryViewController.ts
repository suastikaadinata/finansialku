/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useRef, useState } from "react";
import categoriesViewModel from "../view-model/categoriesViewModel";
import { CategoryItem } from "../entities/Category";

export default function useCategoryViewController(){
    const { getCategories, doCreateCategories } = categoriesViewModel();
    const [categories, setCategories] = useState<CategoryItem[]>([])
    const categoryRef = useRef()

    const onOpenCategoryBS = () => {
        categoryRef?.current?.open();
    }

    const onCreateCategories = async(name: string, description: string | null) => {
        await doCreateCategories(name, description, (newData: any) => {
            console.log('newData', newData)
            categoryRef?.current?.close();
            fetchCategories()
        }, (e: any) => {
            console.log('e', e)
        });
    }

    const fetchCategories = async() => {
        const data = await getCategories()
        setCategories(data)
    }
    
    return{
        categories,
        categoryRef,
        onOpenCategoryBS,
        onCreateCategories,
        fetchCategories
    }
}