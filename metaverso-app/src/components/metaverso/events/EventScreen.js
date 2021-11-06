import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingEvent } from '../../../actions/event';

export const EventScreen = ({match})  => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoadingEvent(match.params.id))
    }, [dispatch])

    return (
        <div>
            Event
        </div>
    )
}
