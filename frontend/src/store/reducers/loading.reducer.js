import {actionTypes} from "../actions/loading.actions";

const initialState = {
    open: false,
    msg: ' Carregando...'
}

export default (state = initialState,{type, payload}) => {
    switch (type) {
        case actionTypes.CHANGE:
            return {...state, ...payload}
        default:
            return state
    }
}