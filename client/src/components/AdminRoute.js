import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as auth from "../Helpers/auth";

const AdminRoute = ({ component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                auth.isAuthenticated() && auth.isAuthenticated().role === 1 ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/signin'/>
                )

            }
        >

        </Route>
    );
}

export default AdminRoute;
