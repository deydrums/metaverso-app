import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { startUpdate, startUpload } from '../../actions/auth';
import moment from 'moment';
import Swal from 'sweetalert2';

const BackUrl = process.env.REACT_APP_API_URL;

export const ProfileScreen = () => {

    const user = useSelector(state => state.auth);
    const {msgError, fetch} = useSelector(state => state.ui);

    const dispatch = useDispatch();

    //useEffect hooks

    useEffect(() => {
        dispatch(removeError());
    }, [dispatch])

    
    const [formValues, handleInputChange] = useForm({
        name: user.name,
        email: user.email?user.email:"",
        dpi: user.dpi?user.dpi:"",
        tel: user.tel?user.tel:"",
        birthday: user.birthday?user.birthday:"",
        gender: user.gender?user.gender:"",
    });

    const{name, email, dpi, tel, birthday, gender } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()){
            dispatch(startUpdate(formValues));
        }
    }

    //form validate
    const isFormValid = () =>{
        if(name.trim().length ===0){
            dispatch(setError('Nombre es requerido'));
            return false;
        }else if(!validator.isEmail(email)){
            dispatch(setError('Ingresa un email valido'));
            return false;
        }
        dispatch(removeError());
        return true;
    };

    const handleFileChange = (e) => {
        const file = e.target.files;
        if(file){
            dispatch(startUpload(file[0]))
        }
    }

    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click();
    }

    
    const handleDelete = () => {
        Swal.fire({
            title: 'Quieres eliminar la cuenta?',
            showCancelButton: true,
            text: 'Se eliminaran todos los eventos relacionados a tu cuenta',
            confirmButtonText: 'Cerrar sesión',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Cuenta eliminada correctamente!', '', 'success')
            } 
          })
    }


    return (
        <>

        <div className="border-bottom mt-2">
            <h1 className="mt-2 mt-md-4 mb-3 ">Ajustes de usuario</h1>
        </div>


    
        <div className="container rounded">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <div className="rounded-circle mt-5" style = {{width: "150px", height: "150px"}}>
                            {
                                user.image
                                ?
                                
                                    <img src={`${BackUrl}/auth/image/${user.image}`} alt="user" className="rounded-circle" style = {{objectFit: "cover", width: "100%", height: "100%"}}></img>
                                :
                                    <img src='https://i.stack.imgur.com/34AD2.jpg' alt="user" className="rounded-circle" style = {{objectFit: "cover", width: "100%", height: "100%"}}></img>
                            }
                        </div>
                        <button className="btn btn-success btn-sm m-2" onClick={handlePictureUpload}><i className="fas fa-upload"></i> Subir Imagen </button>
                        <span className="font-weight-bold">{user.name} {user.surname}</span>
                        <span className="text-info">{user.email}</span>
                        <span className="text-weight font-italic">Unido: {moment(user.created_at).format("DD/MM/YYYY")}</span>
                    </div>
                </div>
                <div className="col-md-9 border-right">
                    <form className="p-3 py-5" onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Datos de usuario</h4>
                        </div>
                        {msgError&&<div className="alert alert-danger text-center" role="alert">{msgError}</div>}
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <label className="labels">Nombre</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Primer nombre" 
                                    name = "name"
                                    value={name}
                                    onChange={handleInputChange}
                                />
                                </div>

                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className="labels">Email</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Numero de telefono" 
                                    name = "email"
                                    value={email}
                                    onChange={handleInputChange}
                                />
                                </div>
                            <div className="col-md-6">
                                <label className="labels">DPI</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Numero de DPI" 
                                    name = "dpi"
                                    value={dpi}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Telefono</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Numero de DPI" 
                                    name = "tel"
                                    value={tel}
                                    onChange={handleInputChange}
                                />
                            </div>

                        </div>
                        <div className="row mt-2">

                            <div className="col-md-6">
                                <label className="labels">Fecha de nacimiento</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    name = "birthday"
                                    value={birthday}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label>Genero</label>
                                <select 
                                    className="form-control" 
                                    id="exampleFormControlSelect1" 
                                    name = "gender"
                                    value={gender}
                                    onChange={handleInputChange}
                                >
                                    <option value="" defaultValue disabled hidden>Seleccionar</option>
                                    <option>Masculino</option>
                                    <option>Femenino</option>
                                </select>
                            </div>

                        </div>
                        <div className="mt-5 text-center">
                            
                            {
                                !fetch
                                ?
                                <button className="btn btn-primary profile-button m-3" type="submit">Actualizar</button>
                                :
                                <button type="button" className="btn btn-secondary profile-button m-3" disabled>
                                <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                                Espere...
                                </button>
                            }
                                                        {
                                !fetch
                                ?
                                <button className="btn btn-danger profile-button" type="button" onClick={handleDelete}>Eliminar Cuenta</button>
                                :
                                <button type="button" className="btn btn-secondary profile-button" disabled>
                                <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                                Espere...
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>

            <input
                type="file"
                style = {{display:'none'}}
                onChange={handleFileChange}
                id = "fileSelector"
                name = "file"
                max-size="10000"
            />

        </div>
    </>
    )
}
