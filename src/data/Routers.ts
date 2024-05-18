/*
 * Created by Suastika Adinata on Sat May 18 2024
 * Copyright (c) 2024 - Made with love
 */

import { RouterItem } from "../entities/Router";
import AddTransactionView from "../view/AddTransactionView";
import CategoryView from "../view/CategoryView";
import EditAccountView from "../view/EditAccountView";
import EditPasswordView from "../view/EditPasswordView";
import LoginView from "../view/LoginView";
import MainView from "../view/MainView";
import RegisterView from "../view/RegisterView";

export const routingWithoutAuthentication: RouterItem[] = [
    { name: "Login", page: LoginView }, { name: "Register", page: RegisterView }
]

export const routingWithAuthentication: RouterItem[] = [
    { name: "Main", page: MainView, isHeaderShown: false }, 
    { name: "Category", page: CategoryView, isHeaderShown: true }, 
    { name: "AddTransaction", page: AddTransactionView, isHeaderShown: true }, 
    { name: "EditAccount", page: EditAccountView, isHeaderShown: true }, 
    { name: "EditPassword", page: EditPasswordView, isHeaderShown: true }
]