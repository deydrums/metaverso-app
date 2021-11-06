//******************* rootReducer ******************* */

import {combineReducers} from 'redux';
import { authReducer } from './authReducer';
import { eventReducer } from './eventReducer';
import { uiReducer } from './uiReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    user: userReducer,
    event: eventReducer
});