import {actionTypes} from "../actions/vehicles.actions";

const initialState = {
    vehicles: {
        data: []
    },
    vehicle: {},
    success: false,
    error: false,
    vehicle_brand : [],
    vehicle_model : [],
    vehicle_version: []


}

export default (state = initialState, {type, payload, isLoadMore}) =>{
    switch (type) {
        case actionTypes.INDEX:
            if (isLoadMore) {
                payload.vehicles.data = state.vehicles.data.concat(payload.vehicles.data)
            }
            return {...state, ...payload}
        case actionTypes.DESTROY:
            return {
                ...state,
                vehicles: {
                    ...state.vehicles,
                    data: state.vehicles.data.filter(item => item.id !== payload)
                }
            }
        case actionTypes.CHANGE:
            return {
                ...state,
                vehicle: {
                    ...state.vehicle,
                    ...payload
                }
            }
        case actionTypes.SUCCESS:
            return {
                ...state,
                success: payload
            }
        case actionTypes.ERROR:
            return {
                ...state,
                error: payload
            }
        default:
            return state
    }
}

