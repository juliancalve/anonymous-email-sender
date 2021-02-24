import React from 'react'
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes'
import uuid from 'react-uuid';

const Router = () => {

    const generateRoutes = () => {
        let allRoutes = [];
        Routes.public.forEach( route => { allRoutes.push( <Route key={ uuid() } {...route} />) } );

        return allRoutes;
    }

    return(
        <BrowserRouter>
            <Switch>
                { generateRoutes() }
            </Switch>
        </BrowserRouter>
    )

}

export default Router;
