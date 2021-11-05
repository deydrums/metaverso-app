import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AsideScreen } from '../components/metaverso/AsideScreen';
import { IndexScreen } from '../components/metaverso/IndexScreen';


export const DashboardRoutes = () => {


    const btnmoreClick = () => { 
        const q = document.querySelector('.__p-aside');
        q.classList.toggle('sidebar_active');
    }

    const btnmoreOutClick = () => { 
        const q = document.querySelector('.__p-aside');
        q.classList.remove('sidebar_active');
    }


    return (
        <>
        <main className="__panel">
            <AsideScreen/>
            
            <div className="__p-content" onClick={btnmoreOutClick}>
                <div className="__p-container">

                <Switch>
                    <Route exact path="/panel/inicio" component={IndexScreen}/>
                    <Redirect to="/panel/inicio"/>
                </Switch>
                </div>
            </div>
        </main>
        <div className="button_more pointer" onClick={btnmoreClick}>
            <i className="fas fa-ellipsis-h"></i>
        </div>
        </>
    )
}
