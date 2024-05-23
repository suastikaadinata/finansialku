/*
 * Created by Suastika Adinata on Fri May 17 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { memo, useEffect } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import Stack from "./Stack";
import Typography from "./Typography";
import CustomButton from "./CustomButton";
import { Divider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TransactionItem } from "../model/Transaction";
import { colors } from "../styles/colors";
import moment from "moment";
import { currencyFormat } from "../utils/Utilities";
import { Easing } from "react-native";

interface Props{
    onPress?: () => void;
    isIncome?: boolean;
    isLast?: boolean;
    transaction?: TransactionItem;
    isSelectedID: string;
    onDelete?: () => void;
    onEdit?: () => void;
}

export const TransactionItemViewAnimated = memo(({ isIncome, isLast, transaction, isSelectedID, onPress, onDelete, onEdit }: Props) => {
    let animatedHeight = new Animated.Value(0)

    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: isSelectedID != transaction?.id ? 0 : 300,
            duration: 300,
            easing: Easing.linear, 
            useNativeDriver: false
        }).start();
    }, [isSelectedID])
    
    return(
        <TouchableOpacity delayPressIn={0} style={{ marginBottom: 12 }} onPress={onPress}>
            <Stack direction="row">
                <Stack style={{ padding: 12, backgroundColor: isIncome ? colors.success.surface : colors.danger.surface, borderRadius: 8 }}>
                    <MaterialCommunityIcons name={isIncome ? "cash-plus" : "credit-card-minus"} size={24} color={isIncome ? colors.success.main : colors.danger.main}/>
                </Stack>
                <Stack ml={8} mr={8} style={{ alignSelf: 'center', flex: 1 }}>
                    <Typography textStyle={{ color: colors.neutral.neutral_90, fontWeight: 700 }}>{transaction?.name}</Typography>
                    <Typography textStyle={{ color: colors.neutral.neutral_70 }} viewStyle={{ marginTop: 2 }}>{moment.unix(Number(transaction?.date ?? 0)).format("DD MMM YYYY")}</Typography>
                </Stack>
                <Typography viewStyle={{ alignSelf: 'center' }} textStyle={{ fontSize: 16, fontWeight: 700, color: isIncome ? colors.success.main : colors.danger.main  }}>{isIncome ? "+": "-"} {currencyFormat(transaction?.amount)}</Typography>
            </Stack>
            <Animated.View style={{ maxHeight: animatedHeight }}>
                <Stack direction="row" pt={12}>
                    <Stack mr={8} style={{ flex: 1 }}>
                        <CustomButton icon={
                            <MaterialCommunityIcons
                                name="trash-can"
                                size={18}
                                color={colors.danger.main}
                            />
                        }
                        titleStyle={{ alignSelf: 'center', paddingHorizontal: 6, color: colors.danger.main }} 
                        buttonStyle={{ borderColor: colors.danger.main, borderRadius: 8 }}
                        size="sm" color={'error'} type="outline" title={'Delete'}
                        onPress={onDelete}/>
                    </Stack>
                    <Stack ml={8} style={{ flex: 1 }}>
                        <CustomButton icon={
                            <MaterialCommunityIcons
                                name="pencil"
                                size={18}
                                color={colors.primary.main}
                            />
                        } 
                        titleStyle={{ alignSelf: 'center', paddingHorizontal: 6 }} 
                        size="sm" type="outline" color={'primary'} title={'Edit'}
                        onPress={onEdit}/>
                    </Stack>
                </Stack>
            </Animated.View>
            { isLast ? null : <Divider style={{ marginTop: 12 }}/> }
        </TouchableOpacity>
    )
})