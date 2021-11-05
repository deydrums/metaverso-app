//******************* Auth Actions ******************* */

import { types } from "../types/types";
import { fetchWithoutToken, fetchWithToken, fileUpload } from "../helpers/fetch";
import { finishFetch, startFetch } from "./ui";
import Swal from 'sweetalert2';


//login ___________________________________________________________________________

export const startLogin = (email, password) => {
    return async(dispatch) => {
        dispatch(startFetch());
        const resp = await fetchWithoutToken('auth/login',{email,password},'POST');
        const body = await resp.json();
        dispatch(finishFetch());
        if(resp.ok) {
            localStorage.setItem('token',body.token);
            dispatch(setUser(body.data));
        }else{
            Swal.fire('Error',body.message?body.message:'Ha ocurrido un error','error');
        }
    }
}

const setUser = (user) => ({
    type: types.authLogin,
    payload: user
});

//register ___________________________________________________________________________

export const startRegister = (name, email, password) => {
    return async(dispatch) => {
        dispatch(startFetch());
        const resp = await fetchWithoutToken('auth/register',{name,email,password},'POST');
        const body = await resp.json();
        dispatch(finishFetch());
        if(resp.ok) {
            localStorage.setItem('token',body.token);
            dispatch(setUser(body.data));
        }else{
            if(body.errors){
                Swal.fire('Error',body.errors.email[0],'error');
            }else{
                Swal.fire('Error',body.message?body.message:'Ha ocurrido un error','error');
            }
        }
    }
}

//Checking token ___________________________________________________________________________

export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetchWithToken('auth/renew', '','GET');
        const body = await resp.json();
        if(resp.ok) {
            localStorage.setItem('token',body.token);
            dispatch(setUser(body.data));
        }else{
            dispatch(checkingFinish());
        }
    }
};

const checkingFinish = () => ({
    type: types.authCheckingFinish
});

//Logout ___________________________________________________________________________

export const startLogout = () => {
    return async(dispatch) => {
        localStorage.clear();
        dispatch(logout());
    }
};

const logout = () => ({
    type: types.authLogout
});

//update user ________________________________________________________________________

export const startUpdate = (values) => {
    return async(dispatch) => {
        dispatch(startFetch());
        const resp = await fetchWithToken('auth/update',values,'PUT');
        const body = await resp.json();
        dispatch(finishFetch());
        if(resp.ok) {
            dispatch(setUser(body.data));
            Swal.fire('Hecho',body.message,'success');
        }else{
            Swal.fire('Error',body.message,'error');
        }
    }
}

//upload image user ________________________________________________________________________

export const startUpload = (file) => {
    return async(dispatch) => {
        dispatch(startFetch());
        Swal.fire({ 
            title: 'Cargando...',
            text: 'Espere mientras se carga el archivo,',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const resp = await fileUpload('auth/upload',file,'POST');
        const body = await resp.json();
        dispatch(finishFetch());
        Swal.close();
        if(resp.ok) {
            dispatch(setUser(body.data));
            Swal.fire('Hecho',body.message,'success');
        }else{
            if(body.errors.file){
                Swal.fire('Error',body.errors.file[0],'error');
            }else{
                Swal.fire('Error',body.message?body.message:'Ha ocurrido un error','error');
            }
        }

    }
}