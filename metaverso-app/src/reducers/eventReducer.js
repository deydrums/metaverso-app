//******************* authReducer ******************* */

import { types } from "../types/types"

const initialState = {
    events:{}
}

export const eventReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.eventLoadingEvents:
            return{
                ...state,
                events: [...action.payload]
            }
        case types.eventUnsetEvents:
            return{
                ...state,
                events: initialState.events
            }    

        default:
            return state;
    }
}