import {actionTypes} from "../actions/alert.actions";

const initialState = {
    open: false,
    class: 'success',
    msg: "Dados atualizados",
    time: 3000
}

export default (state = initialState, { type, payload}) =>{
    switch (type) {
        case actionTypes.CHANGE:
            return {...state, ...payload}
        default:
            return state
    }
}