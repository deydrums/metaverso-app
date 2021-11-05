import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { startRegister } from '../../actions/auth';

export const RegisterScreen = () => {

    //redux
    const dispatch = useDispatch();
    const {msgError, fetch} = useSelector(state => state.ui);

    //useEffect hook

    useEffect(() => {
        dispatch(removeError());
    }, [dispatch])


    //useform hook
    const [formValues, handleInputChange] = useForm({
        name: 'David',
        email: 'dagarcia100@gmail.com',
        password: '12345678',
        password_confirm: '12345678'
    });

    const {name, email, password, password_confirm} = formValues;

    //submit event
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()){
            dispatch(startRegister(name, email, password))
        }
    };

    //form validate
    const isFormValid = () =>{
        if(name.trim().length ===0){
            dispatch(setError('Nombre es requerido'));
            return false;
        }else if(!validator.isEmail(email)){
            dispatch(setError('Ingresa un email valido'));
            return false;
        }else if (password.length < 8|| password_confirm.length < 8){
            dispatch(setError('La contraseña debe de ser como minimo de 8 caracteres'));
            return false;
        }else if (password !== password_confirm || password.length < 8){
            dispatch(setError('Las contraseñas no coinciden'));
            return false;
        }
        dispatch(removeError());
        return true;
    };
    
    return (
        <>
            <h3 className="auth__title">Registrarse</h3>
            {
                msgError&&<div className="auth__alert-error">{msgError}</div>
            }
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre..."
                    name = "name"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={name}

                />
                <input
                    type="text"
                    placeholder="Email..."
                    name = "email"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={email}

                />
                <input
                    type="password"
                    placeholder="Contraseña..."
                    name = "password"
                    className="auth__input"
                    onChange={handleInputChange}
                    value={password}

                />
                <input
                    type="password"
                    placeholder="Confirmar contraseña..."
                    name = "password_confirm"
                    className="auth__input"
                    onChange={handleInputChange}
                    value={password_confirm}

                />
                <button
                    type="submit"
                    className = "btn btn-auth"
                    disabled={fetch}
                >
                    {
                        fetch? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:<span>Registrarse</span>
                    }
                </button>
              
                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Logueate aquí
                </Link>
            </form>
        </>
    )
}
