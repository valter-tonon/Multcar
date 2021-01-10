import api from "../../utils/api";
import {changeLoading} from "./loading.actions";
import {changeNotify} from "./notify.actions";

export  const actionTypes = {
    CHANGE : 'AUTH_CHANGE',
    SUCCESS: 'AUTH_SUCCESS'
}

export const changeAuth = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

export const authSuccess = (payload) =>({
    type: actionTypes.SUCCESS,
    payload
})

export const setUserToken = token => dispatch => {
    localStorage.setItem('access_token', token)
    dispatch(changeAuth({
        email: '',
        password: ''
    }))
    dispatch(authSuccess(true))
}


export const login = (credentials) =>{
    return function (dispatch) {

        dispatch(changeLoading({open: true, msg: 'Autenticando...'}))
            api.post('oauth/token', {
            grant_type: 'password',
            client_id: '2',
            client_secret: 'N5TvvcTa5lBCogVCdN5vQRPVQnv8KyCHMv7tsCM4',
            username: credentials.username,
            password: credentials.password
            }).then((response) => {
                dispatch(changeLoading({open: false}))
                if (typeof response !== "undefined") {
                    if (response.data.access_token) {
                        dispatch(setUserToken(response.data.access_token))

                    }
                }
            })
        .catch(error => {
            dispatch(changeLoading({open: false}))
            if (typeof error.response !== 'undefined') {
                if (error.response.status === 400 || error.response.status === 401) {
                    dispatch(changeNotify({
                        open: true,
                        msg: 'E-mail ou senha incorretos!',
                        class: 'error'
                    }))
                }
            } else {
                dispatch(changeNotify({
                    open: true,
                    class: 'error',
                    msg: 'Opsss! Ocorreu um erro ao conectar no servidor.'
                }))
            }
        })
    }
}

