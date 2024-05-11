/*
 * Created by Suastika Adinata on Mon May 06 2024
 * Copyright (c) 2024 - Made with love
 */

import React from "react";
import { colors } from "../styles/colors";

export default function useHomeViewController(){
    const pieData = [
        {value: 70, color: colors.primary.main},
        {value: 30, color: 'lightgray'}
    ];

    return {
        pieData
    }
}