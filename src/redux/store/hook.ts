/*
 * Created by Suastika Adinata on Wed May 15 2024
 * Copyright (c) 2024 - Made with love
 */

import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector