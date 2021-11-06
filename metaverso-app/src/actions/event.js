//*******************Actions events ******************* */

import { types } from "../types/types";
import { fetchWithToken } from "../helpers/fetch";
import { finishFetch, startFetch } from "./ui";

//Set Events ___________________________________________________________________________

export const startLoadingEvents = () => {
    return async(dispatch) => {
        dispatch(startFetch());
        const resp = await fetchWithToken(`event/`,'','GET');
        const body = await resp.json();
        console.log(body)
        dispatch(finishFetch());
        if(resp.ok) {
            dispatch(setEvents(body.data));
        }
    }
};


export const setEvents = (events) => ({
    type: types.eventLoadingEvents,
    payload: events
});