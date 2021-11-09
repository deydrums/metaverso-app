import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingIndex } from '../../actions/user';
import moment from 'moment';

export const IndexScreen = () => {

    const dispatch = useDispatch()
    const { fetch } = useSelector(state => state.ui)
    const { users } = useSelector(state => state.user)
    const { name } = useSelector(state => state.auth)
    const { events } = useSelector(state => state.event)
    useEffect(() => {
        dispatch(startLoadingIndex())
    }, [dispatch])


    return (
        <>
            <div className="border-bottom mt-2 mb-5">
                <h1 className="mt-2 mt-md-4 mb-3 ">Dashboard</h1>
            </div>

            {
            fetch
            ?
            <div className="d-flex justify-content-center">
                <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
                </div>
            </div>
            :
            <div className="index_screen">
                <div className="index_data">
                    <div className="index_data_i">
                        <div className="index_data_n">
                            <h1>{users.length}</h1>
                        </div>
                        <div className="index_data_d">
                            <h2>Usuarios</h2>
                        </div>
                    </div>
                    <div className="index_data_i">
                        <div className="index_data_n">
                            <h1>{events.length}</h1>
                        </div>
                        <div className="index_data_d">
                            <h2>Eventos</h2>
                        </div>
                    </div>
                </div>
                <div className="border-bottom mt-2 mb-5">
                    <h4 className="mt-2 mt-md-4 mb-3 ">Mi ultimo evento</h4>
                </div>
                {
                    events[0] 
                    ?
                    <div className="event-content">
                        <div className="event-date">
                            <h1>{moment(events[0].created_at).format("DD")}</h1>
                            <h2>{moment(events[0].created_at).format("MMM")}</h2>
                        </div>
                        <div className="event-cont">
                            <h1>{events[0].description}</h1>
                            <h4>Creador: <strong>{name}</strong></h4>
                            <h4>Ubicacion: <strong>{events[0].location}</strong></h4>
                        </div>
                    </div>
                    :
                    <div>
                        <h3>No has creado ningun evento</h3>
                    </div>

                }
            </div>
            }

        </>
    )
}
