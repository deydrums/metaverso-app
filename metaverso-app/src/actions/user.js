//*******************Actions ui ******************* */

import { types } from "../types/types";
import { fetchWithToken } from "../helpers/fetch";
import { finishFetch, startFetch } from "./ui";
import { setEvents } from "./event";

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


export const startLoadingIndex = () => {
    return async(dispatch) => {
        dispatch(startFetch());
        const resp = await fetchWithToken(`user/index`,'','GET');
        const body = await resp.json();
        dispatch(finishFetch());
        if(resp.ok) {
            dispatch(setUsers(body.data.users));
            dispatch(setEvents(body.data.events));
        }
    }
};


export const setUsers = (users) => ({
    type: types.userLoadingUsers,
    payload: users
});


export const unsetUsers = () => ({
    type: types.userUnSetUsers
})