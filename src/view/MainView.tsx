/*
 * Created by Suastika Adinata on Fri May 03 2024
 * Copyright (c) 2024 - Made with love
 */

import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Stack from "../components/Stack";
import Typography from "../components/Typography";
import { colors, transparent } from "../styles/colors";

const Tab = createBottomTabNavigator();

export default function MainView(){
    const Feed = () => (
        <Stack>
            <Typography>Feed</Typography>
        </Stack>
    )

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
            name="Income"
            component={Feed}
            options={{
              tabBarLabel: 'Income',
              tabBarLabelStyle: { fontSize: 12, paddingBottom: 8 },
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cash-plus" color={color} size={28} />
              ),
            }}
          />
          <Tab.Screen
            name="Outcome"
            component={Feed}
            options={{
              tabBarLabel: 'Outcome',
              tabBarLabelStyle: { fontSize: 12, paddingBottom: 8 },
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="credit-card-minus" color={color} size={28} />
              ),
            }}
          />
          <Tab.Screen
            name="Home"
            component={Feed}
            options={{
              tabBarLabel: 'Home',
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
                        backgroundColor: transparent,
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
            component={Feed}
            options={{
              tabBarLabel: 'Insight',
              tabBarLabelStyle: { fontSize: 12, paddingBottom: 8 },
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="chart-box-plus-outline" color={color} size={28} />
              ),
            }}
          />
          <Tab.Screen
            name="Account"
            component={Feed}
            options={{
              tabBarLabel: 'Account',
              tabBarLabelStyle: { fontSize: 12, paddingBottom: 8 },
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account-circle" color={color} size={28} />
              ),
            }}
          />
        </Tab.Navigator>
      );
}