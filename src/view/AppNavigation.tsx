/*
 * Created by Suastika Adinata on Wed May 15 2024
 * Copyright (c) 2024 - Made with love
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/store/hook';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import MainView from './MainView';
import CategoryView from './CategoryView';
import AddTransactionView from './AddTransactionView';
import EditAccountView from './EditAccountView';
import { routingWithAuthentication, routingWithoutAuthentication } from '../data/Routers';

const Stack = createNativeStackNavigator();

export default function AppNavigation(){
    const isAuthentication = useAppSelector(state => state.accountReducer.isAuthentication);

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                { !isAuthentication ? 
                <>
                    { routingWithoutAuthentication.map((item) => (
                        <Stack.Screen name={item.name} component={item.page}/>
                    )) }
                </>
                :
                <>
                    { routingWithAuthentication.map((item) => (
                        <Stack.Screen name={item.name} component={item.page} options={{ headerShown: item.isHeaderShown }}/>
                    ))}
                </> 
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}