// @flow
import * as React from 'react';
import logo from '../../assets/images/logo-car.png'
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {changeRegister, register} from "../../store/actions/register.actions";
import {Link, Redirect} from "react-router-dom";


export const CadastroUsuario = () => {
    const dispatch = useDispatch()
    const {user, success, error} = useSelector(state => state.registerReducer)
    return (
        <div className='d-flex bg-white min-vh-100'>
            <div className='container mt-5'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-4'>
                        <div className='form-control text-center'style={{background:"#F7F7F7"}}>
                            <img src={logo} alt="logo" width='250px'/>
                            <Typography className="mt-3" variant="h6" component="h1">
                                Crie sua conta com 7 dias Grátis!
                            </Typography>
                            <TextField
                                error={(error.name) && true}
                                margin="normal"
                                label="Nome"
                                value={user.name}
                                onChange={(text)=>{
                                    dispatch(changeRegister({name: text.target.value}))(error.name) && delete error.name
                                }}
                            />
                            {(error.name) &&
                                <strong className="text-danger">{error.name[0]}</strong>
                            }
                            <TextField
                                error={(error.email) && true}
                                margin="normal"
                                type='email'
                                label="E-mail"
                                value={user.email}
                                onChange={(text)=>{
                                    dispatch(changeRegister({email: text.target.value}))(error.email) && delete error.email
                                }}
                            />
                            {(error.email) &&
                            <strong className="text-danger">{error.email[0]}</strong>
                            }

                            <TextField
                                error={(error.password) && true}
                                margin="normal"
                                label="Senha"
                                type='password'
                                value={user.password}
                                onChange={(text)=>{
                                    dispatch(changeRegister({password: text.target.value}))(error.password) && delete error.password
                                }}
                            />
                            {(error.password) &&
                            <strong className="text-danger">{error.password[0]}</strong>
                            }

                            <Button
                                variant='contained'
                                color='primary'
                                fullWidth
                                size='large'
                                className="mt-4 mb-4"
                                onClick={() => dispatch(register(user))}
                            >
                                Avançar
                            </Button>
                            <div className='text-center'>
                                <small>Já é usuário? </small>
                                <Link to="/Login" className="text-primary">
                                    Login
                                </Link>

                            </div>

                            {(success) &&
                                <Redirect to='/veiculos'/>
                            }
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};