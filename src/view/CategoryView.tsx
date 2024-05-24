/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { memo, useEffect } from 'react';
import Page from '../components/Page';
import Stack from '../components/Stack';
import Typography from '../components/Typography';
import { colors } from '../styles/colors';
import { FlatList, Keyboard, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import { IconButton, Surface } from 'react-native-paper';
import { CategoryBottomSheet } from '../components/bottomsheets/CategoryBottomSheet';
import useCategoryViewController from '../view-controller/useCategoryViewController';
import { CategoryItem } from '../model/Category';
import { useTranslation } from 'react-i18next';
import { currencyFormat } from '../utils/Utilities';

interface Props{
    category?: CategoryItem;
}

export default function CategoryView(){
    const { t } = useTranslation();
    const { 
        categoryRef, 
        categories, 
        selectedCategory, 
        isEdit, 
        last30day,
        currentDate,
        fetchCategories, 
        onSelectedCategory, 
        onCreateCategories, 
        onUpdateCategories,
        onPressAddCategory
    } = useCategoryViewController()

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
                    onPress={onPressAddCategory}
                />
            </Stack>
        )
    }

    const CategoryItemView = memo(({ category }: Props) => {
        const persentage = ((category?.total_transaction ?? 0) / (category?.budget ?? 0)) * 100
        const color = persentage > 90 ? colors.danger.main : persentage > 70 ? colors.secondary.main : colors.success.main

        return(
            <Surface elevation={2} style={{ borderRadius: 8, marginVertical: 8, marginHorizontal: 16, backgroundColor: colors.neutral.neutral_10 }}>
                <TouchableOpacity style={{ padding: 12 }} onPress={() => onSelectedCategory(category!)}>
                    <Stack direction='row'>
                        <Typography viewStyle={{ flex: 1, marginRight: 8 }} textStyle={{ fontWeight: 700, color: colors.neutral.neutral_90 }}>{category?.name}</Typography>
                        <Typography textStyle={{ fontSize: 12, color: colors.neutral.neutral_90 }} viewStyle={{ marginTop: 4 }}>{t("title.budget")}: {currencyFormat(category?.budget)}</Typography>
                    </Stack>
                    <Stack mt={4} mb={4} style={{ width: '100%', backgroundColor: colors.neutral.neutral_30, borderRadius: 3 }}>
                        <Stack style={{ width: `${persentage > 100 ? 100 : persentage}%`, backgroundColor: color, height: 6, borderTopLeftRadius: 3, borderBottomLeftRadius: 3  }}/>
                    </Stack>
                    <Stack mt={2}>
                        <Typography textStyle={{ fontSize: 10, color: colors.neutral.neutral_70 }}>{t('category_budget_spending', { spending: currencyFormat(category?.total_transaction ?? 0), budget: currencyFormat(category?.budget ?? 0)})}</Typography>
                    </Stack>
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
            <ScrollView 
                contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
                refreshControl={<RefreshControl refreshing={false} onRefresh={fetchCategories}/>}>
                <Stack mb={12} ml={16} mr={16}>
                    <Typography textStyle={{ textAlign: 'center', fontSize: 16, fontWeight: 700, color: colors.neutral.neutral_90 }}>{categories.length == 0 ? t('description.category') : t('description.max_category')}</Typography>
                    { categories.length > 0 ?
                    <Typography viewStyle={{ marginTop: 4 }} textStyle={{ textAlign: 'center', fontSize: 12, color: colors.neutral.neutral_70 }}>({ last30day } - {currentDate})</Typography> : null }
                </Stack>
                <FlatList 
                    data={categories}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    renderItem={(item) => <CategoryItemView key={item.index} category={item.item}/>}
                />
            </ScrollView>
        </Page>
    )
}