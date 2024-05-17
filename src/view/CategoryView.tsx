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
import { Divider } from 'react-native-paper';
import { CategoryBottomSheet } from '../components/bottomsheets/CategoryBottomSheet';
import useCategoryViewController from '../view-controller/useCategoryViewController';
import { CategoryItem } from '../entities/Category';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

interface Props{
    category?: CategoryItem;
}

export default function CategoryView({ navigation, route }: NavigateProps){
    const { onGoBack } = route.params
    const { t } = useTranslation();
    const { categoryRef, isUpdate, categories, selectedCategory, isEdit, fetchCategories, doDisableEdit, onOpenCategoryBS, onSelectedCategory, onCreateCategories, onUpdateCategories } = useCategoryViewController()

    useEffect(() => {
        fetchCategories()
    }, [])

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                isUpdate ? onGoBack() : navigation.goBack()
                return true;
            };
        
            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );
    
            return () => subscription.remove();
        }, [isUpdate])
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: t('title.category'),
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: colors.neutral.neutral_10,
            },
            onBackPressed: () => { 
                isUpdate ? onGoBack() : navigation.goBack()
            },
            headerRight: () => (
                <TouchableOpacity delayPressIn={0} onPress={() => {}}>
                    <MaterialCommunityIcons 
                        name='plus'
                        size={28}
                        color={colors.neutral.neutral_90}
                        onPress={() => {
                            if(categories.length < 8){
                                doDisableEdit()
                                onOpenCategoryBS()
                            }else{
                                ToastAndroid.show(t('description.max_category'), ToastAndroid.SHORT);
                            }
                        }}
                    />
                </TouchableOpacity>
            )
        })
    }, [navigation, categories, isUpdate])

    const CategoryItemView = memo(({ category }: Props) => {
        return(
            <TouchableOpacity style={{ marginBottom: 8 }} onPress={() => onSelectedCategory(category!)}>
                <Typography textStyle={{ fontWeight: 700, color: colors.neutral.neutral_90 }}>{category?.name}</Typography>
                <Typography textStyle={{ fontSize: 12, color: colors.neutral.neutral_60 }} viewStyle={{ marginTop: 4 }}>{category?.description ?? "-"}</Typography>
                <Divider style={{ marginTop: 8 }}/> 
            </TouchableOpacity>
        )
    })

    return(
        <Page bgColor={colors.neutral.neutral_10}>
            <CategoryBottomSheet 
                ref={categoryRef}
                isEdit={isEdit}
                isAdd={true}
                height={400}
                initialData={selectedCategory}
                onSubmit={(data) => {
                    Keyboard.dismiss();
                    isEdit ? onUpdateCategories(data.name, data.description) : onCreateCategories(data.name, data.description)
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