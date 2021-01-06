import * as React from 'react';
import logo from '../../assets/images/logo-car.png'
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {changeAuth, login} from "../../store/actions/auth.action";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";


export const Auth = () => {
    const dispatch = useDispatch()
    const {credentials , success} = useSelector(state => state.authReducer)
    const authLogin = (credentials) => {
        dispatch(login(credentials))
    }
    return (
        <div className="d-flex bg-white min-vh-100">
            <div className="container mt-5" >
                <div className='row justify-content-center'>
                    <div className="col-md-4">
                        <div className="form-control text-center" style={{background:"#F7F7F7"}}>
                            <img src={logo} alt="logo" width="250px"/>
                            <Typography component='h1' variant='h6' className='mt-3'>
                                Plataforma para revenda de veículos
                            </Typography>
                            <TextField
                                label='E-mail'
                                type="email"
                                autoComplete="email"
                                value={credentials.username}
                                onChange={text => dispatch(changeAuth({username: text.target.value}))}
                                margin='normal'
                            />
                            <TextField
                                label='Senha'
                                type="password"
                                margin='normal'
                                value={credentials.password}
                                onChange={text => dispatch(changeAuth({password: text.target.value}))}
                            />
                            <Button variant='contained'
                                    type='button'
                                    color='primary'
                                    fullWidth
                                    className='mt-3'
                                    size='large'
                                    onClick={()=>{authLogin(credentials)}}
                            >
                                Entrar
                            </Button>
                            {(success) &&
                                <Redirect to='/veiculos'/>
                            }
                            <Button variant='contained'
                                    color='secondary'
                                    fullWidth
                                    className='mt-3 mb-4' size='large'
                                    component={Link}
                                    to='/cadastro'
                            >
                                Cadastrar
                            </Button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};