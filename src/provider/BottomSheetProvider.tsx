/*
 * Created by Suastika Adinata on Sat May 18 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useState, createContext, useContext, useRef, useEffect } from "react";
import { DeleteConfirmationBottomSheet } from "../components/bottomsheets/DeleteConfirmationBottomSheet";
import { SelectItemBottomSheet } from "../components/bottomsheets/SelectItemBottomSheet";
import { AlertBottomSheet } from "../components/bottomsheets/AlertBottomSheet";
import Constants from "../data/Constants";
import { useTranslation } from "react-i18next";

type BottomSheetContextProps = {
    title?: string;
	description?: string;
    height?: number;
    selectData?: any[];
    selectedItem?: any;
    errorCode?: number;
    type?: string;
    color?: string;
    btnTitle?: string;
    onSelected?: (value: any) => void;
	onCancel?: () => void;
	onSubmit?: () => void;
}

type BottomSheetContextType = {
    showDeleteBS: ({ ...props }: BottomSheetContextProps) => void;
    hideDeleteBS: () => void;
    showSelectBS: ({ ...props }: BottomSheetContextProps) => void;
    hideSelectBS: () => void;
    showAlertBS: ({ ...props }: BottomSheetContextProps) => void;
    hideAlertBS: () => void;
    showErrorBS: ({ ...props }: BottomSheetContextProps) => void;
}

const initialState: BottomSheetContextType = {
    showDeleteBS: () => {},
    hideDeleteBS: () => {},
    showSelectBS: () => {},
    hideSelectBS: () => {},
    showAlertBS: () => {},
    hideAlertBS: () => {},
    showErrorBS: () => {}
}

const BottomSheetContext = createContext<BottomSheetContextType>(initialState);
export const useBottomSheet = () => useContext(BottomSheetContext);

export const BottomSheetProvider = ({ children }: { children: React.ReactNode }) => {
    const deleteRef = useRef()
    const selectRef = useRef()
    const alertRef = useRef()
    const { t } = useTranslation();
    const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetContextProps>({})

    useEffect(() => {
        if(bottomSheetProps.type){
            switch(bottomSheetProps.type){
                case Constants.BOTTOM_SHEET.DELETE:
                    deleteRef?.current?.open()
                    break;
                case Constants.BOTTOM_SHEET.SELECT:
                    selectRef?.current?.open()
                    break;
                case Constants.BOTTOM_SHEET.ALERT:
                    console.log("alert", bottomSheetProps)
                    alertRef?.current?.open()
                    break;
            }
        }
    }, [bottomSheetProps])

    const showDeleteBS = ({ ...props }: BottomSheetContextProps) => {
        setBottomSheetProps({ type: Constants.BOTTOM_SHEET.DELETE, ...props })
    }

    const hideDeleteBS = () => {
        deleteRef?.current?.close()
    }

    const showSelectBS = ({ ...props }: BottomSheetContextProps) => {
        setBottomSheetProps({ type: Constants.BOTTOM_SHEET.SELECT, ...props })
    }

    const hideSelectBS = () => {
        selectRef?.current?.close()
    }

    const showAlertBS = ({ ...props }: BottomSheetContextProps) => {
        setBottomSheetProps({ type: Constants.BOTTOM_SHEET.ALERT, ...props })
    }

    const hideAlertBS = () => {
        alertRef?.current?.close()
    }

    const showErrorBS = ({ ...props }: BottomSheetContextProps) => {
        setBottomSheetProps({ 
            title: (props.errorCode && props.errorCode == 500) ? t("error.title.internal_server_error") : props.title,
            description: (props.errorCode && props.errorCode == 500) ? t("error.description.internal_server_error") : props.description,
            color: 'error',
            height: props.height ? props.height : 200,
            type: Constants.BOTTOM_SHEET.ALERT, 
            btnTitle: t("title.close"),
            onSubmit: () => hideAlertBS(),
            ...props })
    }

    const renderComponent = () => {
        return <>
            <DeleteConfirmationBottomSheet 
                ref={deleteRef} 
                title={bottomSheetProps.title}
                description={bottomSheetProps.description}
                height={bottomSheetProps.height ?? 0}
                onCancel={hideDeleteBS}
                onDelete={bottomSheetProps.onSubmit}/>

            <SelectItemBottomSheet  
                ref={selectRef} 
                height={bottomSheetProps.height ?? 0} 
                title={bottomSheetProps.title}
                data={bottomSheetProps.selectData} 
                selectedItem={bottomSheetProps.selectedItem} 
                onSelected={bottomSheetProps.onSelected}/>

            <AlertBottomSheet 
                ref={alertRef} 
                title={bottomSheetProps.title}
                description={bottomSheetProps.description}
                height={bottomSheetProps.height ?? 0}
                color={bottomSheetProps.color}
                btnTitle={bottomSheetProps.btnTitle}
                onSubmit={bottomSheetProps.onSubmit}
            />
        </>
    }

    return (
        <BottomSheetContext.Provider value={{ showDeleteBS, hideDeleteBS, showSelectBS, hideSelectBS, showAlertBS, hideAlertBS, showErrorBS }}>
            {renderComponent()}
            {children}
        </BottomSheetContext.Provider>
    )
}

