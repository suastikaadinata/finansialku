/*
 * Created by Suastika Adinata on Fri May 03 2024
 * Copyright (c) 2024 - Made with love
 */

import React, { ComponentProps } from 'react';
import { Button } from '@rneui/themed';

export default function CustomButton({ ...props }: ComponentProps<typeof Button>){
    return <Button buttonStyle={{ borderRadius: 8 }} titleStyle={{ fontFamily: "Poppins-Regular" }} size='lg' {...props} />
}