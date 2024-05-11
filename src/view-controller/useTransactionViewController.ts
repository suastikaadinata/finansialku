/*
 * Created by Suastika Adinata on Wed May 08 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useState } from "react";
import { colors } from "../styles/colors";

export default function useTransactionViewController(){
    const [selectedType, setSelectedType] = useState('income');
    const pieData = [
        {value: 30, color: colors.primary.main, title: "Food"},
        {value: 20, color: colors.secondary.main, title: "Beverages"},
        {value: 40, color: colors.success.main, title: "Hobby"},
        {value: 10, color: colors.danger.main, title: "Fashion"}
    ];

    const onSelectedType = (type: string) => {
        setSelectedType(type);
    }

    return{
        selectedType,
        onSelectedType,
        pieData
    }
}