import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startLogout } from '../../actions/auth';

const BackUrl = process.env.REACT_APP_API_URL;


export const AsideScreen = () => {

    const {name, surname, image} = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const handleLogout = () => {
        Swal.fire({
            title: 'Quieres cerrar sesión?',
            showCancelButton: true,
            confirmButtonText: 'Cerrar sesión',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Se cerró sesión!', '', 'success')
              dispatch(startLogout())
            } 
          })
    }

    return (
        <aside className="__p-aside">
            <div className="__aside-usrprofile">

                <div className="__aside-userphoto">
                    <div className="rounded-circle" style = {{width: "70px", height: "70px"}}>
                                {
                                    image
                                    ?
                                        <img src={`${BackUrl}/auth/image/${image}`} alt="user" className="rounded-circle" style = {{objectFit: "cover", width: "100%", height: "100%"}}></img>
                                    :
                                        <img src='https://i.stack.imgur.com/34AD2.jpg' alt="user" className="rounded-circle" style = {{objectFit: "cover", width: "100%", height: "100%"}}></img>    
                                }
                    </div>
                </div>

                <div className="__aside-userdesc">
                    <div className="__aside-buttonlogout">
                        <button className = "btn" onClick = {handleLogout}><i className="fas fa-sign-out-alt m-1"></i>Cerrar sesión</button>
                    </div>
                    <h3>{name} {surname}</h3>
                    <Link to="/panel/perfil" className="m-1">
                        <i className="fas fa-cog m-1"></i>
                        Ajustes de usuario
                    </Link>
                </div>
            </div>

            <div className="__aside-options" >
                <NavLink exact to = "/panel" className="__aside-option mb-2"  activeClassName = "__aside-opcion--active" >
                    <div className="__aside-option_icon">
                        <i className="fas fa-home"></i>
                    </div>
                    <div className="__aside-option_text">
                        Inicio
                    </div>
                </NavLink>

                <NavLink exact to = "/panel/usuarios" className="__aside-option mb-2"  activeClassName = "__aside-opcion--active" >
                    <div className="__aside-option_icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="__aside-option_text">
                        Usuarios
                    </div>
                </NavLink>

            </div>

    </aside>
    )
}
