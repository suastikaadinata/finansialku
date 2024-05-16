/*
 * Created by Suastika Adinata on Sun May 12 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { ComponentProps, forwardRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { colors } from '../../styles/colors';

export const BaseBottomSheet = forwardRef(({ children, ...props }: { children: React.ReactNode & ComponentProps<typeof RBSheet>}, ref) => {
    return (
        <RBSheet
            ref={ref}
            closeOnPressMask={true}
            closeOnPressBack={true}
            draggable
            customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0,0,0,0.5)"
                },
                draggableIcon: {
                    backgroundColor: colors.neutral.neutral_60,
                    width: 60
                },
                container: {
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                }
            }}
        {...props}>
            {children}
        </RBSheet>
    )
})


