import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingEvent } from '../../../actions/event';

export const EventScreen = ({match})  => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoadingEvent(match.params.id))
    }, [dispatch])

    return (
        <>
            <div className="border-bottom mt-2">
                <h1 className="mt-2 mt-md-4 mb-3 ">Evento</h1>
            </div>

            <div className="container rounded">
                <div className="row">
                    <div className="col-md-12 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <div className="event-cont">
                                <div className="event-date">
                                    <div className="event-day">
                                        <h1>8</h1>
                                    </div>
                                    <div className="event-month">
                                        <h2>JUL</h2>
                                    </div>
                                </div>
                                <div className="event-cont">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
