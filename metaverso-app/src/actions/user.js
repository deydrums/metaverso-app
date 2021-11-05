//*******************Actions ui ******************* */

import { types } from "../types/types";
import { fetchWithToken } from "../helpers/fetch";
import { finishFetch, startFetch } from "./ui";

//Set Users ___________________________________________________________________________

export const startLoadingUsers = () => {
    return async(dispatch) => {
        dispatch(startFetch());
        const resp = await fetchWithToken(`user/`,'','GET');
        const body = await resp.json();
        dispatch(finishFetch());
        if(resp.ok) {
            dispatch(setUsers(body.data));
        }
    }
};


export const setUsers = (users) => ({
    type: types.userLoadingUsers,
    payload: users
});