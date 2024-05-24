/*
 * Created by Suastika Adinata on Fri May 03 2024
 * Copyright (c) 2024 - Made with love
 */

import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Stack from "../components/Stack";
import { colors } from "../styles/colors";
import TransactionView from "./TransactionView";
import HomeView from "./HomeView";
import AccountView from "./AccountView";
import { useTranslation } from "react-i18next";
import CategoryView from "./CategoryView";
import InsightView from "./InsightView";

const Tab = createBottomTabNavigator();

export default function MainView(){
    const { t } = useTranslation();

    return (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: colors.primary.main,
            tabBarStyle: { height: 60 },
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Transaction"
            component={TransactionView}
            options={{
              tabBarLabel: t('title.transaction'),
              tabBarLabelStyle: { fontSize: 12, paddingBottom: 8 },
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="chart-arc" color={color} size={28} />
              ),
            }}
          />
           <Tab.Screen
            name="Category"
            component={CategoryView}
            options={{
              tabBarLabel: t('title.category'),
              tabBarLabelStyle: { fontSize: 12, paddingBottom: 8 },
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="view-grid" color={color} size={28} />
              ),
            }}
          />
          <Tab.Screen
            name="Home"
            component={HomeView}
            options={{
              tabBarLabel: t('title.home'),
              tabBarLabelStyle: { fontSize: 12, paddingBottom: 8 },
              tabBarIcon: ({ color }) => (
                <Stack style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    height: 70,
                    width: 55, 
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Stack style={{ 
                        height: 52,
                        width: 52,
                        borderRadius: 26,
                        backgroundColor: "transparent",
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: color,
                        borderWidth: 1
                     }}>
                      <Stack style={{ 
                        height: 45,
                        width: 45,
                        borderRadius: 23,
                        backgroundColor: color,
                        justifyContent: 'center',
                        alignItems: 'center',
                       }}>
                        <MaterialCommunityIcons name="home" color={colors.neutral.neutral_10} size={28} />
                      </Stack>  
                    </Stack>      
                </Stack>
              ),
            }}
          />
           <Tab.Screen
            name="Insight"
            component={InsightView}
            options={{
              tabBarLabel: t("title.insight"),
              tabBarLabelStyle: { fontSize: 12, paddingBottom: 8 },
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="lightbulb-outline" color={color} size={28} />
              ),
            }}
          />
          <Tab.Screen
            name="Account"
            component={AccountView}
            options={{
              tabBarLabel: t('title.account'),
              tabBarLabelStyle: { fontSize: 12, paddingBottom: 8 },
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account-circle" color={color} size={28} />
              ),
            }}
          />
        </Tab.Navigator>
      );
}