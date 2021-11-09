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

//Set Event ___________________________________________________________________________

export const startLoadingEvent = (id) => {
    return async(dispatch) => {
        dispatch(startFetch());
        const resp = await fetchWithToken(`event/${id}`,'','GET');
        const body = await resp.json();
        dispatch(finishFetch());
        if(resp.ok) {
            dispatch(setEvent(body.data));
        }
    }
};


export const setEvent = (event) => ({
    type: types.eventLoadingEvent,
    payload: event
});

export const UnsetEvent = () => ({
    type: types.eventUnsetEvent
});

export const UnsetEvents = () => ({
    type: types.eventUnsetEvents
});