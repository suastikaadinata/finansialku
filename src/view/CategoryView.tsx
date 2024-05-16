/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useLayoutEffect, memo, useEffect } from 'react';
import Page from '../components/Page';
import Stack from '../components/Stack';
import Typography from '../components/Typography';
import { NavigateProps } from '../entities/GlobalProps';
import { colors } from '../styles/colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FlatList, Keyboard, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { CategoryBottomSheet } from '../components/bottomsheets/CategoryBottomSheet';
import useCategoryViewController from '../view-controller/useCategoryViewController';
import { CategoryItem } from '../entities/Category';
import { useTranslation } from 'react-i18next';

interface Props{
    category?: CategoryItem;
}

export default function CategoryView({ navigation }: NavigateProps){
    const { t } = useTranslation();
    const { categoryRef, categories, fetchCategories, onOpenCategoryBS, onCreateCategories } = useCategoryViewController()

    useEffect(() => {
        fetchCategories()
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: t('title.category'),
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: colors.neutral.neutral_10,
            },
            onBackPressed: () => navigation.goBack(),
            headerRight: () => (
                <TouchableOpacity delayPressIn={0} onPress={() => {}}>
                    <MaterialCommunityIcons 
                        name='plus'
                        size={28}
                        color={colors.neutral.neutral_90}
                        onPress={() => {
                            if(categories.length < 8){
                                onOpenCategoryBS()
                            }else{
                                ToastAndroid.show(t('description.max_category'), ToastAndroid.SHORT);
                            }
                        }}
                    />
                </TouchableOpacity>
            )
        })
    }, [navigation, categories])

    const CategoryItemView = memo(({ category }: Props) => {
        return(
            <Stack mb={12}>
                <Typography textStyle={{ fontWeight: 700, color: colors.neutral.neutral_90 }}>{category?.name}</Typography>
                <Typography textStyle={{ fontSize: 12, color: colors.neutral.neutral_60 }} viewStyle={{ marginTop: 4 }}>{category?.description ?? "-"}</Typography>
                <Divider style={{ marginTop: 8 }}/> 
            </Stack>
        )
    })

    return(
        <Page bgColor={colors.neutral.neutral_10}>
            <CategoryBottomSheet 
                ref={categoryRef}
                isAdd={true}
                height={400}
                onSubmit={(data) => {
                    Keyboard.dismiss();
                    onCreateCategories(data.name, data.description)
                }}
            />
            <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
                <Stack mb={16}>
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