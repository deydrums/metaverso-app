import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import validator from 'validator';
import { startLogin } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    //redux
    const dispatch = useDispatch();
    const {msgError, fetch} = useSelector(state => state.ui);

    //useform hook
    const [formValues, handleInputChange] = useForm({
        email: 'dagarcia100@gmail.com',
        password: '12345678'
    });

    const {email, password} = formValues;

    //submit event
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()){
            dispatch(startLogin(email,password))
        }
    };

    //form validate
    const isFormValid = () =>{
        if(!validator.isEmail(email)){
            dispatch(setError('Ingresa un email valido'));
            return false;
        }else if (password.length < 8){
            dispatch(setError('La contraseña debe de ser como minimo de 8 caracteres'));
            return false;
        }
        dispatch(removeError());
        return true;
    };

    return (
        <>
            <h3 className="auth__title">Iniciar sesión</h3>
            {
                msgError&&<div className="auth__alert-error">{msgError}</div>
            }
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email..."
                    name = "email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Password..."
                    name = "password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className = "btn btn-auth"
                    disabled={fetch}
                >
                    {
                        fetch? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:<span>Entrar</span>
                    }
                </button>



                <h3 className="auth__text m-2">¿No tienes una cuenta?</h3>

                <Link 
                    to="/auth/register"
                    className= "btn-register mb-5"
                >
                    Registrarse
                </Link>

                

            </form>
        </>
    )
}
