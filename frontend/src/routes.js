import * as React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Suspense} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import {Login} from "./pages/login";
import {Auth} from "./pages/auth";
import {Veiculos} from "./pages/veiculos";
import {CadastroUsuario} from "./pages/Usuarios";
import {FormVehicles} from "./pages/veiculos/formVehicles";

export const Routes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div className="d-flex justify-content-center"><CircularProgress/></div>}>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route path='/login' component={Auth}/>
                    <Route exact path='/veiculos' component={Veiculos} />
                    <Route path='/cadastro' component={CadastroUsuario} />
                    <Route exact path='/veiculos/cadastrar' component={FormVehicles}/>
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
};