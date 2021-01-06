import {changeLoading} from "./loading.actions";
import api from "../../utils/api";
import {changeNotify} from "./notify.actions";

export const actionTypes = {
    CHANGE : 'CHANGE_REGISTER',
    ERROR : 'ERRORS_REGISTER',
    SUCCESS : 'SUCCESS_REGISTER'
}

export const changeRegister = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

export const errorRegister = (payload) => ({
    type: actionTypes.ERROR,
    payload
})

export const successRegister = (payload) => ({
    type: actionTypes.SUCCESS,
    payload
})

export const setUserToken = token => dispatch => {
    localStorage.setItem('access_token', token)
    dispatch(changeRegister({
        email: '',
        password: '',
        name: ''
    }))
    dispatch(successRegister(true))
}

export const register = data => dispatch => {
    dispatch(changeLoading({
        open: true,
        msg: 'Cadastrando Usuário'
    }))
    api.post('/register', data)
        .then(res => {
            dispatch(changeLoading({ open: false}))
            if (typeof res !== "undefined") {
                if (res.data.access_token){
                    dispatch(changeNotify({
                        open: true,
                        class: 'success',
                        msg: 'Usuário cadastrado com sucesso.'
                    }))
                    dispatch(setUserToken(res.data.acess_token))
                }
            }
        })
        .catch(error => {
            dispatch(changeLoading({ open: false}))
            if (error.response) {
                dispatch(errorRegister(error.response.data.errors))
            }
        })
}