import React, { Suspense } from 'react';
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./auth/auth";

//Lazy loading
const SignUp = React.lazy(() => import('./pages/SignUp'));
const SignIn = React.lazy(() => import('./pages/SignIn')); 
const Home = React.lazy(() => import('./pages/Home'));


const PrivateRoute = ({component : Component, ...props}) => {
    const ok = isAuthenticated();
    return ok ? (<Route path={props.path}><Component page={props.page}/></Route>) : 
    (<Redirect to={{ pathname : "/", state: { from: props.location }}} />);
}

const Routes = () => (
    <BrowserRouter>
        <Suspense fallback={<div>Carregando...</div>}>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/login" component={SignIn} /> 
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/app" page="Contact" component={Home} /> 
            <Route path="*" component={React.lazy(() => <h1>Página não encontrado</h1>)} />
        </Switch>
        </Suspense>
    </BrowserRouter>
);

export default Routes;