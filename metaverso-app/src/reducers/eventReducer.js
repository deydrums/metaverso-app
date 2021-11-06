//******************* authReducer ******************* */

import { types } from "../types/types"

const initialState = {
    events:{},
    event: {}
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

        case types.eventLoadingEvent:
            return{
                ...state,
                event: action.payload
            }
        case types.eventUnsetEvent:
            return{
                ...state,
                event: initialState.event
            }    

        default:
            return state;
    }
}