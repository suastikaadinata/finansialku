/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useLayoutEffect, memo, useEffect, useCallback } from 'react';
import Page from '../components/Page';
import Stack from '../components/Stack';
import Typography from '../components/Typography';
import { NavigateProps } from '../entities/GlobalProps';
import { colors } from '../styles/colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FlatList, Keyboard, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native';
import { Divider, IconButton, Surface } from 'react-native-paper';
import { CategoryBottomSheet } from '../components/bottomsheets/CategoryBottomSheet';
import useCategoryViewController from '../view-controller/useCategoryViewController';
import { CategoryItem } from '../entities/Category';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { currencyFormat } from '../utils/Utilities';

interface Props{
    category?: CategoryItem;
}

export default function CategoryView({ navigation }: NavigateProps){
    const { t } = useTranslation();
    const { categoryRef, categories, selectedCategory, isEdit, fetchCategories, doDisableEdit, onOpenCategoryBS, onSelectedCategory, onCreateCategories, onUpdateCategories } = useCategoryViewController()

    useEffect(() => {
        fetchCategories()
    }, [])

    const HeaderView = () => {
        return(
            <Stack direction="row" p={16}>
                <Typography textStyle={{ flex: 1, fontWeight: 700, color: colors.neutral.neutral_90, fontSize: 22, marginRight: 4 }} viewStyle={{ alignSelf: 'center' }}>
                    {t('title.category')}
                </Typography>
                <IconButton
                    mode="contained"
                    containerColor={colors.primary.main}
                    icon="plus"
                    iconColor={colors.neutral.neutral_10}
                    size={20}
                    onPress={() => {
                        if(categories.length < 8){
                            doDisableEdit()
                            onOpenCategoryBS()
                        }else{
                            ToastAndroid.show(t('description.max_category'), ToastAndroid.SHORT);
                        }
                    }}
                />
            </Stack>
        )
    }

    const CategoryItemView = memo(({ category }: Props) => {
        return(
            <Surface elevation={2} style={{ borderRadius: 8, marginVertical: 8, marginHorizontal: 16, backgroundColor: colors.neutral.neutral_10 }}>
                <TouchableOpacity style={{ padding: 12 }} onPress={() => onSelectedCategory(category!)}>
                    <Typography textStyle={{ fontWeight: 700, color: colors.neutral.neutral_90 }}>{category?.name}</Typography>
                    <Typography textStyle={{ fontSize: 12, color: colors.neutral.neutral_90 }} viewStyle={{ marginTop: 4 }}>{t("title.budget")}: {currencyFormat(category.budget)}</Typography>
                </TouchableOpacity>
            </Surface>
        )
    })

    return(
        <Page bgColor={colors.neutral.neutral_20}>
            <CategoryBottomSheet 
                ref={categoryRef}
                isEdit={isEdit}
                isAdd={true}
                height={390}
                initialData={selectedCategory}
                onSubmit={(data) => {
                    Keyboard.dismiss();
                    isEdit ? onUpdateCategories(data.name, data.budget) : onCreateCategories(data.name, data.budget)
                }}
            />
            <HeaderView />
            <ScrollView contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}>
                <Stack mb={12} mt={8} ml={16} mr={16}>
                    <Typography textStyle={{ textAlign: 'center', fontSize: 16, fontWeight: 700, color: colors.neutral.neutral_90 }}>{t('description.category')}</Typography>
                </Stack>
                <FlatList 
                    data={categories}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={(item) => <CategoryItemView category={item.item}/>}
                />
            </ScrollView>
        </Page>
    )
}