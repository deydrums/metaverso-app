import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingEvent } from '../../../actions/event';
import moment from 'moment';


const BackUrl = process.env.REACT_APP_API_URL;

export const EventScreen = ({match})  => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoadingEvent(match.params.id))
    }, [dispatch])

    const {event} = useSelector(state => state.event)
    const {fetch} = useSelector(state => state.ui);

    return (
        <>
            <div className="border-bottom mt-2">
                <h1 className="mt-2 mt-md-4 mb-3 ">Evento</h1>
            </div>
            {
            fetch
            ?
            <div className="d-flex justify-content-center">
                <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
                </div>
            </div>
            :
            <div >
                <div className="container rounded">
                    <div className="row">
                        <div className="col-md-12 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <div className="event-content">
                                    <div className="event-date">
                                        <h1>{moment(event.created_at).format("DD")}</h1>
                                        <h2>{moment(event.created_at).format("MMM")}</h2>
                                    </div>
                                    <div className="event-cont">
                                        <h1>{event.description}</h1>
                                        <h4>Creador: <strong>{event.user && event.user.name}</strong></h4>
                                        <h4>Ubicacion: <strong>{event.location}</strong></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="card box-shadow-sm bg-dark">
                    <div className="card-header">
                        <h5 style={{margiBottom: "0px"}}>Participantes</h5>
                    </div>

                    {event.participants &&
                        <div className="card-body">
                            <div style={{maxWidth: "48rem"}}>
                                <div className="form-group row align-items-center">
                                    <div className="col-md-12">
                                        <div className="table-responsive mt-3">
                                            <table className="table table-sm table-dark">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>No,</th>
                                                        <th>Imagen</th>
                                                        <th>Nombre</th>
                                                        <th>Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        event.participants.map((participant, index) =>(
                                                            <tr key = {event.id}>
                                                                <th scope="row">{index + 1 }</th>
                                                                <td>
                                                                    <div className="rounded-circle" style = {{width: "100px", height: "100px"}}>
                                                                            {
                                                                                participant.image
                                                                                ?
                                                                                
                                                                                    <img src={`${BackUrl}/auth/image/${participant.image}`} alt="user" className="rounded-circle" style = {{objectFit: "cover", width: "100%", height: "100%"}}></img>
                                                                                :
                                                                                    <img src='https://i.stack.imgur.com/34AD2.jpg' alt="user" className="rounded-circle" style = {{objectFit: "cover", width: "100%", height: "100%"}}></img>
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                <td>{participant.name}</td>
                                                                <td>{participant.email}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
 
          </div>    


            </div>
            }
        </>
    )
}
