//******************* Auth Actions ******************* */

import { types } from "../types/types";
import { fetchWithToken } from "../helpers/fetch";


const setUser = (user) => ({
    type: types.authLogin,
    payload: user
});

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



