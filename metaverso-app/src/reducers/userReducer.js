//******************* authReducer ******************* */

import { types } from "../types/types"

const initialState = {
    users:{}
}

export const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.userLoadingUsers:
            return{
                ...state,
                users: [...action.payload]
            }
        case types.userUnSetUsers:
            return{
                ...state,
                users: initialState.users
            }    

        default:
            return state;
    }
}