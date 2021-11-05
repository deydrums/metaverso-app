import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IndexScreen } from '../components/metaverso/IndexScreen';


export const DashboardRoutes = () => {

    return (
        <>
            <div>
                <Switch>
                    <Route exact path="/panel/inicio" component={IndexScreen}/>
                    <Redirect to="/panel/inicio"/>
                </Switch>
            </div>
        </>
    )
}
