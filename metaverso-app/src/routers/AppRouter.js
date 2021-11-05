//******************* AppRouter ******************* */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter  as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { startChecking } from "../actions/auth";
import { AuthRouter } from "./AuthRouter";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, id} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch])

    if(checking) {
        return(<h1>Cargando...</h1>)
    }

    return (
        <Router>
            <Switch>
                <PublicRoute
                    path="/auth" 
                    component ={AuthRouter}
                    isAuthenticated={!!id}
                />
                <PrivateRoute 
                    path="/panel" 
                    component ={DashboardRoutes}
                    isAuthenticated={!!id}
                />
                                
                <Redirect to = "/auth/login"/>
            </Switch>
        </Router>
    )
}
