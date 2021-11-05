//******************* uiReducer ******************* */


import { types } from "../types/types";


const initialState = {
    msgError: null,
    fetch: false,
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiSetError:
            return{
                ...state,
                msgError: action.payload
            }

        case types.uiRemoveError:
            return{
                ...state,
                msgError: null
            }

        case types.uiSetFetch:
            return{
                ...state,
                fetch: true
            }

        case types.uiRemoveFetch:
            return{
                ...state,
                fetch: false
            }

        default:
            return state;
    }
}