/*
 * Created by Suastika Adinata on Sat May 18 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { useState, createContext, useContext, useRef, useEffect } from "react";
import { DeleteConfirmationBottomSheet } from "../components/bottomsheets/DeleteConfirmationBottomSheet";
import { SelectItem } from "../entities/Select";
import { SelectItemBottomSheet } from "../components/bottomsheets/SelectItemBottomSheet";
import { AlertBottomSheet } from "../components/bottomsheets/AlertBottomSheet";
import Constants from "../data/Constants";

type BottomSheetContextProps = {
    title?: string;
	description?: string;
    height?: number;
    selectData?: any[];
    selectedItem?: any;
    type?: string;
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
}

const initialState: BottomSheetContextType = {
    showDeleteBS: () => {},
    hideDeleteBS: () => {},
    showSelectBS: () => {},
    hideSelectBS: () => {},
    showAlertBS: () => {},
    hideAlertBS: () => {}
}

const BottomSheetContext = createContext<BottomSheetContextType>(initialState);
export const useBottomSheet = () => useContext(BottomSheetContext);

export const BottomSheetProvider = ({ children }: { children: React.ReactNode }) => {
    const deleteRef = useRef()
    const selectRef = useRef()
    const alertRef = useRef()
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
                onSubmit={bottomSheetProps.onSubmit}
            />
        </>
    }

    return (
        <BottomSheetContext.Provider value={{ showDeleteBS, hideDeleteBS, showSelectBS, hideSelectBS, showAlertBS, hideAlertBS }}>
            {renderComponent()}
            {children}
        </BottomSheetContext.Provider>
    )
}

