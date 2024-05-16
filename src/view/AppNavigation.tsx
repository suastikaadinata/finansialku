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

const Stack = createNativeStackNavigator();

export default function AppNavigation(){
    const isAuthentication = useAppSelector(state => state.authReducer.isAuthentication);

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                { !isAuthentication ? 
                <>
                    <Stack.Screen name="Login" component={LoginView}/>
                    <Stack.Screen name="Register" component={RegisterView}/>
                </>
                :
                <>
                    <Stack.Screen name="Main" component={MainView}/>
                    <Stack.Screen name="Category" component={CategoryView} options={{ headerShown: true }}/>
                    <Stack.Screen name="AddTransaction" component={AddTransactionView} options={{ headerShown: true }}/>
                </> 
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}