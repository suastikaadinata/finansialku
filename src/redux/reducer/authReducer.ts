/*
 * Created by Suastika Adinata on Wed May 15 2024
 * Copyright (c) 2024 - Made with love
 */

export type AuthState = {
	isAuthentication: boolean;
}

const initialState: AuthState = {
	isAuthentication: false,
}

const authReducer = (state: AuthState = initialState, action: any) => {
	switch (action.type) {
		case "IS_LOGIN":
			return {
				...state,
				isAuthentication: action.payload.isAuthentication,
			}
        case "IS_LOGOUT":
            return {
                ...state,
                isAuthentication: false,
        }
		default:
			return state
	}
}

export default authReducer