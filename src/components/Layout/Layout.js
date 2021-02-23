import React from 'react';
import ShrOperationResult from '../ShrOperationResult/ShrOperationResult';
import './Layout.css';
const Layout = ( { children } ) => {

    return(
        <div className="layout">
            { children }
        </div>
    );
}

export default Layout;
