//*******************Actions ui ******************* */

import { types } from "../types/types";

//errors msg ___________________________________________________________________________

export const setError = (err) => ({
    type: types.uiSetError,
    payload: err
});

export const removeError = () => ({
    type: types.uiRemoveError
});

//fetch ___________________________________________________________________________

export const startFetch = () =>({
    type: types.uiSetFetch
});

export const finishFetch = () =>({
    type: types.uiRemoveFetch
});

