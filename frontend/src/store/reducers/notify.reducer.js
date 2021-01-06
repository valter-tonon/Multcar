import {actionTypes} from "../actions/notify.actions";

const initialState = {
    open: false,
    horizontal: 'center',
    vertical: 'top',
    class: 'success',
    time: 3000,
    msg: 'Dados Atualizados com Sucesso !!!'
}

export default (state = initialState,{type, payload}) => {
    switch (type) {
        case actionTypes.CHANGE:
            return {...state, ...payload}
        default:
            return state

    }
}