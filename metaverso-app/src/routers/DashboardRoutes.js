import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AsideScreen } from '../components/metaverso/AsideScreen';
import { IndexScreen } from '../components/metaverso/IndexScreen';
import { ProfileScreen } from '../components/metaverso/ProfileScreen';
import { UsersScreen } from '../components/metaverso/UsersScreen';


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
                    <Route exact path="/panel" component={IndexScreen}/>
                    <Route exact path="/panel/perfil" component={ProfileScreen}/>
                    <Route exact path="/panel/usuarios" component={UsersScreen}/>

                    <Redirect to="/panel"/>
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
