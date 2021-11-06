import React, { useEffect } from 'react';
import { startLoadingEvents } from '../../../actions/event';
import { useDispatch, useSelector } from 'react-redux';

export const IndexEvents = () => {

    const dispatch = useDispatch();
    const {events} = useSelector(state => state.event);
    const { fetch } = useSelector(state => state.ui);

    useEffect(() => {
        dispatch(startLoadingEvents())
    }, [dispatch])

    return (
    <>

    <div className="border-bottom mt-2 mb-5">
        <h1 className="mt-2 mt-md-4 mb-3 ">Eventos</h1>
        <div className="d-flex flex-wrap flex-md-nowrap justify-content-between">
            <p>Este módulo lista todos los eventos del metaverso.</p>
        </div>
    </div>



    <div className="card box-shadow-sm bg-dark bg-opacity-50 mb-5">
        <div className="card-header">
            <h5 style={{marginBottom: "0px"}}>Listado de eventos</h5>
        </div>
        
        {
            fetch
            ?
            <div className="d-flex justify-content-center">
                <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
                </div>
            </div>
            :
            (events.length > 0)&&
            <div className="card-body">
                <div className="row mb-2">

                </div>
                <div className="table-responsive">
                    <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Correo electrónico</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        events.map((user, index) =>(
                            <tr key = {user.id}>
                                <th scope="row">{index + 1 }</th>
                                <td>
                                    <div className="rounded-circle" style = {{width: "100px", height: "100px"}}>
                                        <img src='https://i.stack.imgur.com/34AD2.jpg' alt="user" className="rounded-circle" style = {{objectFit: "cover", width: "100%", height: "100%"}}></img>
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                    </table>
                </div>
                <div className="pag mt-4">

                </div>




            </div>
            
        }
        
    </div>    





    </>
    )
}
